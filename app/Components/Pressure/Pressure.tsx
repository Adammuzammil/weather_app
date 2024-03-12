"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { pressureIcon } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Pressure = () => {
  const { weatherData } = useGlobalContext();

  const pressure = weatherData?.main?.pressure;

  if (!weatherData || !weatherData?.main || !pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  return (
    <div className="h-[12rem] border px-4 pt-6 pb-5 rounded-lg flex flex-col gap-8">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {pressureIcon} Pressure
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>
      <p className="text-sm">{getPressureDescription(pressure)}</p>
    </div>
  );
};

export default Pressure;
