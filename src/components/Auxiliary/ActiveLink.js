// ActiveLink.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Constants } from "../../CONSTANTS";

function ActiveLink({ children, href }) {
  const router = useRouter();

  const [color, setColor] = useState(Constants.firstColor);

  useEffect(() => {
    setColor(
      router.asPath === href ? Constants.thirdColor : Constants.firstColor
    );
  }, [router.asPath, href]);

  const style = {
    textDecoration: "none",
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

export default ActiveLink;
