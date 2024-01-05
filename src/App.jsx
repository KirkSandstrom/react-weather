import { useState } from "react";
import axios from "axios";
import WeatherData from "./components/Weather-Data.jsx";
import LocationSearch from "./components/Location-Search.jsx";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const handleLocationClick = async (url) => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/forecast",
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
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="weather-app-container">
        <LocationSearch
          handleClick={handleLocationClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
        <WeatherData
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}

export default App;
