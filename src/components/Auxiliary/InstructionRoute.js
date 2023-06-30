// InstructionRoute.js

import Image from "next/image";
import stylesHome from "../../../styles/Help.module.scss";
import addRoute from "../../../public/images/add-route.gif";

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
          <span className={stylesHome.medium}>Добвление маршрута.</span> Перед
          добавлением маршрута необходимо задать начальную и конечную точку
          маршрута, а также сообщение маршрута. Для этого начните вводить
          соотвественно адрес пункта назначения и адрес пункта отправления. В
          процессе ввода адреса появляются подсказки для уточнения
          местоположения, которые можно выбрать. После выбора адресов введите
          сообщение для маршрута, затем нажмите кнопку "Добавить маршрут",
          маршрут будет добавлен на карту.
          <div className={stylesHome.imageContainer}>
            <Image
              src={addRoute}
              alt="Чат на карте: Добвление маршрута."
              width="auto"
              height="auto"
              priority
            />
            <div className={stylesHome.imageCaption}>Добвление маршрута</div>
          </div>
        </li>
        <li>
          <span className={stylesHome.medium}>Удаление маршрута.</span> Чтобы
          удалить маршрут, нажмите на кнопку "Удалить" на любом из маркеров
          соответствующего маршрута.
        </li>
        <li>
          <span className={stylesHome.medium}>Очищение полей.</span> Чтобы
          очистить поля ввода, нажмите на кнопку "Очистить поля". Все поля
          автоматически очистятся. Можно очищать и обычным способом, но данная
          кнопка ускоряет процесс, делая более удобным новое добавление
          маршрута.
        </li>
      </ul>
    </>
  );
}

export default InstructionRoute;
