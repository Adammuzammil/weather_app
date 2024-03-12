"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigationIcon,
  rainIcon,
  snowIcon,
  thunderIcon,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Temperature = () => {
  const { weatherData } = useGlobalContext();
  //   console.log(weatherData);

  const { main, timezone, weather, name } = weatherData || {};

  if (!weatherData || !weather) {
    return <div>Loading...</div>;
  }

  const temperature = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather?.[0] || {};

  const weatherIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rainIcon;
      case "Snow":
        return snowIcon;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      case "thunderstorm":
        return thunderIcon;
      default:
        return clearSky;
    }
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const localTime = moment().utcOffset(timezone / 60);

      // Custom format: 24-hour format (HH:MM:SS)
      const formattedTime = localTime.format("HH:mm:ss");

      // Get the day of the week
      const day = localTime.format("dddd");

      // Update state with the formatted time and day
      setCurrentTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    //clear Interval
    return () => clearInterval(timeInterval);
  }, [timezone]);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{currentTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigationIcon}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temperature}°</p>

      <div>
        <div>
          <span>{weatherIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
