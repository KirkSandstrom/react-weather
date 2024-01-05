import axios from "axios";
import { useState, useEffect } from "react";
import MessageCard from "./sub-components/Message-Card";

export default function ForecastDaily({ weatherData, loading, error }) {
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
        <MessageCard mainContent="loading" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MessageCard mainContent={error} />
      </>
    );
  }

  if (!weatherData.forecast) {
    return (
      <>
        <MessageCard mainContent="Please use the search box above to make a selection" />
      </>
    );
  }

  return (
    <>
      <MessageCard
        headingLead="weather for"
        heading={weatherData?.location?.name + ", "}
        headingLight={weatherData?.location?.region}
        headingTrailer={weatherData?.location?.country}
      />
      {dailyForecastCards}
    </>
  );
}
