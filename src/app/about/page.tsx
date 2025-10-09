import TextBox from "@/components/TextBox/TextBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SAMS",
  description: "This is the about SAMS app page.",
  keywords: ["about", "app", "information", "SAMS"],
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
      <TextBox option="text">
        <p>Sales Achievement Monitoring System</p>
        <p>Information data for SS FF</p>
        <a href="mailto:project.ss.helper@gmail.com">
          project.ss.helper@gmail.com
        </a>
      </TextBox>
      {/* <TextBox option="text">{"Information data for SS FF"}</TextBox> */}
    </>
  );
}
