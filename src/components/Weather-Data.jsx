import axios from "axios";
import { useState, useEffect } from "react";

export default function WeatherData() {
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/forecast",
      params: {
        q: "03801",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setWeatherData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (!weatherData.location?.country) {
    return <>loading</>;
  }

  return (
    <>
      <p>Hello from the weather data app!</p>
      <div key="1">
        <p>
          {weatherData.location?.country
            ? weatherData.location?.country
            : "loading"}
        </p>
      </div>
    </>
  );
}
