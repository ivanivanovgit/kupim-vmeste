// MapChat.js

import AddPlacemark from "./AddPlacemark";
import { YMaps } from "@pbe/react-yandex-maps";

export default function MapChat({
  mapStyle,
  onAddressChange,
  inputText,
  createMarker,
  selectedTheme,
  setIsMarkerPlaced,
  searchButtonClick,
  searchInputRef,
  setSearchInput,
}) {
  return (
    <YMaps
      query={{
        apikey: process.env.apiYanKey,
        lang: "ru_RU",
        load: "package.full",
      }}
    >
      <AddPlacemark
        mapStyle={mapStyle}
        onAddressChange={onAddressChange}
        inputText={inputText}
        createMarker={createMarker}
        selectedTheme={selectedTheme}
        setIsMarkerPlaced={setIsMarkerPlaced}
        searchButtonClick={searchButtonClick}
        searchInputRef={searchInputRef}
        setSearchInput={setSearchInput}
      />
    </YMaps>
  );
}
