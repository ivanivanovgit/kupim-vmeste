// my-blog.jsx

import Link from "next/link";
import cities from "../src/data/cities";

const MyBlog = () => {
  return (
    <div>
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
