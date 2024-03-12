import {
  CalendarDays,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSun,
  Cloudy,
  Droplets,
  Eye,
  EyeIcon,
  Gauge,
  Github,
  Navigation,
  Snowflake,
  SunDim,
  Thermometer,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { Command } from "lucide-react";

export const github = <Github size={16} />;
export const CommandIcon = <Command size={14} />;
export const drizzleIcon = <CloudDrizzle size={14} />;
export const rainIcon = <CloudRain size={14} />;
export const snowIcon = <Snowflake size={14} />;
export const clearSky = <CloudSun size={14} />;
export const cloudy = <Cloudy size={14} />;
export const thunderIcon = <CloudLightning size={14} />;
export const navigationIcon = <Navigation size={14} />;
export const airPollIcon = <ThermometerSun />;
export const windIcon = <Wind size={14} />;
export const uvSun = <SunDim size={18} />;
export const precipIcon = <CloudRainWind size={16} />;
export const thermometer = <Thermometer size={16} />;
export const humidityIcon = <Droplets size={16} />;
export const visibilityIcon = <EyeIcon size={16} />;
export const pressureIcon = <Gauge size={16} />;
export const calendarIcon = <CalendarDays size={16} />;
