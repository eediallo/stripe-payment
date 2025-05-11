import dotenv from "dotenv";
import "express-async-errors";
import express from "express";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { stripeController } from "./controllers/stripeController.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.post("/stripe", stripeController);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
