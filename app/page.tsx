import Image from "next/image";
import Navbar from "./Components/Navbar";
import Temperature from "./Components/Tempe/Temperature";
import AirPollution from "./Components/Air Pollution/AirPollution";
import Sunset from "./Components/Sunset/Sunset";
import Wind from "./Components/Wind/Wind";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import UVIndex from "./Components/UVIndex/UVIndex";
import Precipitation from "./Components/Precipitation/Precipitation";
import FeelsLike from "./Components/Feelslike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Pressure from "./Components/Pressure/Pressure";
import Mapbox from "./Components/Mapbox/Mapbox";
import InitialPlaces from "./utils/InitialPlaces";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import Visibility from "./Components/Visibility/Visibility";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[10rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="w-full flex flex-col">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UVIndex />
            <Precipitation />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-container mt-4 flex">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1 pl-2">
              <h2 className="flex items-center gap-2 font-medium px-4">
                Top large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {InitialPlaces.map((state, index) => {
                  return (
                    <div
                      className="border rounded-lg shadow-sm dark:bg-dark-grey dark:shadow-none cursor-pointer"
                      key={index}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
