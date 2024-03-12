"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/Context/globalContext";
import React, { useEffect } from "react";

function SetViewOnClick({ currentCoordinates }) {
  const map = useMap();

  useEffect(() => {
    if (currentCoordinates) {
      const zoomLevel = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [currentCoordinates.lat, currentCoordinates.lon],
        zoomLevel,
        flyToOptions
      );
    }
  }, [currentCoordinates, map]);

  return null;
}

const Mapbox = () => {
  const { weatherData } = useGlobalContext();
  const currentCoordinates = weatherData?.coord;

  if (!weatherData || !weatherData.coord || !currentCoordinates) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[currentCoordinates?.lat, currentCoordinates?.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <SetViewOnClick currentCoordinates={currentCoordinates} />
      </MapContainer>
    </div>
  );
};

export default Mapbox;
