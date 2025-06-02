"use client";
import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";
import css from "./CircularProgressbar.module.css";

interface ClientProgressBarProps {
  value: number;
  strokeWidth?: number;
}

export default function ClientCircularProgressBar({
  value,
  strokeWidth = 10,
}: ClientProgressBarProps) {
  return (
    <div className={css.container}>
      <CircularProgressbarWithChildren
        value={value}
        text={`${value}%`}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          strokeLinecap: "butt",
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${10}%`,
          }}
        />
      </CircularProgressbarWithChildren>
    </div>
  );
}
