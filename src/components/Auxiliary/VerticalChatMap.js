// VerticalChatMap.js
import styles from "../../../styles/VerticalChatMap.module.scss";
import ChatMapLayout from "./ChatMapLayout";

function VerticalChatMap({ mapChat }) {
  return <ChatMapLayout mapChat={mapChat} layoutStyles={styles} />;
}

export default VerticalChatMap;
