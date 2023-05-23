// [routeId].js
import pool from "../../../src/utils/db";

export default async function handler(req, res) {
  const {
    query: { routeId },
  } = req;

  if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM routes WHERE id = $1", [
        routeId,
      ]);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PUT") {
    const {
      first_latitude,
      first_longitude,
      second_latitude,
      second_longitude,
      message,
    } = req.body;
    try {
      const result = await pool.query(
        "UPDATE routes SET first_latitude = $1, first_longitude = $2, second_latitude = $3, second_longitude = $4, route_message = $5 WHERE id = $6 RETURNING *",
        [
          first_latitude,
          first_longitude,
          second_latitude,
          second_longitude,
          message,
          routeId,
        ]
      );
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await pool.query("DELETE FROM routes WHERE id = $1", [
        routeId,
      ]);
      if (result.rowCount > 0) {
        res.status(204).end(); // No Content
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
