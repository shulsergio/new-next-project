import css from "./TextBox.module.css";

export interface TextBoxProps {
  option: string;
  children: React.ReactNode;
}

export default function TextBox({ option, children }: TextBoxProps) {
  if (option === "static") {
    return <p className={css.staticBox}>{children}</p>;
  }
  if (option === "text") {
    return <p className={css.text}>{children}</p>;
  }
}
