import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  MarkerClustererF,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { NoHabits } from "../components/NoHabits";
import { getLocation, loadHabits } from "../utils/hooks";
import { Habit, HabitLog } from "../utils/models";

type MarkerType = {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  label: string;
};

export const HabitMap = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 41.750476, lng: -111.807 });
  const [habits, setHabits] = useState<Habit[]>([]);
  const [counter, setCounter] = useState(0);
  const [dataReady, setDataReady] = useState(false);
  const { isLoaded } = useJsApiLoader({
    // https://stackoverflow.com/questions/63760821/google-api-is-already-presented-in-react-app
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function setup() {
      console.log("Collecting habits for habit map");
      const habits = await loadHabits();
      console.log("Habits at habit map", habits);
      setHabits(habits);
      setDataReady(true);
    }
    setup();
  }, []);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const generateMarkers = () => {
    const markers: MarkerType[] = habits
      .flatMap((habit) => {
        const slice = habit.logs?.slice(0, 2);
        debugger;
        return slice?.map((log, index) => {
          if (!log.lat || !log.long || !log.id) {
            return undefined;
          } else {
            return {
              id: `${log.id}-${index}-${habit.name}`,
              position: { lat: log.lat, lng: log.long },
              label: habit.name,
            };
          }
        });
      })
      .filter((marker) => marker !== undefined) as MarkerType[];
    debugger;
    return markers;
  };

  if (!dataReady || !isLoaded) return <div className=" py-4 ">Loading...</div>;
  if (habits.length === 0) return <NoHabits></NoHabits>;

  return (
    <div className="py-4">
      {dataReady && isLoaded && (
        <GoogleMap mapContainerStyle={mapStyles} center={mapCenter} zoom={14}>
          {generateMarkers().map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              label={marker.label}
            ></Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};
