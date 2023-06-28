// help.jsx

import stylesHome from "../styles/Help.module.scss";
import ActiveLinkInstruction from "../src/components/Auxiliary/ActiveLinkInstruction";

const Help = () => {
  return (
    <div className={stylesHome.container}>
      <div className={stylesHome.sectionTitle}>
        Инструкция по работе сервиса "Купим вместе"
      </div>
      <ol className={stylesHome.numberedMainListHelp}>
        <li>
          <ActiveLinkInstruction href="/InstructionChatMap">
            Раздел "Чат на карте"?
          </ActiveLinkInstruction>
        </li>
        <ol className={stylesHome.numberedSubListHelp}>
          <li>
            <ActiveLinkInstruction href="/InstructionChatMap#add-marker">
              Добавление маркера на карту
            </ActiveLinkInstruction>
          </li>
          <li>
            <ActiveLinkInstruction href="/InstructionChatMap#delete-marker">
              Удаление маркера с карты
            </ActiveLinkInstruction>
          </li>
        </ol>
        <li>
          <ActiveLinkInstruction href="/InstructionRouteMap">
            Раздел "Поиск попутных машин"
          </ActiveLinkInstruction>
        </li>
        <li>
          <ActiveLinkInstruction href="/InstructionGdeMap">
            Раздел "Где купить"
          </ActiveLinkInstruction>
        </li>
      </ol>
    </div>
  );
};

export default Help;
