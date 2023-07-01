// blog-sovmestnaya-pokupka-torfa.jsx
import styles from "../styles/Blog.module.scss";
import Accordion from "../src/components/Auxiliary/Accordion";
import CityList from "../src/components/Auxiliary/CityList";

function blogSovmestnayaPokupkaTorfa() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.centerText}>
          Совместная покупка торфа или плодородного грунта на дачу
        </div>
      </div>
      <Accordion
        id="accordionBlog"
        title={<div>Возможно вы искали:</div>}
        open={false}
      >
        <CityList
          phrases={[
            "покупка торфа вскладчину в CITY",
            "совместная покупка торфа в CITY",
            "покупка универсального грунта в CITY",
          ]}
          param="sortBegin"
        />
      </Accordion>
    </>
  );
}

export default blogSovmestnayaPokupkaTorfa;
