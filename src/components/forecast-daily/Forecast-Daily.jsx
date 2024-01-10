import axios from "axios";
import { useState, useEffect } from "react";
import MessageCard from "./sub-components/Message-Card";

export default function ForecastDaily({ weatherData, loading, error }) {
  const dailyForecastCards = weatherData?.forecast?.forecastday.map(
    (
      {
        date,
        day: {
          mintemp_f,
          maxtemp_f,
          daily_chance_of_rain,
          totalprecip_in,
          daily_chance_of_snow,
          totalsnow_cm,
          condition: { text, icon },
        },
      },
      key
    ) => (
      <div key={key}>
        <p>DATE: {date}</p>
        <p>MINTEMP: {mintemp_f}</p>
        <p>MAXTEMP: {maxtemp_f}</p>
        <p>CHANCE OF RAIN: {daily_chance_of_rain}</p>
        <p>TOTAL PRECIP - IN: {totalprecip_in}</p>
        <p>CHANCE OF SNOW: {daily_chance_of_snow}</p>
        <p>TOTAL SNOW - CM: {totalsnow_cm}</p>
        <p>CONDITION: {text}</p>
        <img src={icon}></img>
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
