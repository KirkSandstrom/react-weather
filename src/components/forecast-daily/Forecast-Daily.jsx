import axios from "axios";
import { useState, useEffect } from "react";
import MessageCard from "./sub-components/Message-Card";

export default function ForecastDaily({ weatherData, loading, error }) {
  // prevents the issue noted here: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  function formatDate(dateString) {
    const date = new Date(dateString.replace(/-/g, "/"));

    const formattedDate = date.toLocaleDateString("en-us", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
    });

    return formattedDate;
  }

  function roundedToFixed(input, digits) {
    var rounder = Math.pow(10, digits);
    return (Math.round(input * rounder) / rounder).toFixed(digits);
  }

  const dailyForecastCards = weatherData?.forecast?.forecastday.map(
    (
      {
        date,
        date_epoch,
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
      <div className="forecast-card" key={key}>
        <div className="forecast-card--row">
          <p className="forecast-card--date">{formatDate(date)}</p>
          <img className="forecast-card--condition-img" src={icon}></img>
          <p className="forecast-card--temp-container">
            <span className="forecast-card--max-temp">
              {Math.round(maxtemp_f)}&deg;
            </span>
            <span className="forecast-card--min-temp">
              {" "}
              /{Math.round(mintemp_f)}&deg;
            </span>
          </p>
        </div>
        <div className="forecast-card--row">
          <p className="forecast-card--condition">{text}</p>
        </div>
        <div className="forecast-card--text-row">
          <div className="forecast-card--text-row-group">
            <div className="forecast-card--text-row-group-inner">
              <span>Chance of Rain</span>
              <span className="font-weight-bold">{daily_chance_of_rain}%</span>
            </div>
          </div>
          <div className="forecast-card--text-row-group">
            <div className="forecast-card--text-row-group-inner">
              <span>Total Rain Fall</span>
              <span className="font-weight-bold">{totalprecip_in}"</span>
            </div>
          </div>
        </div>
        <div className="forecast-card--text-row">
          <div className="forecast-card--text-row-group">
            <div className="forecast-card--text-row-group-inner">
              <span>Chance of Snow</span>
              <span className="font-weight-bold">{daily_chance_of_snow}%</span>
            </div>
          </div>
          <div className="forecast-card--text-row-group">
            <div className="forecast-card--text-row-group-inner">
              <span>Total Snow Fall</span>
              <span className="font-weight-bold">
                {roundedToFixed(totalsnow_cm / 2.54, 0)}"
              </span>
            </div>
          </div>
        </div>
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
