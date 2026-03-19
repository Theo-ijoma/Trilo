import epress from "express";

const app = epress();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});