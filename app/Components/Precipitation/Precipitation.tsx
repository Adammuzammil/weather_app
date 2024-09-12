"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { precipIcon } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Precipitation = () => {
  const { weatherData } = useGlobalContext();
  const rainData = weatherData?.rain;

  // console.log(weatherData);

  if (!weatherData || !weatherData.rain) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  return (
    <div className="h-[12rem] border px-4 pt-6 pb-5 rounded-lg flex flex-col gap-8">
      <div className="top flex flex-col gap-4">
        <h2 className="flex items-center gap-2 font-medium">
          {precipIcon} Precipitation
        </h2>
        <p className="text-xl font-bold">
          {rainData.rain?.["1h"] || 0}mm <br></br>in the last 3h
        </p>
        <p className="pt-1 text-sm">
          {rainData.rain?.["1h"] !== undefined
            ? rainData.rain["1h"] <= 0.2
              ? "Light rain or drizzle. An umbrella may come in handy."
              : rainData.rain["1h"] <= 2.5
              ? "Moderate rain."
              : "Heavy rain."
            : "Conditions are dry."}
        </p>
      </div>
    </div>
  );
};

export default Precipitation;
