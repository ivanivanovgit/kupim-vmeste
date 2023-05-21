import { Pool } from "pg";

const pool = new Pool({
  user: "adminproject",
  host: "localhost",
  database: "togethermap",
  password: "btnyutyu76235l0",
  port: 5432,
});

export default pool;
