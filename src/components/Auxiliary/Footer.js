import { Box } from "@mui/material";
import { Constants } from "../../../pages/api/CONSTANTS";
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: Constants.footerHeight,
        backgroundColor: Constants.FooterColor,
        /* color: "white", */
      }}
    >
      footer
    </Box>
  );
};

export default Footer;
