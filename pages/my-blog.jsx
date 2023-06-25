// my-blog.jsx

import Link from "next/link";
import cities from "../src/data/cities";

import Accordion from "../src/components/Auxiliary/Accordion";
import CityList from "../src/components/Auxiliary/CityList";

const MyBlog = () => {
  return (
    <div>
      <Accordion
        id="accordionBlog"
        title={<div>Возможно вы искали:</div>}
        open={false}
      >
        <CityList
          phrases={[
            "Чат на карте в CITY",
            "вскладчину в CITY",
            "купим вместе в CITY",
          ]}
          param="sortBegin"
        />
      </Accordion>
      <h1>Блог</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <Link
              href={`/${encodeURIComponent(city.region)}/${encodeURIComponent(
                city.city
              )}`}
            >
              {city.city}, {city.region}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBlog;
