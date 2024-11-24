import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database-config";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { notFound, errorHandler } from "./src/middlewares/error-middleware";
import UserRoutes from "./src/routes/user-route";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());


// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0", // Swagger version
  info: {
    title: "EVAT API",
    version: "1.0.0",
    description: "API documentation for EVAT App",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`, // Your API URL
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User Route
app.use("/api/auth", UserRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI is available on http://localhost:${PORT}/api/docs`);
});
