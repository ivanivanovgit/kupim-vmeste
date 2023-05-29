// asyncFunctions.js
import axios from "axios";

// Удаление маркера из БД
export async function removeMarkerFromDB(markerId) {
  try {
    const response = await axios.delete(
      `/api/chat-markers/delete-marker/${markerId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Извлечение записей chat_markers по теме из БД
export async function fetchMarkersByTheme(theme) {
  try {
    const response = await axios.get(`/api/chat-markers/${theme}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Извлечение тем из БД
export async function fetchThemes() {
  try {
    const response = await axios.get("/api/chat-markers/themes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

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
    /*  console.log("Маркер успешно добавлен в БД с markerId: " + response.data.markerId); */
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
