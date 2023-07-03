// blog-zakaz-podhodyashchego-torfa-s-karera.jsx

import styles from "../styles/Blog.module.scss";
import Accordion from "../src/components/Auxiliary/Accordion";
import CityList from "../src/components/Auxiliary/CityList";

function blogZakazPodhodyashchegoTorfaKarera() {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.sectionTitle} ${styles.centerText}`}>
          Заказ подходящего торфа с карьера
        </div>

        <Accordion
          id="accordionBlog"
          title={<div>Возможно вы искали:</div>}
          open={true}
          /*    open={false} */
        >
          <CityList
            phrases={[
              "заказ подходящего торфа с карьера в CITY",
              "покупка подходящего торфа с карьера в CITY",
            ]}
            param="sortBegin"
            region="Смоленская обл."
          />
          <CityList
            phrases={[
              "заказ подходящего торфа с карьера в CITY",
              "покупка подходящего торфа с карьера в CITY",
            ]}
            param="sortBegin"
            region="Москва и Московская обл."
          />
        </Accordion>
      </div>
    </>
  );
}

export default blogZakazPodhodyashchegoTorfaKarera;
