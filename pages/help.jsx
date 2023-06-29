// help.jsx

import stylesHome from "../styles/Help.module.scss";
import ActiveLink from "../src/components/Auxiliary/ActiveLink";
import InstructionChatMap from "../src/components/Auxiliary/InstructionChatMap";
import InstructionRoute from "../src/components/Auxiliary/InstructionRoute";
import InstructionGde from "../src/components/Auxiliary/InstructionGde";

const Help = () => {
  return (
    <div className={stylesHome.container}>
      <div className={stylesHome.sectionTitle}>
        Инструкция по работе сервиса "Купим вместе".
      </div>
      <ol className={stylesHome.numberedMainListHelp}>
        <ActiveLink href="/help#chat-na-karte">
          <li>Раздел "Чат на карте"?</li>
        </ActiveLink>
        <ol className={stylesHome.numberedSubListHelp}>
          <ActiveLink href="/help#search-adress">
            <li>Выбор адреса для маркера</li>
          </ActiveLink>
          <ActiveLink href="/help#choice-theme">
            <li>Выбор темы</li>
          </ActiveLink>
          <ActiveLink href="/help#adding-theme">
            <li>Добавление темы</li>
          </ActiveLink>
          <ActiveLink href="/help#deleting-theme">
            <li>Удаление темы</li>
          </ActiveLink>
          <ActiveLink href="/help#show-all-markers">
            <li>Показать маркеры по всем темам</li>
          </ActiveLink>
          <ActiveLink href="/help#add-marker">
            <li>Добавление маркера с сообщением на карту</li>
          </ActiveLink>
          <ActiveLink href="/help#delete-marker">
            <li>Просмотр и удаление сообщений с карты</li>
          </ActiveLink>
          <ActiveLink href="/help#share-marker">
            <li>Поделиться маркером</li>
          </ActiveLink>
        </ol>
        <ActiveLink href="/help#search-route">
          <li>Раздел "Поиск попутных машин"</li>
        </ActiveLink>
        <ol className={stylesHome.numberedSubListHelp}>
          <ActiveLink href="/help#add-route">
            <li>Добавление маршрута</li>
          </ActiveLink>
          <ActiveLink href="/help#delete-route">
            <li>Удаление маршрута</li>
          </ActiveLink>
          <ActiveLink href="/help#clear-fields">
            <li>Очищение полей</li>
          </ActiveLink>
        </ol>
        <ActiveLink href="/help#gde-kupit">
          <li>Раздел "Где купить"</li>
        </ActiveLink>
      </ol>
      <InstructionChatMap />
      <InstructionRoute />
      <InstructionGde />
    </div>
  );
};

export default Help;
