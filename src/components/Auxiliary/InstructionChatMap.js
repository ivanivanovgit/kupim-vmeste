// InstructionChatMap.js

import Image from "next/image";
import searchAdress from "../../../public/images/search-adress.gif";
import choiceTheme from "../../../public/images/choice-theme.gif";
import addTheme from "../../../public/images/add-theme.gif";
import deleteTheme from "../../../public/images/delete-theme.gif";
import showAllMarkers from "../../../public/images/show-all-markers.gif";
import addMessage from "../../../public/images/add-message.gif";
import delMessage from "../../../public/images/delete-message.gif";
import shareMarker from "../../../public/images/share-marker.gif";

import stylesHome from "../../../styles/Help.module.scss";

function InstructionChatMap() {
  return (
    <>
      <div
        className={`${stylesHome.anchor} ${stylesHome.instructionHeader}`}
        id="chat-na-karte"
      >
        Раздел "Чат на карте"
      </div>
      <div className={stylesHome.text}>
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
          <div className={stylesHome.imageContainer} id="search-adress">
            <Image
              src={searchAdress}
              alt="Чат на карте: Выбор адреса для маркера"
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>
              Выбор адреса для маркера
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>Выбор темы.</span> Пользователи
          могут просматривать существующие темы в выпадающем списке, а также
          выбрать интересующую тему, нажав на нее в выпадающем списке. При
          выборе темы маркеры автоматически отфильтруются в зависимости от темы.
          <div className={stylesHome.imageContainer}>
            <Image
              src={choiceTheme}
              alt="Чат на карте: Выбор темы."
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>Выбор темы</div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>Добавление темы.</span> Чтобы
          добавить собственную тему нажмите на кнопку "Добавить тему", тема
          добавиться и станет выбранной.
          <div className={stylesHome.imageContainer}>
            <Image
              src={addTheme}
              alt="Чат на карте: Добавление темы."
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>Добавление темы</div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>Удаление темы.</span> Можно
          удалить тему, нажав на крестик возле выбранной темы, но только после
          удаления всех связанных с ней маркеров.
          <div className={stylesHome.imageContainer}>
            <Image
              src={deleteTheme}
              alt="Чат на карте: Удаление темы."
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>Удаление темы</div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>
            Показать маркеры по всем темам.
          </span>{" "}
          Если Вы хотите просмотреть маркеры по всем темам, нажмите на кнопку
          "Показать маркеры по всем темам.". На карте будут показаны все
          существующие маркеры вне зависимости от темы.
          <div className={stylesHome.imageContainer}>
            <Image
              src={showAllMarkers}
              alt="Чат на карте: Показать маркеры по всем темам. "
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>
              Показать маркеры по всем темам
            </div>
          </div>
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
              width="auto"
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
              width="auto"
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
          <div className={stylesHome.imageContainer}>
            <Image
              src={shareMarker}
              alt="Чат на карте: Поделиться маркером"
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>Поделиться маркером</div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default InstructionChatMap;
