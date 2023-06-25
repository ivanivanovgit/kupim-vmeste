// StyledAccordion.js

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAccordion = styled(Accordion)(() => ({
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

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  transition: "all 0.5s ease",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(-90deg)",
    marginRight: "auto",
  },
  "&.Mui-expanded .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(0deg)",
  },
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  transition: "all 0.5s ease",
}));
