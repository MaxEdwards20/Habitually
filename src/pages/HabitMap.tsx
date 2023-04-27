import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { loadHabits } from "../utils/hooks";
import { Habit, HabitLog } from "../utils/models";

type HabitMapProps = {
  lat: number;
  long: number;
};
export const HabitMap = ({ lat, long }: HabitMapProps) => {
  const [mapCenter, setMapCenter] = useState({ lat: lat, lng: long });
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    setMapCenter({ lat: lat, lng: long });
  }, [lat, long]);

  useEffect(() => {
    loadHabits().then((habits) => setHabits(habits));
  }, []);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  //TODO: Get all habitLogs for each habit and add a marker for each habitLog

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={mapCenter}
        zoom={14}
      ></GoogleMap>
    </LoadScript>
  );
};
