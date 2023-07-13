// InstructionGde.js

import { Constants } from "../../CONSTANTS";
import stylesHelp from "../../../styles/Help.module.scss";

function InstructionGde() {
  return (
    <>
      <div
        className={`${stylesHelp.anchor} ${stylesHelp.instructionHeader}`}
        id="gde-kupit"
      >
        Раздел "Где купить"
      </div>
      <div className={stylesHelp.text}>
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
