import { Link } from "react-router-dom";

// `className` styles the link; PageNav passes its nav-link look.
function Logo({ className }) {
  return (
    <Link to="/" className={className}>
      <img src="/logo.png" alt="WorldWise logo" className="h-13" />
    </Link>
  );
}

export default Logo;
