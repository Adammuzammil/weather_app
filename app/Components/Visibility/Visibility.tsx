"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { visibilityIcon } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Visibility = () => {
  const { weatherData } = useGlobalContext();
  const visibility = weatherData?.visibility;

  if (!weatherData || !weatherData?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "Excellent: Clear and vast view";
    if (visibilityInKm > 5) return "Good: Easily navigable";
    if (visibilityInKm > 2) return "Moderate: Some limitations";
    if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };

  return (
    <div className="h-[12rem] border px-4 pt-6 pb-5 rounded-lg flex flex-col gap-8">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {visibilityIcon} Visibility
        </h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)}Km</p>
      </div>
      <p className="text-sm">{getVisibilityDescription(visibility)}</p>
    </div>
  );
};

export default Visibility;
