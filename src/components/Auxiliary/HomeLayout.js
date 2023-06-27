// HomeLayout.js
import Image from "next/image";
import { Constants } from "../../CONSTANTS";
import mainMap from "../../../public/images/main-map.png";

function HomeLayout({ stylesHome }) {
  return (
    <div className={stylesHome.container}>
      <div
        className={`${stylesHome.imageContainer} ${stylesHome.imageContainerMainMap}`}
      >
        <Image
          src={mainMap}
          alt="Чат на карте: карты онлайн с чатом"
          width={Constants.widthMainMap}
          height="auto"
          priority
        />
      </div>
      <p className={`${stylesHome.text} ${stylesHome.textMainMap}`}>
        <span className={stylesHome.bold}>"Купим вместе"</span> — это сервис для
        совместных покупок (также называемых покупок вскладчину), поиска
        попутных машин и проверенных точек продаж. Сервис разработан без
        необходимости регистрации для удобства использования.
      </p>

      <div className={stylesHome.sectionTitle}>Функционал сервиса.</div>
      <p className={stylesHome.text}>
        Функционал сервиса включает три ключевые вкладки: "Чат на карте", "Поиск
        попутных машин" и "Где купить.
      </p>

      <ul className={stylesHome.bulletList}>
        <li>
          <span className={stylesHome.subsectionTitle}> "Чат на карте": </span>
          это основная вкладка сервиса, на ней можно обмениваться сообщениями,
          размещая их на карте.
        </li>
        <li>
          <span className={stylesHome.subsectionTitle}>
            "Поиск попутных машин":{" "}
          </span>
          на данная вкладке Вы можете посмотреть или добавить информацию о
          попутных машинах.
        </li>
        <li>
          <span className={stylesHome.subsectionTitle}>"Где купить": </span>
          используя эту вкладку, можно найти ближайшие магазины, рынки и другие
          точки продаж, проверенные пользователями."
        </li>
      </ul>

      <div className={stylesHome.sectionTitle}>Раздел "Помощь/F.A.Q." </div>
      <p className={stylesHome.text}>
        Вкладки сервиса интуитивно понятны, но в разделе "Помощь/F.A.Q." вы
        можете найти подробную инструкцию по каждой из них.
      </p>
      <div className={stylesHome.sectionTitle}>
        Примеры использования сервиса.
      </div>

      <ol className={stylesHome.numberedList}>
        <li>
          Вы стали собственником квартиры в новом комплексе или дачи в садовом
          товариществе. Вы можете закинуть ссылку на этот сервис в общий чат, и
          найти соседей, легче спланировав с помощью данного сервиса совместную
          покупку строительных материалов, экономя на доставке крупногабаритных
          товаров.
        </li>
        <li>
          После ремонта у вас остались стройматериалы, которые вы хотите
          продать. Оставьте объявление на вкладке "Чат на карте"
        </li>
        <li>
          Вы регулярно следуете определённому маршруту на работу или перевозите
          груз. Добавьте информацию о маршруте на вкладке "Поиск попутных машин"
          и получите возможность заработать.
        </li>
      </ol>

      <p className={stylesHome.text}>
        Делитесь данным сервисом с друзьями, соседями и знакомыми в общих чатах
        и группах, ведь от его использования выигрывают все.
      </p>
    </div>
  );
}

export default HomeLayout;
