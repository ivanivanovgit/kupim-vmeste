// VerticalRoute.js
import styles from "../../../styles/VerticalRouteMap.module.scss";
import RouteMapLayout from "./RouteMapLayout";

function VerticalRoute({ mapRoute }) {
  return <RouteMapLayout mapRoute={mapRoute} layoutStyles={styles} />;
}

export default VerticalRoute;
