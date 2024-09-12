"use client";

import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, MapRef, Marker } from "react-map-gl";
import { useGlobalContext } from "@/app/Context/globalContext";
import { FaMapPin } from "react-icons/fa";

const MapBox = () => {
  const { weatherData } = useGlobalContext();
  const mapRef = useRef<MapRef>(null);

  const initialLat = weatherData?.coord?.lat ?? 37.7749; // Default latitude (San Francisco)
  const initialLon = weatherData?.coord?.lon ?? -122.4194; // Default longitude (San Francisco)

  const [viewState, setViewState] = useState({
    latitude: initialLat,
    longitude: initialLon,
    zoom: 10,
  });

  // Update map when weatherData changes
  useEffect(() => {
    if (weatherData?.coord) {
      const { lat, lon } = weatherData.coord;

      if (typeof lat === "number" && typeof lon === "number") {
        mapRef.current?.flyTo({
          center: [lon, lat],
          zoom: 10,
          duration: 2000,
          essential: true,
        });
        setViewState({
          latitude: lat,
          longitude: lon,
          zoom: 10,
        });
      }
    }
  }, [weatherData]);

  if (!weatherData || !weatherData.coord) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  const { lat, lon } = weatherData.coord;

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Map
        ref={mapRef}
        {...viewState}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {typeof lat === "number" && typeof lon === "number" && (
          <Marker longitude={lon} latitude={lat} anchor="bottom">
            <FaMapPin className="text-red-500 text-2xl animate-bounce" />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
