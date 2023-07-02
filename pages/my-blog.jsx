// my-blog.jsx

import styles from "../styles/Blog.module.scss";
/* import Accordion from "../src/components/Auxiliary/Accordion";
import CityList from "../src/components/Auxiliary/CityList"; */
import ActiveLink from "../src/components/Auxiliary/ActiveLink";
const MyBlog = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.sectionTitle}>
          Использование сервиса: примеры и варианты
        </div>
        <ul className={styles.bulletList}>
          <ActiveLink href="/blog-sovmestnaya-pokupka-torfa">
            <li>
              <span className={styles.subsectionTitle}>
                Совместная покупка торфа или плодородного грунта на дачу
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/blog-zarabotok-na-prodazhe-meshkov">
            <li>
              <span className={styles.subsectionTitle}>
                Заработок на продаже мешков с торфом и грунтом
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/blog-priobretenie-vintovyh-svaj">
            <li>
              <span className={styles.subsectionTitle}>
                Приобретение винтовых свай и экономия на доставке
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Совместная покупка плодовых деревьев на участок.
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Бартер при помощи сервиса "Чат на карте"
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Сервис "Map-чат" поможет, если остались стройматериалы после
                ремонта
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Покупка вскладчину для продажи товаров на wildberries
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Карты онлайн с чатом для поиска стройматериалов поблизости
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Экономия на строительстве забора при помощи сервиса "Купим
                вместе".
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Совместная покупка (вскладчину) обрезного пиломатериала
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Экономия на покупках с AliExpress при помощи сервиса "Купим
                вместе"
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Поиск попутной машины для перевозки сыпучих материалов
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Отправка груза попутной машиной
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                "Сарафанное радио" среди водителей или как найти попутную машину
                в своем городе
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Экономия на доставке при помощи попутной машины
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Заказ подходящего торфа с карьера
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Бесплатное и без регистрации размещение объявлений на сервисе
                "Купим вместе"
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Путешествие по России на попутных машинах
              </span>
            </li>
          </ActiveLink>
          <ActiveLink href="/">
            <li>
              <span className={styles.subsectionTitle}>
                Совместная покупка на оптовых продуктовых рынках для экономии
                семейного бюджета
              </span>
            </li>
          </ActiveLink>
        </ul>
      </div>
    </div>
  );
};

export default MyBlog;
