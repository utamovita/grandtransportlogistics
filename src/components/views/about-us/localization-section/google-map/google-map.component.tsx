import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { mapStyles } from "./google-map.config";
import styles from "./google-map.module.scss";

function GoogleMap() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) {
    return null;
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <Map
        styles={mapStyles}
        defaultCenter={{ lat: 53.12940928310533, lng: 18.059010184234918 }}
        defaultZoom={18}
        gestureHandling={"cooperative"}
        disableDefaultUI={true}
        className={styles.gmap}
      >
        <Marker position={{ lat: 53.12940928310533, lng: 18.059010184234918 }} />
      </Map>
    </APIProvider>
  );
}

export { GoogleMap };
