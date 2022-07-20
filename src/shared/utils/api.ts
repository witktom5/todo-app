import axios from "axios";

const mode: string = "dev";
const URL: string =
  mode === "dev"
    ? "http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com"
    : "http://productionurl.com";

export default axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
