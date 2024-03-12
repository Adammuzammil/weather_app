"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { humidityIcon } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Humidity = () => {
  const { weatherData } = useGlobalContext();

  const humidity = weatherData?.main?.humidity;

  if (!weatherData || !weatherData?.main || !humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const humidDescription = (humidity: number) => {
    if (humidity < 30) {
      return "Low humidity> It might feel dry";
    } else if (humidity >= 30 && humidity < 50) {
      return "Moderate humidity. Comfortable conditions";
    } else {
      return "High humidity. Uncomfortable conditions";
    }
  };
  return (
    <div className="h-[12rem] border px-4 pt-6 pb-5 rounded-lg flex flex-col gap-8">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {humidityIcon} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>
      <p className="text-sm">{humidDescription(humidity)}</p>
    </div>
  );
};

export default Humidity;
