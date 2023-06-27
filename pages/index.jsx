// index.jsx

import { useTheme, useMediaQuery } from "@mui/material";
import HorizontHome from "../src/components/Auxiliary/HorizontHome";
import VerticalHome from "../src/components/Auxiliary/VerticalHome";

export default function Home() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return <>{isMatch ? <VerticalHome /> : <HorizontHome />}</>;
}
