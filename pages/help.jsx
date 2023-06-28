// help.jsx

import stylesHome from "../styles/Help.module.scss";
import ActiveLink from "../src/components/Auxiliary/ActiveLink";
import InstructionChatMap from "../src/components/Auxiliary/InstructionChatMap";
const Help = () => {
  return (
    <div className={stylesHome.container}>
      <div className={stylesHome.sectionTitle}>
        Инструкция по работе сервиса "Купим вместе"
      </div>
      <ol className={stylesHome.numberedMainListHelp}>
        <ActiveLink href="/help#chat-na-karte">
          <li>Раздел "Чат на карте"?</li>
        </ActiveLink>
        <ol className={stylesHome.numberedSubListHelp}>
          <ActiveLink href="/help#add-marker">
            <li>Добавление маркера на карту</li>
          </ActiveLink>
          <ActiveLink href="/help#delete-marker">
            <li>Удаление маркера с карты</li>
          </ActiveLink>
        </ol>
        <ActiveLink href="/help#search-route">
          <li>Раздел "Поиск попутных машин"</li>
        </ActiveLink>
        <ActiveLink href="/help#gde-kupit">
          <li>Раздел "Где купить"</li>
        </ActiveLink>
      </ol>
      <InstructionChatMap />
    </div>
  );
};

export default Help;
