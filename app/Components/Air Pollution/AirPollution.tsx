"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { airPollIcon } from "@/app/utils/Icons";
import { Progress } from "@/components/ui/progress";
import React from "react";

const AirPollution = () => {
  const { airQuality } = useGlobalContext();
  const airQualityIndex = airQuality?.list?.[0].main.aqi * 10;
  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2">{airPollIcon} Air Pollution</h2>
      <Progress value={airQualityIndex} max={100} className="progress-bar" />
      <p>
        {airQualityIndex < 50
          ? "Air quality is good."
          : airQualityIndex < 100
          ? "Air quality is moderate."
          : airQualityIndex < 150
          ? "Air quality is unhealthy for sensitive groups."
          : airQualityIndex < 200
          ? "Air quality is unhealthy."
          : airQualityIndex < 300
          ? "Air quality is very unhealthy."
          : "Air quality is hazardous."}
      </p>
    </div>
  );
};

export default AirPollution;
