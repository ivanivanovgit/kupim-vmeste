// MapChat.js

import ChatMap from "./ChatMap";
import { YMaps } from "@pbe/react-yandex-maps";

export default function MapChat({
  mapStyle,
  selectedTheme,
  setSelectedTheme,
  setIsMarkerPlaced,
  searchButtonClick,
  searchInputRef,
  setSearchInput,
  showAllMarkers,
  setShowAllMarkers,
  setCheckDublicateMarkersMesage,
  setOpenAlert,
  setShowMessage,
}) {
  return (
    <YMaps
      query={{
        apikey: process.env.apiYanKey,
        lang: "ru_RU",
        load: "package.full",
      }}
    >
      <ChatMap
        mapStyle={mapStyle}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        setIsMarkerPlaced={setIsMarkerPlaced}
        searchButtonClick={searchButtonClick}
        searchInputRef={searchInputRef}
        setSearchInput={setSearchInput}
        showAllMarkers={showAllMarkers}
        setShowAllMarkers={setShowAllMarkers}
        setCheckDublicateMarkersMesage={setCheckDublicateMarkersMesage}
        setOpenAlert={setOpenAlert}
        setShowMessage={setShowMessage}
      />
    </YMaps>
  );
}
