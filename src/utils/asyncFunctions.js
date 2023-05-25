// asyncFunctions.js
import axios from "axios";

// Получить все маркеры с сообщениями
export async function getMarkersFromDatabase() {
  try {
    const response = await axios.get("/api/chat-markers");
    return response.data;
  } catch (error) {
    console.error(`Error in fetchMarkersFromDatabase: ${error.message}`);
    return [];
  }
}

// Добавить маркер с сообшением
export const addMarkerToDatabase = async (lat, lng, theme, message_markers) => {
  try {
    const response = await axios.post("/api/chat-markers", {
      lat: lat,
      lng: lng,
      theme: theme,
      message_markers: message_markers,
    });
    /*  console.log("Маркер успешно добавлен в БД с id: " + response.data.id); */
  } catch (error) {
    console.error("Ошибка при добавлении маркера в БД: ", error);
  }
};

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
