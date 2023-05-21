import { useTheme, useMediaQuery } from "@mui/material";
import HorizontRoute from "../src/components/Auxiliary/HorizontRoute";
import VerticalRoute from "../src/components/Auxiliary/VerticalRoute";
import MapRoute from "../src/components/Map/MapRoute";

const Poiskpoputnyhmashin = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (mapStyle) => {
    const mapRoute = <MapRoute mapStyle={mapStyle} />;
    return mapRoute;
  };

  return (
    <>
      {isMatch ? (
        <VerticalRoute mapRoute={HorOrVer("mapStyleVerticalMapRoute")} />
      ) : (
        <HorizontRoute mapRoute={HorOrVer("mapStyleHorizontMapRoute")} />
      )}
    </>
  );
};

export default Poiskpoputnyhmashin;
