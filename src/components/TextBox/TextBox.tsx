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
    return <div className={css.staticBox}>{children}</div>;
  }
  if (option === "text") {
    return <div className={css.text}>{children}</div>;
  }
}
