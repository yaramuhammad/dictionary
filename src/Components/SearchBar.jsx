import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ setWord }) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Search term cannot be empty");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const data = await response.json();
      if (response.ok) {
        setWord(data);
      } else {
        setError("Word not found");
      }
    } catch (err) {
      setError("Failed to fetch the word. Please try again later.");
    }
  };

  return (
    <div>
      <div className="w-full p-2 flex my-10 items-center rounded-2xl dark:bg-[#1f1f1f] bg-[#f4f4f4]">
        <input
          type="text"
          id="search"
          className="w-full px-5 focus:outline-none bg-inherit"
          placeholder="Search...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="p-2 text-[#a162ca]" />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
    </div>
  );
}
