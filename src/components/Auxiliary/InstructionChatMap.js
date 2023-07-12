// InstructionChatMap.js

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
          <span className={stylesHome.medium} id="search-adress">
            Выбор адреса для маркера.
          </span>{" "}
          Выбрать адрес маркера можно двумя способами. Первый способ: нажать
          мышкой в необходимом месте карты. Второй способ: начать вводить адрес
          в поле "Поиск адреса" и следовать предложенным подсказкам с возможными
          адресами, выбрать один из вариантов, затем нажать на кнопку "Найти".
          При любом способе найденный адрес отобразится в поле "Найденный
          адрес".
          <div className={stylesHome.playerWrapper}>
            <video src="/video/search-adress.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Выбор адреса для маркера (продолжительность 4 секунды)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="choice-theme">
            Выбор темы.
          </span>{" "}
          Пользователи могут просматривать существующие темы в выпадающем
          списке, а также выбрать интересующую тему, нажав на нее в выпадающем
          списке. При выборе темы маркеры автоматически отфильтруются в
          зависимости от темы.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/choice-theme.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Выбор темы (продолжительность 2 секунды)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="adding-theme">
            Добавление темы.
          </span>{" "}
          Чтобы добавить собственную тему нажмите на кнопку "Добавить тему",
          тема добавиться и станет выбранной.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/add-theme.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Добавление темы (продолжительность 5 секунд)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="deleting-theme">
            Удаление темы.
          </span>{" "}
          Можно удалить тему, нажав на крестик возле выбранной темы, но только
          после удаления всех связанных с ней маркеров.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/delete-theme.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Удаление темы (продолжительность 8 секунд)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="show-all-markers">
            Показать маркеры по всем темам.
          </span>{" "}
          Если Вы хотите просмотреть маркеры по всем темам, нажмите на кнопку
          "Показать маркеры по всем темам.". На карте будут показаны все
          существующие маркеры вне зависимости от темы.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/show-all-markers.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Показать маркеры по всем темам (продолжительность 2 секунды)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="add-marker">
            Добавление маркера с сообщением на карту.
          </span>{" "}
          Для добавления маркера с сообщением на карту нужно выбрать или
          добавить тему, задать адрес и ввести текст сообщения, который затем
          будет отображаться в баллуне маркера на карте.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/add-message.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Добавление сообщения на карту (продолжительность 17 секунд)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="delete-marker">
            Просмотр и удаление сообщений с карты.
          </span>{" "}
          Чтобы просмотреть сообщение на карте, выберите мышкой необходимый
          оранжевый маркер с сообщением. В случае, если Вы хотите удалить этот
          маркер, нажмите на кнопку "Удалить" в открывшемся баллуне маркера.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/delete-message.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Просмотр и удаление сообщений с карты (продолжительность 3
              секунды)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="share-marker">
            Поделиться маркером
          </span>{" "}
          Если Вы хотите поделиться маркером с другим человеком, выберите
          необходимый маркер и нажмите на кнопку "Поделиться". URL данного
          маркера автоматически скопируется в буфер обмена, и вы можете послать
          данную ссылку своему знакомому. Перейдя по этой ссылке, ваш знакомый
          увидит ваш маркер с вашим сообщением, заданной темой и соответствующим
          адресом.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/share-marker.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Поделиться маркером (продолжительность 7 секунд)
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default InstructionChatMap;
