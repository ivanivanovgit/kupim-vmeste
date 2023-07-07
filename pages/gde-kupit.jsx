// gde-kupit.jsx
import Head from "next/head";
/* import axios from "../src/utils/axiosBaseURL"; */
import pool from "../src/utils/db";
import { useTheme, useMediaQuery } from "@mui/material";
import DifferentMaps from "../src/components/Map/DifferentMaps";
import HorizontTabsGde from "../src/components/Auxiliary/HorizontTabsGde";
import VerticalTabsGde from "../src/components/Auxiliary/VerticalTabsGde";

const Gdekupit = ({ markers }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (st) => {
    const tabs = [
      {
        title: "Карта торфяных карьеров",
        content: (
          <div>
            <DifferentMaps markers={markers} st={st} idTab={1} />
          </div>
        ),
      },
      {
        title: "Карта производителей винтовых свай",
        content: (
          <div>
            <DifferentMaps markers={markers} st={st} idTab={2} />
          </div>
        ),
      },
    ];
    return tabs;
  };

  return (
    <div>
      <Head>
        <title>
          Где купить: карта торфяных карьеров Московской и Смоленской областях.
        </title>
        <meta
          name="description"
          content="Где купить: карта торфяных карьеров Московской и Смоленской областях."
        />
      </Head>
      {isMatch ? (
        <VerticalTabsGde tabs={HorOrVer("mapStyleVerticalTabs")} />
      ) : (
        <HorizontTabsGde tabs={HorOrVer("mapStyleHorizonTabs")} />
      )}
    </div>
  );
};

export default Gdekupit;

export async function getStaticProps() {
  const { rows: markers } = await pool.query("SELECT * FROM markers");

  return {
    props: { markers },
  };
}

/* export async function getStaticProps() {
  const res = await axios.get("/api/markers");
  const markers = res.data;

  return {
    props: { markers },
  };
} */
