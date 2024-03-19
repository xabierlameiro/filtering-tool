import styles from "./dashboard.module.css";
import Link from "next/link";
import { fetchCandidates } from "../lib/candidades/data";

export default async function Dashboard() {
  const candidates = await fetchCandidates();
  return (
    <main className={styles.main}>
      <h1>Dashboard page</h1>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <Link href={`/candidates/${candidate.id}`}>{candidate.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
