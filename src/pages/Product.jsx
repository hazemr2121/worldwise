import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            Most travel apps want you to plan the next trip. WorldWise is for
            remembering the last one. Click anywhere on the world map and it
            works out which city you landed on, then keeps it — with the date
            you were there and whatever you want to remember about it.
          </p>
          <p>
            Your cities collect into a list and a set of markers you can pan
            across, grouped by country, so the shape of where you have actually
            been becomes something you can look at rather than something you
            half-remember.
          </p>
        </div>
      </section>
    </main>
  );
}
