import epress from "express";
import { ENV } from "./config/env.js";



const app = epress();

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});