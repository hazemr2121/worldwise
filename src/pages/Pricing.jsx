// Uses the same layout as Product
import PageNav from "../components/PageNav";

export default function Pricing() {
  return (
    <main className="m-6.25 px-12.5 py-6.25 bg-dark-1 min-h-[calc(100vh-5rem)] tablet:m-2.5 tablet:px-3.75 tablet:py-5 tablet:min-h-[calc(100vh-2rem)]">
      <PageNav />
      <section className="w-[clamp(80rem,80%,90rem)] my-15 mx-auto grid grid-cols-[1fr_1fr] gap-17.5 items-center laptop:w-[min(90rem,100%)] tablet:grid-cols-[1fr] tablet:gap-7.5 tablet:my-7.5">
        <div>
          <h2 className="text-[4rem] leading-[1.2] mb-7.5 tablet:text-[2.8rem] tablet:mb-5">
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p className="mb-5 text-base">
            One plan, everything included: unlimited cities, the full world map,
            country grouping and your notes on every trip. No usage tiers and
            nothing held back for an upgrade prompt.
          </p>
          <p className="mb-5 text-base">
            This is a portfolio demo, so nothing is actually charged — the
            pricing page is here to show the full marketing flow alongside the
            app itself.
          </p>
        </div>
        <img
          className="w-full tablet:order-2"
          src="img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}
