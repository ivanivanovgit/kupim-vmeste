// MapChat.js

import ChatMap from "./ChatMap";
import { YMaps } from "@pbe/react-yandex-maps";

export default function MapChat({
  mapStyle,
  searchInputRef,
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
        setOpenAlert={setOpenAlert}
        setShowMessage={setShowMessage}
      />
    </YMaps>
  );
}
