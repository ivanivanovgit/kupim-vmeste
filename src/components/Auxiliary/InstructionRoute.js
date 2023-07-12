// InstructionRoute.js

import stylesHome from "../../../styles/Help.module.scss";

function InstructionRoute() {
  return (
    <>
      <div
        className={`${stylesHome.anchor} ${stylesHome.instructionHeader}`}
        id="search-route"
      >
        Раздел "Поиск попутных машин"
      </div>
      <div className={stylesHome.text}>
        На вкладке "Поиск попутных машин" Вы можете посмотреть или добавить
        информацию о попутных машинах для перевозки грузов.
      </div>
      <ul className={stylesHome.bulletList}>
        <li>
          <span className={stylesHome.medium} id="add-route">
            Добавление маршрута.
          </span>{" "}
          Перед добавлением маршрута необходимо задать начальную и конечную
          точку маршрута, а также сообщение маршрута. Для этого начните вводить
          соотвественно адрес пункта назначения и адрес пункта отправления. В
          процессе ввода адреса появляются подсказки для уточнения
          местоположения, которые можно выбрать. После выбора адресов введите
          сообщение для маршрута, затем нажмите кнопку "Добавить маршрут",
          маршрут будет добавлен на карту.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/add-route.m4v" controls loop preload="none" />
            <div className={stylesHome.videoCaption}>
              Добавление маршрута (продолжительность 12 секунд)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="delete-route">
            Удаление маршрута.
          </span>{" "}
          Чтобы удалить маршрут, нажмите на кнопку "Удалить" на любом из
          маркеров соответствующего маршрута.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/delete-route.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Удаление маршрута (продолжительность 4 секунды)
            </div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium} id="clear-fields">
            Очищение полей.
          </span>{" "}
          Чтобы очистить поля ввода, нажмите на кнопку "Очистить поля". Все поля
          автоматически очистятся. Можно очищать и обычным способом, но данная
          кнопка ускоряет процесс, делая более удобным новое добавление
          маршрута.
          <div className={stylesHome.playerWrapper}>
            <video src="/video/clear-fields.m4v" controls loop />
            <div className={stylesHome.videoCaption}>
              Очищение полей (продолжительность 6 секунд)
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default InstructionRoute;
