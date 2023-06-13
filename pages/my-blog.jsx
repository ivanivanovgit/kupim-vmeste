// my-blog.jsx

import cities from "../src/data/cities";

const MyBlog = () => {
  return (
    <div>
      <h1>Блог</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city.city}, {city.region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBlog;
