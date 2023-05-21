// chat-na-karte.jsx
import { useTheme, useMediaQuery } from "@mui/material";
import MapChat from "../src/components/Map/MapChat";
import HorizontChatMap from "../src/components/Auxiliary/HorizontChatMap";
import VerticalChatMap from "../src/components/Auxiliary/VerticalChatMap";
const Chatnakarte = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (mapStyle) => {
    const mapChat = <MapChat mapStyle={mapStyle} />;
    return mapChat;
  };

  return (
    <>
      {isMatch ? (
        <VerticalChatMap mapChat={HorOrVer("mapStyleVerticalMapChat")} />
      ) : (
        <HorizontChatMap mapChat={HorOrVer("mapStyleHorizontMapChat")} />
      )}
    </>
  );
};

export default Chatnakarte;
