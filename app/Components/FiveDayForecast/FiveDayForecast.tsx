"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { calendarIcon } from "@/app/utils/Icons";
import { kelvinToCelsius, unixToDay } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FiveDayForecast = () => {
  const { dailyForecast } = useGlobalContext();
  const { city, list } = dailyForecast;

  if (!dailyForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const processedForecast = (
    forcastData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    forcastData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < min) {
          min = day.main.temp_min;
        }
        if (day.main.temp_max > max) {
          max = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(forcastData[0].dt),
      minTemp: kelvinToCelsius(min),
      maxTemp: kelvinToCelsius(max),
    };
  };

  const forecastData = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    forecastData.push(processedForecast(dailyData));
  }

  console.log(forecastData);

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col 
    justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {calendarIcon} 5-Day Forecast
        </h2>
        <div className="forecast-list pt-4">
          {forecastData.map((day, i) => {
            return (
              <div
                key={i}
                className="py-4 flex flex-col justify-evenly border-b-2"
              >
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="flex justify-between">
                  <span>(Low)</span>
                  <span>(High)</span>
                </p>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <p>{day?.minTemp}°</p>
                  <div className="temperature-bar w-full h-1 rounded-lg"></div>
                  <p>{day?.maxTemp}°</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FiveDayForecast;
