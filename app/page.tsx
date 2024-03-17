import styles from "./page.module.css";
import CreateNewCandidateForm from "./add-form";
import Link from "next/link";

/**
 * @description This is the landing page of the application
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/dashboard">dashboard</Link>
      <CreateNewCandidateForm />
    </main>
  );
}
