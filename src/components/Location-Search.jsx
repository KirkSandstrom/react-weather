import axios from "axios";
import { useState, useEffect } from "react";

export default function LocationSearch({
  handleClick,
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
}) {
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
    <li key={searchResult.id} className="search-results-list__item">
      <button
        className="search-results-list__button"
        onClick={() => handleClick(searchResult.url)}
      >
        {searchResult.name}, {searchResult.region}, {searchResult.country}
      </button>
    </li>
  ));

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="City, Zip Code, or Lat/Long"
          className={
            searchResults.length > 0
              ? "search-input search-input--border-radius-top-only"
              : "search-input search-input--border-radius-all"
          }
          onChange={handleChange}
        ></input>

        <ul className="search-results-list">{searchResultsList}</ul>
      </div>
    </>
  );
}
