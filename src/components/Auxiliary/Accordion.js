// Accordion.js

import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
/* import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; */

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="transition-all">
      <div
        className="cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <KeyboardDoubleArrowDownIcon
            className={`transform ${
              isOpen ? "" : "rotate-[-90deg]"
            } transition-all`}
          />
        </div>
        <div>{title}</div>
      </div>
      {isOpen && <div className="transition-all">{children}</div>}
    </div>
  );
};

export default Accordion;
