"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { uvSun } from "@/app/utils/Icons";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UVIndex = () => {
  const { uvIndex } = useGlobalContext();
  const { uv_index_clear_sky_max, uv_index_max } = uvIndex?.daily || {};

  const maxUVIndex = Math.round(uv_index_max);

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const uvCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        description: "No protection needed",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        description: "Wear sunscreen",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        description: "Take precautions",
      };
    } else {
      return {
        text: "Very High",
        description: "Take precautions",
      };
    }
  };
  return (
    <div className="h-[12rem] border px-4 pt-5 pb-5 rounded-lg flex flex-col gap-8">
      <div className="top flex flex-col ">
        <h2 className="flex items-center gap-2 font-medium">
          {uvSun} UV Index
        </h2>
        <p>{maxUVIndex}</p>
        <p className="pt-2 pb-1">{uvCategory(maxUVIndex).text}</p>
        <Progress className="progress-bar" value={maxUVIndex * 10} />
      </div>
      <p className="">{uvCategory(maxUVIndex).description}</p>
    </div>
  );
};

export default UVIndex;
