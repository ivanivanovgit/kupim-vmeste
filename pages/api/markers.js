// api/markers.js
import pool from "../../src/utils/db";

export default async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM markers");
  res.status(200).json(rows);
};
