// Accordion.js

import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
/* import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; */

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-0 mb-0">
      <div
        className="cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{title}</div>
        <div>
          <KeyboardDoubleArrowDownIcon
            className={`${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
      </div>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default Accordion;
