// StyledAccordionSummary.js

import { AccordionSummary } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  "& .MuiAccordionSummary-expandIcon": {
    marginRight: "auto",
  },
}));
