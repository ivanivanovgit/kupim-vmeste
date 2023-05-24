// asyncFunctions.js
import axios from "axios";

// Получить все маршруты
export async function getRoutes() {
  try {
    const response = await axios.get("/api/routes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Добавить новый маршрут
export async function addRoute(route) {
  const {
    first_latitude,
    first_longitude,
    second_latitude,
    second_longitude,
    message,
  } = route;

  try {
    const response = await axios.post("/api/routes", {
      first_latitude,
      first_longitude,
      second_latitude,
      second_longitude,
      message,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Удалить маршрут
export async function deleteRoute(routeId) {
  try {
    await axios.delete(`/api/routes/${routeId}`);
  } catch (error) {
    console.error(error);
  }
}
