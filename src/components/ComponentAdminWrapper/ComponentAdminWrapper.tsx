import css from "./ComponentAdminWrapper.module.css";

interface ComponentAdminWrapperProps {
  children?: React.ReactNode;
  title?: string;
}

export default function ComponentAdminWrapper({
  title,
  children,
}: ComponentAdminWrapperProps) {
  return (
    <div className={css.wrapper}>
      {title && <h2 className={css.title}>{title}</h2>}
      {children && <div className={css.listWrapper}>{children}</div>}
    </div>
  );
}
