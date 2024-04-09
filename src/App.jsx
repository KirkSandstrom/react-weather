import { useState } from "react";
import axios from "axios";
import ForecastDaily from "./components/forecast-daily/Forecast-Daily.jsx";
import LocationSearch from "./components/Location-Search.jsx";
import { BACKEND_CONNECTION_STRING } from "./constants";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getLocationForecast = async (url) => {
    const options = {
      method: "GET",
      url: `${BACKEND_CONNECTION_STRING}/forecast`,
      params: {
        q: url,
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setWeatherData(response.data);
      setLoading(false);
      setSearchResults([]);
      setSearchQuery("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="weather-app-container">
        <LocationSearch
          getLocationForecast={getLocationForecast}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
        <ForecastDaily
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}

export default App;
