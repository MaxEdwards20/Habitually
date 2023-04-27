import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { getLocation, loadHabits } from "../utils/hooks";
import { Habit, HabitLog } from "../utils/models";

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
      setHabits(habits);
      setDataReady(true);
    }
    setup();
  }, []);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  return (
    <div className="py-4">
      {dataReady && isLoaded && (
        <GoogleMap mapContainerStyle={mapStyles} center={mapCenter} zoom={14}>
          {habits.map((habit) => {
            const slice = habit.logs?.slice(0, 2);
            return slice?.map((log, index) => {
              {
                if (!log.lat || !log.long || !log.id) {
                  return;
                } else {
                  return (
                    <Marker
                      key={`${log.id!}-${index}-${habit.name}`}
                      position={{ lat: log.lat, lng: log.long }}
                      title={habit.name}
                      label={habit.name}
                    />
                  );
                }
              }
            });
          })}
        </GoogleMap>
      )}
    </div>
  );
};
