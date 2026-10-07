// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Pricing() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            One plan, everything included: unlimited cities, the full world map,
            country grouping and your notes on every trip. No usage tiers and
            nothing held back for an upgrade prompt.
          </p>
          <p>
            This is a portfolio demo, so nothing is actually charged — the
            pricing page is here to show the full marketing flow alongside the
            app itself.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
