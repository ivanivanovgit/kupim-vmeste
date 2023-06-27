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
      }}
    >
      По добавлению компании в раздел "Где купить" или разработке сервиса, сайта
      пишите на почту: 79162002107@yandex.ru
    </Box>
  );
};

export default Footer;
