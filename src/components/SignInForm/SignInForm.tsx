import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";

import css from "./SignInForm.module.css";

export const SignInForm = () => {
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    if (res && !res?.error) {
      toast.success("You are signed");
      router.push("/profile");
    } else {
      console.error("Sign in failed:", res?.error);
    }
  };

  return (
    <>
      <form className={css.container} onSubmit={handleSubmit}>
        <h1 className={css.title}>Sign In</h1>
        <label className={css.label} htmlFor="email">
          Email:
        </label>
        <input
          className={css.input}
          type="email"
          id="email"
          name="email"
          required
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
        />

        <button className={css.button} type="submit">
          Sign In
        </button>
      </form>
    </>
  );
};
