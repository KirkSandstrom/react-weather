import axios from "axios";
import { useState, useEffect } from "react";

export default function WeatherData({ weatherData, loading, error }) {
  const dailyForecastCards = weatherData?.forecast?.forecastday.map(
    (forecastday) => (
      <div>
        <p>DATE: {forecastday?.date}</p>
        <p>MINTEMP: {forecastday?.day?.mintemp_f}</p>
        <p>MAXTEMP: {forecastday?.day?.maxtemp_f}</p>
        <p>CHANCE OF RAIN: {forecastday?.day?.daily_chance_of_rain}</p>
        <p>TOTAL PRECIP - IN: {forecastday?.day?.totalprecip_in}</p>
        <p>CHANCE OF SNOW: {forecastday?.day?.daily_chance_of_snow}</p>
        <p>TOTAL SNOW - CM: {forecastday?.day?.totalsnow_cm}</p>
        <p>CONDITION: {forecastday?.day?.condition?.text}</p>
        <img src={forecastday?.day?.condition?.icon}></img>
      </div>
    )
  );

  if (loading) {
    return (
      <>
        <p>loading</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  if (!weatherData.forecast) {
    return (
      <>
        <p>Please use the search box above to make a selection</p>
      </>
    );
  }

  return <>{dailyForecastCards}</>;
}
