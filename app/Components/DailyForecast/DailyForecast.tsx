"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rainIcon,
  snowIcon,
  thunderIcon,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import React from "react";

const DailyForecast = () => {
  const { weatherData, dailyForecast } = useGlobalContext();
  const { weather } = weatherData;
  const { city, list } = dailyForecast;
  const { main } = weather?.[0] || {};

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const weatherIcon = () => {
    switch (main) {
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

  const filteredDate = list
    ? list.filter((item: { dt_txt: string; main: { temp: number } }) => {
        return item.dt_txt.startsWith(todayString);
      })
    : [];

  console.log(filteredDate);

  return (
    <div
      className="pt-9 px-5 h-[12rem] border rounded-lg flex flex-col gap-8
  dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        {filteredDate.length < 1 ? (
          <div>
            <h1 className="text-[3rem] line-through text-rose-500">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {filteredDate.map(
                  (
                    forecast: { dt_txt: string; main: { temp: number } },
                    index: number
                  ) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab items-center pl-0"
                      >
                        <p className="text-gray-300">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{weatherIcon()}</p>
                        <p className="mt-4">
                          {kelvinToCelsius(forecast.main.temp)}°
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyForecast;
