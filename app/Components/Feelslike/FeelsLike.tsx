"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { thermometer } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FeelsLike = () => {
  const { weatherData } = useGlobalContext();

  if (!weatherData || !weatherData?.main || !weatherData?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  const feelsLike = weatherData?.main?.feels_like;
  const temp = weatherData?.main?.temp;

  const description = (feelsLike: number, temp: number) => {
    if (feelsLike < temp) {
      return "Feels colder than the actual temperature.";
    } else if (feelsLike > temp) {
      return "Feels hotter than the actual temperature.";
    } else {
      return "Feels like the actual temperature.";
    }
  };
  return (
    <div className="h-[12rem] border px-4 pt-6 pb-5 rounded-lg flex flex-col gap-8">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels like
        </h2>
        <p className="pt-4 text-2xl">
          {kelvinToCelsius(weatherData?.main?.feels_like)}°
        </p>
      </div>
      <p className="text-sm">{description(feelsLike, temp)}</p>
    </div>
  );
};

export default FeelsLike;
