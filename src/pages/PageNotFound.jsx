import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.notFound}>
      <PageNav />
      <section>
        <p className={styles.code}>404</p>
        <h1>This place isn&apos;t on the map.</h1>
        <p className={styles.text}>
          The page you were looking for doesn&apos;t exist — or it moved
          somewhere we haven&apos;t visited yet.
        </p>
        <Link to="/" className="cta">
          Back to home
        </Link>
      </section>
    </main>
  );
}
