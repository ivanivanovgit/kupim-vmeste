// StyledAccordion.js

import { Accordion } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  "&.Mui-expanded": {
    margin: 0,
  },
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    padding: 0,
    "&.Mui-expanded": {
      minHeight: "auto",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    "&.Mui-expanded": {
      margin: "0px 0",
    },
  },
  "& .MuiAccordionDetails-root": {
    padding: 0,
  },
}));
