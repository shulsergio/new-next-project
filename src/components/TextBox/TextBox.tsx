import css from "./TextBox.module.css";

export interface TextBoxProps {
  text: string;
}

export default function TextBox({ text }: TextBoxProps) {
  return <p className={css.text}>{text}</p>;
}
