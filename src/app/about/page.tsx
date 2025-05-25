import css from "./about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About My App",
  description: "This is the about app page.",
  keywords: ["about", "app", "information"],
  authors: [{ name: "Shulcman" }],
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
      <div className={css.textdata}>
        <p className={css.text}>all about program</p>
      </div>
    </>
  );
}
