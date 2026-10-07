// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { convertToEmoji } from "../utils/convertToEmoji";

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
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      {/* A failed lookup used to replace the whole form, leaving no way to add
          the city at all. Now it just means you type the name yourself. */}
      {geocodeStatus === "unavailable" && (
        <p className={styles.notice}>
          Couldn&apos;t look up this location automatically — type the city name
          in yourself and it will save fine.
        </p>
      )}

      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
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
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" nativeType="submit">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
