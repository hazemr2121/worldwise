import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
// Leaflet renders the popup markup itself, so it is styled from the popup's
// root. Leaflet's own CSS is unlayered, hence the `!` on every override.
const popupClass = [
  "[&_.leaflet-popup-content-wrapper]:bg-dark-1!",
  "[&_.leaflet-popup-content-wrapper]:text-light-2!",
  "[&_.leaflet-popup-content-wrapper]:rounded-control!",
  "[&_.leaflet-popup-content-wrapper]:pr-1.5!",
  "[&_.leaflet-popup-content-wrapper]:border-l-5!",
  "[&_.leaflet-popup-content-wrapper]:border-l-brand-2!",
  "[&_.leaflet-popup-content]:text-[1.5rem]!",
  "[&_.leaflet-popup-content]:flex!",
  "[&_.leaflet-popup-content]:items-center!",
  "[&_.leaflet-popup-content]:gap-2.5!",
  "[&_.leaflet-popup-content_span:first-child]:text-[2.5rem]!",
  "[&_.leaflet-popup-content_span:first-child]:leading-none!",
  "[&_.leaflet-popup-tip]:bg-dark-1!",
].join(" ");

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);
  return (
    <div className="flex-1 h-full bg-dark-2 relative tablet:flex-none tablet:h-[55vh] tablet:min-h-80 tablet:rounded-card tablet:overflow-hidden">
      {!geolocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
          disabled={isLoadingPosition}
        >
          {isLoadingPosition ? "Loading..." : "My Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className="h-full"
      >
        {/* Main OSM tile servers — the previous .fr/hot mirror is rate-limited
            and often slow to paint, which is a bad look during a demo. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup className={popupClass}>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  // setView is a side effect, so it belongs in an effect rather than in the
  // render body where it ran on every single render.
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
