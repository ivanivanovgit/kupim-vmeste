// axiosBaseURL.js

import axios from "axios";

axios.defaults.baseURL = process.env.POSTGRES_HOST;

export default axios;
