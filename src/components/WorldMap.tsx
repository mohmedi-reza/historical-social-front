import React, { useEffect, useState } from "react";
import WorldMap, { CountryContext } from "react-svg-worldmap";
import "./word-map.css";
import { countriesList } from "../const/SubEvents";

const WorldMapComponent: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countriesList);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const data = countriesList.map((country) => ({
    country: country.code,
    value: 1,
  }));

  const stylingFunction = ({ countryCode }: CountryContext) => ({
    fill: selectedCountry === countryCode ? "#ffffff61" : "transparent",
    stroke: "white",
    strokeWidth: 1.5,
    cursor: "pointer",
  });

  const handleCountryClick = (event: CountryContext): void => {
    setSelectedCountry(event.countryCode || null);
  };

  useEffect(() => {
    setSelectedCountry("IR");
  }, [setSelectedCountry]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      const filtered = countriesList.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowDropdown(true);
      setHighlightedIndex(-1);
    } else {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCountries.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCountries.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectCountry(filteredCountries[highlightedIndex].code);
    }
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
    setSearchTerm(countriesList.find((c) => c.code === code)?.name || "");
    setShowDropdown(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-xs sm:max-w-sm mb-4 ">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="نام کشور را جستجو کنید..."
          className="w-full p-2 border border-gray-700 rounded-xl bg-transparent text-sm sm:text-base text-right text-white placeholder-gray-300 font-extralight focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {showDropdown && (
          <ul className="absolute w-full mt-1 bg-gray-900 text-white border border-gray-600 rounded-md shadow-lg max-h-40 sm:max-h-56 overflow-y-auto z-50">
            {filteredCountries.map((country, index) => (
              <button
                key={country.code}
                className={`p-2 cursor-pointer w-full text-start ${
                  index === highlightedIndex
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleSelectCountry(country.code)}
              >
                {country.name}
              </button>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <WorldMap
          color="gray"
          title=""
          size="responsive"
          data={data}
          onClickFunction={handleCountryClick}
          styleFunction={stylingFunction}
          frame={false}
        />
      </div>

      <div className="mt-4 h-3 p-2 shadow rounded text-gray-600 text-center text-sm sm:text-base">
        {selectedCountry && (
          <>
            <span>کشور انتخاب‌شده: </span>
            <strong className="text-white">
              {countriesList.find((c) => c.code === selectedCountry)?.name}
            </strong>
          </>
        )}
      </div>
    </div>
  );
};

export default WorldMapComponent;
