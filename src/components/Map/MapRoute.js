// MapRoute.js
import { YMaps } from "@pbe/react-yandex-maps";
import RouteMap from "./RouteMap";

export default function MapRoute({
  mapStyle,
  countMapRoute,
  setFirstPoint,
  setSecondPoint,
  firstPointRef,
  secondPointRef,
  setMessageFirstPoint,
  setErrorMessage,
}) {
  return (
    <YMaps
      query={{
        apikey: process.env.apiYanKey,
        lang: "ru_RU",
        load: "package.full",
      }}
    >
      <RouteMap
        mapStyle={mapStyle}
        countMapRoute={countMapRoute}
        setFirstPoint={setFirstPoint}
        setSecondPoint={setSecondPoint}
        firstPointRef={firstPointRef}
        secondPointRef={secondPointRef}
        setMessageFirstPoint={setMessageFirstPoint}
        setErrorMessage={setErrorMessage}
      />
    </YMaps>
  );
}
