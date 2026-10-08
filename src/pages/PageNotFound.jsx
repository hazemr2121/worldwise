import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function PageNotFound() {
  return (
    <main className="m-6.25 px-12.5 py-6.25 bg-dark-1 min-h-[calc(100vh-5rem)] phone:m-2.5 phone:px-3.75 phone:py-5 phone:min-h-[calc(100vh-2rem)]">
      <PageNav />
      <section className="flex flex-col items-center justify-center text-center gap-4 min-h-[60vh]">
        <p className="text-[9rem] font-extrabold leading-none text-brand-2 phone:text-[6.4rem]">404</p>
        <h1 className="text-[3.2rem] leading-[1.2] phone:text-2xl">This place isn&apos;t on the map.</h1>
        <p className="text-[1.7rem] text-light-1 max-w-115 mb-4">
          The page you were looking for doesn&apos;t exist — or it moved
          somewhere we haven&apos;t visited yet.
        </p>
        <Link to="/" className="inline-block bg-brand-2 text-dark-1 uppercase no-underline text-base font-semibold px-7.5 py-2.5 rounded-control">
          Back to home
        </Link>
      </section>
    </main>
  );
}
