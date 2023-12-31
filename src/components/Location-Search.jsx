import axios from "axios";
import { useState, useEffect } from "react";

export default function LocationSearch({ handleClick }) {
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    if (searchQuery) {
      const options = {
        method: "GET",
        url: "http://localhost:5000/search",
        params: {
          q: searchQuery,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setSearchResults(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [searchQuery]);

  const searchResultsList = searchResults.map((searchResult) => (
    <li key={searchResult.id}>
      <button onClick={() => handleClick(searchResult.url)}>
        {searchResult.name}, {searchResult.region}, {searchResult.country}
      </button>
    </li>
  ));

  return (
    <>
      <input
        type="text"
        placeholder="City, Zip Code, or Lat/Long"
        onChange={handleChange}
      ></input>

      <div>
        <ul>{searchResultsList}</ul>
      </div>
    </>
  );
}
