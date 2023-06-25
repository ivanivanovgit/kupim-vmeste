// Accordion.js

import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
/* import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; */

const Accordion = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-0 mb-0 transition-all">
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
      {isOpen && <div className="mt-3 transition-all">{children}</div>}
    </div>
  );
};

export default Accordion;
