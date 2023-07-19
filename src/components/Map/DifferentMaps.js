// DifferentMaps.js
import { YMaps } from "@pbe/react-yandex-maps";
import TabDisplayingPointsOnMap from "./TabDisplayingPointsOnMap";

function DifferentMaps({ markers, st, idTab }) {
  return (
    <YMaps
      query={{
        apikey:
          "732ec220-ba28-469c-b92a-91b3ef35c50d" /* process.env.apiYanKey, */,
        lang: "ru_RU",
        load: "package.full",
      }}
    >
      <TabDisplayingPointsOnMap markers={markers} st={st} activeTab={idTab} />
    </YMaps>
  );
}

export default DifferentMaps;
