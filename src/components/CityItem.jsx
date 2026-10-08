import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`flex gap-4 items-center bg-dark-2 rounded-card px-5 py-2.5 border-l-5 border-l-brand-2 cursor-pointer text-inherit no-underline ${
          id === currentCity.id ? "border-2 border-brand-2 border-l-5" : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className="text-[2.6rem] leading-none">{emoji}</span>
        <h3 className="text-[1.7rem] font-semibold mr-auto">{cityName}</h3>
        <time className="text-[1.5rem]">({formatDate(date)})</time>
        <button
          className="h-5 aspect-square rounded-full border-none bg-dark-1 text-light-2 text-base font-normal cursor-pointer transition-all hover:bg-brand-1 hover:text-dark-1"
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
