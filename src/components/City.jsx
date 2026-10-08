import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
const rowClass = "flex flex-col gap-1.25";
const labelClass = "uppercase text-[1.1rem] font-black text-light-1";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  // TEMP DATA
  useEffect(() => {
    getCity(id);
  }, [id, getCity]);
  const { cityName, emoji, date, notes } = currentCity;
  if (isLoading) return <Spinner />;

  return (
    <div className="px-7.5 py-5 max-h-[70%] bg-dark-2 rounded-card overflow-hidden w-full flex flex-col gap-5">
      <div className={rowClass}>
        <h6 className={labelClass}>City name</h6>
        <h3 className="text-[1.9rem] flex items-center gap-2.5">
          <span className="text-[3.2rem] leading-none">{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={rowClass}>
        <h6 className={labelClass}>You went to {cityName} on</h6>
        <p className="text-base">{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={rowClass}>
          <h6 className={labelClass}>Your notes</h6>
          <p className="text-base">{notes}</p>
        </div>
      )}

      <div className={rowClass}>
        <h6 className={labelClass}>Learn more</h6>
        <a
          className="text-base text-brand-1"
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
