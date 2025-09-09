import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";

const logoUrl = "https://placehold.co/120x120?text=Logo"; // Ganti dengan URL logo Anda
const backgroundUrl = "https://images.unsplash.com/photo-1551808525-51a94da548ce"; // Ganti dengan URL background

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [target, setTarget] = useState("");
  const [jenisBug, setJenisBug] = useState("File");
  const [bugList, setBugList] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      router.push("/");
    } else {
      setUsername(user);
    }

    const savedBugs = localStorage.getItem("bugList");
    if (savedBugs) {
      setBugList(JSON.parse(savedBugs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bugList", JSON.stringify(bugList));
  }, [bugList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!target.trim()) return;

    const newBug = {
      id: Date.now(),
      target,
      status: "Pending",
      jenis: jenisBug,
      dikirimOleh: username,
      waktu: new Date().toLocaleString(),
    };

    setBugList([newBug, ...bugList]);
    setTarget("");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <header className={styles.header}>
        <img src={logoUrl} alt="Logo" className={styles.logo} />
        <h1>Bug Tracker Dashboard</h1>
        <p>Welcome, {username}</p>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.bugForm}>
          <h2>Menu Bug</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Masukkan target bug"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
            <select
              value={jenisBug}
              onChange={(e) => setJenisBug(e.target.value)}
              required
            >
              <option value="File">File</option>
              <option value="Function">Function</option>
              <option value="Case">Case</option>
              <option value="UI">UI</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </section>

        <section className={styles.bugHistory}>
          <h2>Riwayat Bug</h2>
          {bugList.length === 0 && <p>Belum ada bug yang dikirim.</p>}
          {bugList.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Target</th>
                  <th>Status</th>
                  <th>Jenis Bug</th>
                  <th>Dikirim Oleh</th>
                </tr>
              </thead>
              <tbody>
                {bugList.map((bug) => (
                  <tr key={bug.id}>
                    <td>{bug.waktu}</td>
                    <td>{bug.target}</td>
                    <td>{bug.status}</td>
                    <td>{bug.jenis}</td>
                    <td>{bug.dikirimOleh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Contact Dev: viosdevsonic@gmail.com</p>
        <p>
          Telegram:{" "}
          <a href="https://t.me/zennxty" target="_blank" rel="noreferrer">
            @zennxty
          </a>
        </p>
        <p>Bug Invis</p>
      </footer>
    </div>
  );
}
