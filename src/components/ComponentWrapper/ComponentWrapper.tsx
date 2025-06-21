import css from "./ComponentWrapper.module.css";

interface ComponentWrapperProps {
  children?: React.ReactNode;
  title?: string;
}

export default function ComponentWrapper({
  title,
  children,
}: ComponentWrapperProps) {
  return (
    <div className={css.wrapper}>
      {title && <h2 className={css.title}>{title}</h2>}

      {children && <div className={css.listWrapper}>{children}</div>}
    </div>
  );
}
