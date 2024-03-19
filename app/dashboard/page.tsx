import styles from "./dashboard.module.css";
import Link from "next/link";
import { fetchCandidates } from "lib/candidades";
import { auth } from "auth";
import { redirect } from "next/navigation";

type SessionUser = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
};

export default async function Dashboard() {
  const { user } = (await auth()) as SessionUser;
  const candidates = await fetchCandidates(user.email);

  if (!candidates.length) {
    redirect("/");
  }

  return (
    <main className={styles.main}>
      <h1>Dashboard page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Technology</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.technology}</td>
              <td>
                <Link href={candidate.cv_url}>CV</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
