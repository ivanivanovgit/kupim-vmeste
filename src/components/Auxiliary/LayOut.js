import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { Constants } from "../../../pages/api/CONSTANTS";

const linksArray = [
  { name: "Главная", id: 0, href: "/" },
  { name: "Чат на карте", id: 1, href: "/chat-na-karte" },
  { name: "Где купить", id: 2, href: "/gde-kupit" },
  {
    name: "Как доставить",
    id: 3,
    href: "/poisk-poputnyh-mashin-dlya-perevozki-gruza",
  },
  { name: "Блог", id: 4, href: "/my-blog" },
  ,
];

const LayOut = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: `calc(100vh - ${Constants.footerHeight})`,
          backgroundColor: Constants.LayoutColor,
        }}
      >
        <Header links={linksArray} />
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default LayOut;
