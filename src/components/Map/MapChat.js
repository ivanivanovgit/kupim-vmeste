// MapChat.js

import ChatMap from "./ChatMap";
import { YMaps } from "@pbe/react-yandex-maps";

export default function MapChat({
  mapStyle,
  searchInputRef,
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
        searchInputRef={searchInputRef}
        showAllMarkers={showAllMarkers}
        setShowAllMarkers={setShowAllMarkers}
        setCheckDublicateMarkersMesage={setCheckDublicateMarkersMesage}
        setOpenAlert={setOpenAlert}
        setShowMessage={setShowMessage}
      />
    </YMaps>
  );
}
