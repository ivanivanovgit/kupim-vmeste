// help.jsx

import addMessage from "../public/images/add-message.gif";
import delMessage from "../public/images/delete-message.gif";
import Image from "next/image";
import { Constants } from "../src/CONSTANTS";
import stylesHome from "../styles/Help.module.scss";
import Accordion from "../src/components/Auxiliary/Accordion";

const Help = () => {
  return (
    <div className={stylesHome.container}>
      Помощь
      <Accordion
        id="accordion-1"
        title={
          <div className={stylesHome.subsectionTitle}>
            Вкладка "Чат на карте"
          </div>
        }
      >
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
            Просмотр маркеров по темам: Предоставляет возможность просмотреть
            все маркеры, связанные с выбранной темой.
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
      </Accordion>
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