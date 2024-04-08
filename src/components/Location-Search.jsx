import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";

export default function LocationSearch({
  getLocationForecast,
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
}) {
  const itemsRef = useRef(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleKeyDown(e) {
    const map = getMap();
    switch (e.code) {
      case "Enter":
        break;
      case "ArrowDown":
        e.preventDefault();
        if (map != null) {
          setSelectedItemIndex((prev) => {
            if (prev === null) {
              return 0;
            }

            if (prev < map.size - 1) {
              return prev + 1;
            }

            return prev;
          });
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (map != null) {
          setSelectedItemIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        break;
    }
  }

  /**
   * Sets itemsRef.current to a new Map, or returns the Map from itemsRef.current.
   * This Map is used to store nodes of the searchResultsList so they can be
   * navigated via the up and down arrowkeys.
   */
  const getMap = useCallback(() => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }, [itemsRef.current]);

  const focusId = useCallback(
    (itemId) => {
      const map = getMap();
      const node = map.get(itemId);
      node.focus();
    },
    [getMap]
  );

  useEffect(() => {
    if (selectedItemIndex === null) {
      return;
    }

    const map = getMap();
    const id = Array.from(map.keys())[selectedItemIndex];

    if (id) {
      focusId(id);
    }
  }, [selectedItemIndex, getMap, focusId]);

  const debouncedCallback = useDebounce(
    (options) =>
      axios
        .request(options)
        .then(function (response) {
          setSelectedItemIndex(0);
          setSearchResults(response.data);
        })
        .catch(function (error) {
          console.error(error);
        }),
    200
  );

  useEffect(() => {
    if (searchQuery) {
      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}:5000/search`,
        params: {
          q: searchQuery,
        },
      };

      debouncedCallback(options);
    }
  }, [searchQuery]);

  const searchResultsList = searchResults.map((searchResult) => (
    <li key={searchResult.id} className="search-results-list__item">
      <button
        ref={(node) => {
          const map = getMap();
          if (node) {
            map.set(searchResult.id, node);
          } else {
            map.delete(searchResult.id);
          }
        }}
        className="search-results-list__button"
        onClick={() => {
          getLocationForecast(searchResult.url);
          setSelectedItemIndex(0);
        }}
        onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}
          value={searchQuery}
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set("search-input", node);
            }
          }}
        ></input>

        <ul className="search-results-list">{searchResultsList}</ul>
      </div>
    </>
  );
}
