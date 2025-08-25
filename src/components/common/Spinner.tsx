import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className=" fixed top-1/2 left-1/2 -translate-1/2 z-50 ">
      <div className={styles.loader}></div>
    </div>
  );
}
