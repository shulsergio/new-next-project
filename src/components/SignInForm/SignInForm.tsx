import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
// import { PulseLoader } from "react-spinners";
import css from "./SignInForm.module.css";
import Loader from "../Loader/Loader";

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
      const res = await signIn("credentials", {
        mcsId: formData.get("mcsId") as string,
        password: formData.get("password") as string,
        redirect: false,
      });
      if (res && !res?.error) {
        toast.success("You are signed");
        router.push("/profile");
      } else {
        toast.error(res?.error || "Sign in failed");
      }
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <form className={css.container} onSubmit={handleSubmit}>
        <h1 className={css.title}>Sign In</h1>
        <label className={css.label} htmlFor="mcsId">
          MCS ID:
        </label>
        <input
          className={css.input}
          type="text"
          id="mcsId"
          name="mcsId"
          required
          disabled={isLoading}
        />

        <label className={css.label} htmlFor="password">
          Password:
        </label>
        <input
          className={css.input}
          type="password"
          id="password"
          name="password"
          required
          disabled={isLoading}
        />

        <button className={css.button} type="submit" disabled={isLoading}>
          Sign In
        </button>
      </form>
    </>
  );
};
