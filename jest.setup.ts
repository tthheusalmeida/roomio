if (process.env.JEST_WORKER_ID === undefined) {
  import("dotenv").then((dotenv) => dotenv.config({ path: ".env" }));
}
import "@testing-library/jest-dom";
