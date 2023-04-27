import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

type HabitMapProps = {
  lat: number;
  long: number;
};
export const HabitMap = ({ lat, long }: HabitMapProps) => {
  const [mapCenter, setMapCenter] = useState({ lat: lat, lng: long });

  useEffect(() => {
    setMapCenter({ lat: lat, lng: long });
    console.log("API KEY IS: ", import.meta.env.MAPS_API_KEY);
  }, [lat, long]);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} center={mapCenter} zoom={14}>
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};
