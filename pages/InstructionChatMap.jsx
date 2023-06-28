// InstructionChatMap.jsx

import Image from "next/image";
import addMessage from "../public/images/add-message.gif";
import delMessage from "../public/images/delete-message.gif";
import { Constants } from "../src/CONSTANTS";
import stylesHome from "../styles/Help.module.scss";

function InstructionChatMap() {
  return (
    <>
      <div className={stylesHome.subsectionTitle}>Вкладка "Чат на карте"</div>
      <div className={stylesHome.text}>
        Вкладка "Чат на карте" позволяет обмениваться сообщениями, размещая их
        на карте. Так как сервис "Купим вместе" разработан без необходимости
        регистрации для удобства использования, то сообщения пользователей на
        вкладке " Чат на карте" становятся видимыми для всех сразу после их
        добавления, и каждый может удалить ваше сообщение, поскольку все они
        находятся в общем доступе. Основные функции включают:
      </div>
      <ul className={stylesHome.bulletList}>
        <li>
          Добавление тем: Пользователи могут создавать темы для обсуждения и
          добавлять маркеры с сообщениями.
        </li>
        <li>
          Удаление тем: Можно удалить тему, но только после удаления всех
          связанных с ней маркеров.
        </li>
        <li>
          Выбор тем: Пользователи могут выбрать из существующих тем. Если тема
          не выбрана, система предупреждает об этом.
        </li>
        <li>
          Просмотр маркеров по темам: Предоставляет возможность просмотреть все
          маркеры, связанные с выбранной темой.
        </li>
        <li>
          Добавление сообщений: Для этого нужно выбрать тему и ввести текст
          сообщения, который затем отображается на карте.
        </li>
      </ul>
      <div className={stylesHome.imageContainer}>
        <Image
          src={addMessage}
          alt="Чат на карте: добавление сообщения"
          width={Constants.widthInstMessChat}
          height="auto"
          priority
        />
        <div className={stylesHome.imageCaption}>
          Добавление сообщения на карту
        </div>
      </div>
      <div className={stylesHome.imageContainer}>
        <Image
          src={delMessage}
          alt="Чат на карте: просмотр и удаление сообщения с карты "
          width={Constants.widthInstMessChat}
          height="auto"
          priority
        />
        <div className={stylesHome.imageCaption}>
          Удаление сообщений с карты
        </div>
      </div>
    </>
  );
}

export default InstructionChatMap;
