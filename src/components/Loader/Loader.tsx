// 'use client';
import { PulseLoader } from "react-spinners";
import css from "./Loader.module.css";

export interface LoaderProps {
  isLoading: boolean;
}
export default function Loader({ isLoading }: LoaderProps) {
  return (
    <div className={css.loaderOverlay}>
      <PulseLoader
        className={css.loader}
        color={"#36D7B7"}
        loading={isLoading}
        size={40}
      />
    </div>
  );
}
