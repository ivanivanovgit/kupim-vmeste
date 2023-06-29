// InstructionGde.js

import Image from "next/image";
import { Constants } from "../../CONSTANTS";
import stylesHome from "../../../styles/Help.module.scss";

function InstructionGde() {
  return (
    <>
      <div
        className={`${stylesHome.anchor} ${stylesHome.instructionHeader}`}
        id="gde-kupit"
      >
        Раздел "Где купить"
      </div>
      <div className={stylesHome.text}>
        В разделе "Где купить" Вы можете найти ближайшие магазины, рынки и
        другие точки продаж, которые были проверены и одобрены пользователями
        сервиса. Нажимая на интересующую вкладку, Вы можете увидеть маркеры
        соответствующих точек. Нажав на маркер, Вы увидите название точки,
        небольшое описание и контакты. Для добавления новой точки продаж в этот
        раздел, пожалуйста, напишите на почту: {Constants.email}.
      </div>
    </>
  );
}

export default InstructionGde;
