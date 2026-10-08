import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className="m-6.25 px-12.5 py-6.25 bg-dark-1 min-h-[calc(100vh-5rem)] tablet:m-2.5 tablet:px-3.75 tablet:py-5 tablet:min-h-[calc(100vh-2rem)]">
      <PageNav />
      <section className="w-[clamp(80rem,80%,90rem)] my-15 mx-auto grid grid-cols-[1fr_1fr] gap-17.5 items-center laptop:w-[min(90rem,100%)] tablet:grid-cols-[1fr] tablet:gap-7.5 tablet:my-7.5">
        <img
          className="w-full tablet:order-2"
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2 className="text-[4rem] leading-[1.2] mb-7.5 tablet:text-[2.8rem] tablet:mb-5">About WorldWise.</h2>
          <p className="mb-5 text-base">
            Most travel apps want you to plan the next trip. WorldWise is for
            remembering the last one. Click anywhere on the world map and it
            works out which city you landed on, then keeps it — with the date
            you were there and whatever you want to remember about it.
          </p>
          <p className="mb-5 text-base">
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
