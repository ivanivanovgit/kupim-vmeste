// DynamicReactPlayer.js
import dynamic from "next/dynamic";

export const DynamicReactPlayer = dynamic(
  () => import("react-player").then((mod) => mod.default),
  { ssr: false }
);
