import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
const URL = "http://localhost:8000/cities";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);

    async function fetchCities() {
      try {
        const res = await fetch(`${URL}`);
        const data = await res.json();
        setCities(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities([...cities, data]);
    } catch {
      alert("There was an error creating the city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    setIsLoading(true);
    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      setCities(cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting the city...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
