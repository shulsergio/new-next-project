import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEventHandler } from "react";

export const SignInForm = () => {
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false, // Не перенаправляем сразу, чтобы обработать ответ
    });
    if (res && !res?.error) {
      router.push("/");
    } else {
      console.error("Sign in failed:", res?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign In</button>
      </form>
    </>
  );
};
