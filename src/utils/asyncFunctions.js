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

// Получить информацию о маршруте по ID
export async function getRouteById(routeId) {
  try {
    const response = await axios.get(`/api/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Обновить маршрут
/* export async function updateRoute(routeId, updatedRoute) {
  const {
    first_latitude,
    first_longitude,
    second_latitude,
    second_longitude,
    message,
  } = updatedRoute;

  try {
    const response = await axios.put(`/api/routes/${routeId}`, {
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
} */

// Удалить маршрут
export async function deleteRoute(routeId) {
  try {
    await axios.delete(`/api/routes/${routeId}`);
  } catch (error) {
    console.error(error);
  }
}
