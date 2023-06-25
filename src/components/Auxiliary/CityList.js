// CityList.js

import citiesData from "../../data/cities";
import { shuffleArray } from "../../utils/shuffleArray";
import { useEffect, useState } from "react";

function CityList({ phrases }) {
  const [cityPhrasePairs, setCityPhrasePairs] = useState([]);

  useEffect(() => {
    const shuffledCities = [...citiesData];
    shuffleArray(shuffledCities);

    const shuffledPhrases = [...phrases];
    shuffleArray(shuffledPhrases);

    // Создаем пары город-фраза
    const pairs = shuffledCities.map((city, index) => ({
      city: city.city,
      phrase: shuffledPhrases[index % shuffledPhrases.length],
    }));

    setCityPhrasePairs(pairs);
  }, [phrases]);

  return (
    <div>
      {cityPhrasePairs.map((pair, index) => (
        <p key={index}>{pair.phrase.replace("CITY", pair.city)}</p>
      ))}
    </div>
  );
}

export default CityList;
