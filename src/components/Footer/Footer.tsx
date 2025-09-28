import React from "react";
import css from "./Footer.module.css";

export default function Footer() {
  const currentQtyCommits = "025";
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>
          &copy; {currentYear} SAMS App. v1.1.{currentQtyCommits}
        </p>
        {/* <div>
 
          <a href="/privacy" className={css.link}>
            Privacy Policy
          </a>
          <a href="/terms" className={css.link}>
            Terms of Service
          </a>
        </div> */}
      </div>
    </footer>
  );
}
