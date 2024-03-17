import styles from "./page.module.css";

/**
 * @description This is the landing page of the application
 * @todo Add template, styles and functionality
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <form>
        <label>
          Candidate Name:
          <input type="text" name="name" />
        </label>
        <label>
          Candidate CV:
          <input type="file" name="cv" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <input type="text" name="url" value="" disabled />
    </main>
  );
}
