import { useRouter } from "next/router";
import { Constants } from "../../../pages/api/CONSTANTS";

function ActiveLink({ children, href }) {
  const router = useRouter();

  const style = {
    textDecoration: "none",
    color: router.asPath === href ? Constants.thirdColor : Constants.firstColor,
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
