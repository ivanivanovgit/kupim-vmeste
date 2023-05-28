// MapChat.js

import AddPlacemark from "./AddPlacemark";
import { YMaps } from "@pbe/react-yandex-maps";

export default function MapChat({
  mapStyle,
  onAddressChange,
  inputText,
  createMarker,
  selectedTheme,
  setSelectedTheme,
  setIsMarkerPlaced,
  searchButtonClick,
  searchInputRef,
  setSearchInput,
  showAllMarkers,
  setShowAllMarkers,
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
        setSelectedTheme={setSelectedTheme}
        setIsMarkerPlaced={setIsMarkerPlaced}
        searchButtonClick={searchButtonClick}
        searchInputRef={searchInputRef}
        setSearchInput={setSearchInput}
        showAllMarkers={showAllMarkers}
        setShowAllMarkers={setShowAllMarkers}
      />
    </YMaps>
  );
}
