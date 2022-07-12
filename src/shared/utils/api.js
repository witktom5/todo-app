import axios from "axios";

const mode = "dev";
const URL = mode === "dev" ? "http://localhost" : "http://productionurl.com";
const port = 3000;
const baseURL = `${URL}:${port}`;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
