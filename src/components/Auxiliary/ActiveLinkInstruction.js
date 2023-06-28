// ActiveLinkInstruction.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Constants } from "../../CONSTANTS";
import { red } from "@mui/material/colors";

function ActiveLinkInstruction({ children, href }) {
  const router = useRouter();

  const [color, setColor] = useState(Constants.firstColor);

  useEffect(() => {
    // сохраняем посещенные страницы в local storage
    if (localStorage.getItem("visitedPages")) {
      let visitedPages = JSON.parse(localStorage.getItem("visitedPages"));
      if (!visitedPages.includes(router.asPath)) {
        visitedPages.push(router.asPath);
        localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
      }
    } else {
      localStorage.setItem("visitedPages", JSON.stringify([router.asPath]));
    }

    // получаем посещенные страницы из local storage
    let visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];

    setColor(
      router.asPath === href
        ? Constants.thirdColor
        : visitedPages.includes(href)
        ? "green"
        : "red"
    );
  }, [router.asPath, href]);

  const style = {
    /*  textDecoration: "none", */
    color: color,
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLinkInstruction;
