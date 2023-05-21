import pool from "../../src/utils/db";

export default async function handler(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM users");

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
