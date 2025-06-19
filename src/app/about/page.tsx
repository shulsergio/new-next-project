import TextBox from "@/components/TextBox/TextBox";
import css from "./about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About My App",
  description: "This is the about app page.",
  keywords: ["about", "app", "information"],
  authors: [{ name: "Shulga" }],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function About() {
  return (
    <>
      <div className={css.container}>
        <TextBox text="Information data for SS FF"></TextBox>
      </div>
    </>
  );
}
