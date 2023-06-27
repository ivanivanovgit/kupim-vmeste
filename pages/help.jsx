// help.jsx

import stylesHome from "../styles/Help.module.scss";
import Accordion from "../src/components/Auxiliary/Accordion";
import ActiveLink from "../src/components/Auxiliary/ActiveLink";

const Help = () => {
  return (
    <div className={stylesHome.container}>
      Помощь
      <ActiveLink href="/InstructionAddMarkerChatMap">
        Добавление маркера
      </ActiveLink>
      <Accordion
        id="accordion-2"
        title={
          <div className={stylesHome.subsectionTitle}>
            Вкладка "Поиск попутных машин"
          </div>
        }
      >
        <div className={stylesHome.text}>
          На вкладке "Поиск попутных машин" Вы можете посмотреть или добавить
          информацию о попутных машинах. На вкладке используются два поля для
          ввода начальной и конечной точки маршрута. В процессе ввода адреса
          появляются подсказки для уточнения местоположения, которые можно
          выбрать. После того как пользователь ввел оба адреса и нажал кнопку
          "Добавить маршрут", маршрут появляется на карте. Каждый маршрут на
          карте можно удалять по отдельности, нажав на соответствующую кнопку в
          информационном окне маршрута. В случае, если введенный адрес не найден
          или при других ошибках, пользователь получает соответствующее
          сообщение об ошибке. Аналогично на вкладке "Поиск попутных машин"
          любой пользователь может видит ваш маршрут, и также может удалить его.
        </div>
      </Accordion>
      <Accordion
        id="accordion-3"
        title={
          <div className={stylesHome.subsectionTitle}>Вкладка "Где купить"</div>
        }
      >
        <div className={stylesHome.text}>
          Вкладка "Где купить" помогает найти ближайшие магазины, рынки и другие
          точки продаж, которые были проверены и одобрены пользователями
          сервиса."
        </div>
      </Accordion>
    </div>
  );
};

export default Help;
