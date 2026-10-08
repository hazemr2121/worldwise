import { NavLink } from "react-router-dom";

const linkClass =
  "block text-inherit no-underline uppercase text-xs font-bold px-5 py-1.25 rounded-control [&.active]:bg-dark-0";

function AppNav() {
  return (
    <div className="mt-7.5 mb-5">
      <ul className="list-none flex bg-dark-2 rounded-card">
        <li>
          <NavLink to="cities" className={linkClass}>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to="countries" className={linkClass}>
            Countries
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;
