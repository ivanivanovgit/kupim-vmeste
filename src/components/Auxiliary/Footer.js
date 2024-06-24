import { Box } from "@mui/material";
import { Constants } from "../../CONSTANTS";
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: Constants.footerHeight,
        backgroundColor: Constants.FooterColor,
        justifyContent: "center",
        /*   fontWeight: "550", */
        fontSize: "0.8rem",
        /*   color: Constants.thirdColor, */
        textAlign: "center",
        padding: "0 0.5rem",
      }}
    >
      Если Вы хотите сохранить навсегда свое сообщение в разделе "Чат на карте" или добавить
      свою компанию в раздел "Где купить": {Constants.email}
    </Box>
  );
};

export default Footer;
