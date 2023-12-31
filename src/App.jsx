import "./assets/scss/App.scss";
import axios from "axios";
import WeatherData from "./components/Weather-Data.jsx";
import LocationSearch from "./components/Location-Search.jsx";

function App() {
  const handleLocationClick = async (url) => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/forecast",
      params: {
        q: url,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LocationSearch handleClick={handleLocationClick} />
      <WeatherData />
    </>
  );
}

export default App;
