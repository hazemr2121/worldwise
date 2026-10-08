import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className="h-[calc(100vh-5rem)] m-6.25 bg-[linear-gradient(rgba(36,42,46,0.8),rgba(36,42,46,0.8)),url('/bg.jpg')] bg-cover bg-center px-12.5 py-6.25 tablet:m-2.5 tablet:px-3.75 tablet:py-5 tablet:h-auto tablet:min-h-[calc(100vh-2rem)]">
      <PageNav />
      <section className="flex flex-col h-[85%] items-center justify-center gap-6.25 text-center tablet:h-auto tablet:py-15">
        <h1 className="text-[4.5rem] leading-[1.3] tablet:text-3xl">
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2 className="w-9/10 text-[1.9rem] text-light-1 mb-6.25 tablet:w-full tablet:text-base">
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="inline-block bg-brand-2 text-dark-1 uppercase no-underline text-base font-semibold px-7.5 py-2.5 rounded-control">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
