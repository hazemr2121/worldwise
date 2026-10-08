// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { convertToEmoji } from "../utils/convertToEmoji";

const rowClass = "flex flex-col gap-1.25 relative";

// While saving, the whole form fades and its buttons go inert and grey.
const loadingClass =
  "opacity-30 [&_button]:pointer-events-none [&_button]:bg-light-1 [&_button]:border [&_button]:border-solid [&_button]:border-light-1 [&_button]:text-dark-0";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  // "ok" | "not-a-city" | "unavailable" — clicking the ocean is a real dead end,
  // but the lookup service being down shouldn't stop you adding a city by hand.
  const [geocodeStatus, setGeocodeStatus] = useState("ok");

  useEffect(() => {
    if (!lat || !lng) return;
    let cancelled = false;

    async function fetchCityName() {
      setIsLoadingGeocoding(true);
      setGeocodeStatus("ok");
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        if (!response.ok) throw new Error("lookup-failed");
        const data = await response.json();
        if (cancelled) return;

        if (!data.countryCode) {
          setGeocodeStatus("not-a-city");
          return;
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch {
        if (!cancelled) setGeocodeStatus("unavailable");
      } finally {
        if (!cancelled) setIsLoadingGeocoding(false);
      }
    }

    fetchCityName();
    // Clicking a new spot before the previous lookup lands would otherwise let
    // the stale response overwrite the newer one.
    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    const created = await createCity(newCity);
    // Only leave the form if the city actually saved, so a failure doesn't
    // silently drop what was typed.
    if (created) navigate("/app/cities");
  }

  if (!lat || !lng) return <Message message="Click on the map to add a city" />;

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodeStatus === "not-a-city")
    return <Message message="That doesn't seem to be a city. Click somewhere else 🙂" />;

  return (
    <form
      className={`bg-dark-2 rounded-card px-7.5 py-5 w-full flex flex-col gap-5 ${
        isLoading ? loadingClass : ""
      }`}
      onSubmit={handleSubmit}
    >
      {/* A failed lookup used to replace the whole form, leaving no way to add
          the city at all. Now it just means you type the name yourself. */}
      {geocodeStatus === "unavailable" && (
        <p className="text-sm leading-normal text-dark-1 bg-brand-1 rounded-control px-3.5 py-2.5">
          Couldn&apos;t look up this location automatically — type the city name
          in yourself and it will save fine.
        </p>
      )}

      <div className={rowClass}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className="absolute right-2.5 top-6.75 text-[2.8rem]">{emoji}</span>
      </div>

      <div className={rowClass}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          calendarClassName="font-[inherit]! text-[1.2rem]!"
        />
      </div>

      <div className={rowClass}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className="flex justify-between">
        <Button type="primary" nativeType="submit">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
