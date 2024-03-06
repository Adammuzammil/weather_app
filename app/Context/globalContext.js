"use client";

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [dailyForecast, setDailyForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchWeatherData = async () => {
    try {
      const res = await axios.get("api/weather");
      // console.log(res.data);
      setWeatherData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAirQualityData = async () => {
    try {
      const res = await axios.get("api/pollution");
      // console.log(res.data);
      setAirQuality(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDailyForecastData = async () => {
    try {
      const res = await axios.get("api/daily_forecast");
      // console.log(res.data);
      setDailyForecast(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUVIndexData = async () => {
    try {
      const res = await axios.get("api/uv_index");
      console.log("UV INdex", res.data);
      setUvIndex(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchAirQualityData();
    fetchDailyForecastData();
    fetchUVIndexData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ weatherData, airQuality, dailyForecast, uvIndex }}
    >
      <GlobalContextUpdate.Provider value={{}}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
