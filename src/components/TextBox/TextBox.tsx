import css from "./TextBox.module.css";

export interface TextBoxProps {
  option: "static" | "text";
  children: React.ReactNode;
}
/**
 *
 * @export
 * option - "static" | "text" - 2 options for css styles
 * children - text content
 * @param {TextBoxProps} { option, children }
 * @return {*}
 */
export default function TextBox({ option, children }: TextBoxProps) {
  if (option === "static") {
    return <p className={css.staticBox}>{children}</p>;
  }
  if (option === "text") {
    return <p className={css.text}>{children}</p>;
  }
}
