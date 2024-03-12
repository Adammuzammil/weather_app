"use client";

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import InitialPlaces from "../utils/InitialPlaces";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [dailyForecast, setDailyForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [location, setLocation] = useState(InitialPlaces);
  const [inputValue, setInputValue] = useState("");
  const [activeCoordinates, setActiveCoordinates] = useState([
    37.5666791, 126.9782914,
  ]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      // console.log(res.data);
      setWeatherData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAirQualityData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      // console.log(res.data);
      setAirQuality(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDailyForecastData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/daily_forecast?lat=${lat}&lon=${lon}`);
      // console.log(res.data);
      setDailyForecast(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUVIndexData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv_index?lat=${lat}&lon=${lon}`);
      // console.log("UV INdex", res.data);
      setUvIndex(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSearchLocation = async (city) => {
    try {
      const res = await axios.get(`api/location?city=${city}`);
      // console.log(res.data);
      setLocation(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setLocation(InitialPlaces);
    }
  };

  useEffect(() => {
    const debounceSearch = debounce((city) => {
      fetchSearchLocation(city);
    }, 300);

    if (inputValue) {
      debounceSearch(inputValue);
    }

    return () => {
      debounceSearch.cancel();
    };
  }, [inputValue]);

  useEffect(() => {
    fetchWeatherData(activeCoordinates[0], activeCoordinates[1]);
    fetchAirQualityData(activeCoordinates[0], activeCoordinates[1]);
    fetchDailyForecastData(activeCoordinates[0], activeCoordinates[1]);
    fetchUVIndexData(activeCoordinates[0], activeCoordinates[1]);
  }, [activeCoordinates]);

  return (
    <GlobalContext.Provider
      value={{
        weatherData,
        airQuality,
        dailyForecast,
        uvIndex,
        location,
        inputValue,
        handleInput,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCoordinates }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
