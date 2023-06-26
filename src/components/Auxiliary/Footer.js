import { Box } from "@mui/material";
import { Constants } from "../../CONSTANTS";
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: Constants.footerHeight,
        backgroundColor: Constants.FooterColor,
        justifyContent: "center",
        fontWeight: "550",
        fontSize: "0.9rem",
        color: Constants.thirdColor,
        /* color: "white", */
      }}
    >
      Разработка сервисов или сайтов: 79162002107@yandex.ru
    </Box>
  );
};

export default Footer;
