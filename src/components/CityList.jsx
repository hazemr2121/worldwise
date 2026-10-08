import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading, error } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  // The context tracked an error but nothing ever rendered it, so failures were
  // invisible once the alert() was removed.
  if (error) {
    return <Message message={error} />;
  }
  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className="w-full h-[65vh] list-none overflow-hidden flex flex-col gap-3.5 [&::-webkit-scrollbar]:w-0">
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
