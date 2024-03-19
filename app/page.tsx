import styles from "./page.module.css";
import CreateNewCandidateForm from "./add-form";

/**
 * @description This is the landing page of the application
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <CreateNewCandidateForm />
    </main>
  );
}
