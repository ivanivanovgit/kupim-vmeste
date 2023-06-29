// InstructionChatMap.js

import Image from "next/image";
import addMessage from "../../../public/images/add-message.gif";
import delMessage from "../../../public/images/delete-message.gif";
import { Constants } from "../../CONSTANTS";
import stylesHome from "../../../styles/Help.module.scss";

function InstructionChatMap() {
  return (
    <>
      <div
        className={`${stylesHome.anchor} ${stylesHome.instructionChatMap}`}
        id="chat-na-karte"
      >
        Вкладка "Чат на карте"
      </div>
      <div className={`${stylesHome.text}`}>
        Вкладка "Чат на карте" позволяет обмениваться сообщениями, размещая их
        на карте. Основные функции включают:
      </div>
      <ul className={stylesHome.bulletList}>
        <li>
          <span className={stylesHome.medium}>Выбор адреса для маркера.</span>{" "}
          Выбрать адрес маркера можно двумя способами. Первый способ: нажать
          мышкой в необходимом месте карты. Второй способ: начать вводить адрес
          в поле "Поиск адреса" и следовать предложенным подсказкам с возможными
          адресами, выбрать один из вариантов, затем нажать на кнопку "Найти".
          При любом способе найденный адрес отобразится в поле "Найденный
          адрес".
        </li>
        <li>
          <span className={stylesHome.medium}>Выбор темы.</span> Пользователи
          могут просматривать существующие темы в выпадающем списке, а также
          выбрать интересующую тему, нажав на нее в выпадающем списке. При
          выборе темы маркеры автоматически отфильтруются в зависимости от темы.
        </li>
        <li>
          <span className={stylesHome.medium}>Добавление темы.</span> Чтобы
          добавить собственную тему нажмите на кнопку "Добавить тему", тема
          добавиться и станет выбранной.
        </li>
        <li>
          <span className={stylesHome.medium}>Удаление темы.</span> Можно
          удалить тему, нажав на крестик возле выбранной темы, но только после
          удаления всех связанных с ней маркеров.
        </li>
        <li>
          <span className={stylesHome.medium}>
            Показать маркеры по всем темам.
          </span>{" "}
          Если Вы хотите просмотреть маркеры по всем темам, нажмите на кнопку
          "Показать маркеры по всем темам.". На карте будут показаны все
          существующие маркеры вне зависимости от темы.
        </li>
        <li id="add-marker">
          <span className={stylesHome.medium}>
            Добавление маркера с сообщением на карту.
          </span>{" "}
          Для добавления маркера с сообщением на карту нужно выбрать или
          добавить тему, задать адрес и ввести текст сообщения, который затем
          будет отображаться в баллуне маркера на карте.
          <div className={stylesHome.imageContainer}>
            <Image
              src={addMessage}
              alt="Чат на карте: добавление сообщения"
              width={Constants.widthInstMessChat}
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>
              Добавление маркера с сообщением на карту
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>
            Просмотр и удаление сообщений с карты.
          </span>{" "}
          Чтобы просмотреть сообщение на карте, выберите мышкой необходимый
          оранжевый маркер с сообщением. В случае, если Вы хотите удалить этот
          маркер, нажмите на кнопку "Удалить" в открывшемся баллуне маркера.
          <div className={stylesHome.imageContainer}>
            <Image
              src={delMessage}
              alt="Чат на карте: просмотр и удаление сообщения с карты "
              width={Constants.widthInstMessChat}
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>
              Просмотр и удаление сообщений с карты
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>Поделиться маркером</span> Если Вы
          хотите поделиться маркером с другим человеком, выберите необходимый
          маркер и нажмите на кнопку "Поделиться". URL данного маркера
          автоматически скопируется в буфер обмена, и вы можете послать данную
          ссылку своему знакомому. Перейдя по этой ссылке, ваш знакомый увидит
          ваш маркер с вашим сообщением, заданной темой и соответствующим
          адресом.
        </li>
      </ul>
    </>
  );
}

export default InstructionChatMap;
