import styles from "./dashboard.module.css";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Link href="/">home</Link>
      <h1>Dashboard page</h1>
    </main>
  );
}
