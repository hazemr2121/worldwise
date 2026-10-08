import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const linkBase = "no-underline uppercase text-[1.5rem] font-semibold";
const linkClass = `${linkBase} text-light-2 [&.active]:text-brand-2`;
// The CTA keeps its own colours even while active (on /login).
const ctaClass = `${linkBase} text-dark-0 bg-brand-2 px-5 py-2 rounded-card`;

function PageNav() {
  return (
    <nav className="flex items-center justify-between phone:flex-col phone:gap-4">
      <Logo className={`${linkBase} text-light-2`} />
      <ul className="list-none flex items-center gap-10 phone:gap-5">
        <li>
          <NavLink to="/pricing" className={linkClass}>
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" className={linkClass}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={ctaClass}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
