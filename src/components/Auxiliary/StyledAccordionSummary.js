// StyledAccordionSummary.js

import { AccordionSummary } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(-90deg)",
    marginRight: "auto",
  },
  "&.Mui-expanded .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(0deg)",
  },
}));
