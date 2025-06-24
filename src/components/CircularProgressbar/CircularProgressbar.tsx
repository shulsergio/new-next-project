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
  const pathColor = value < 80 ? "red" : value > 99 ? "green" : "orange";
  return (
    <div className={css.container}>
      <CircularProgressbarWithChildren
        value={value}
        text={`${value.toFixed(1)}%`}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor: pathColor,
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
