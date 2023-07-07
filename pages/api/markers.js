// api/markers.js
import pool from "../../src/utils/db";

export default async (_, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM markers");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
