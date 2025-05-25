import css from "./profile.module.css";

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <div className={css.boxes}></div>
      <p>You can add more details about the user here.</p>
    </div>
  );
}
