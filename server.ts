import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database-config";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { notFound, errorHandler } from "./src/middlewares/error-middleware";
import UserRoutes from "./src/routes/user-route";
import ProfileRoutes from "./src/routes/profile-route";
import VehicleRoutes from "./src/routes/vehicle-route";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());

// Swagger definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EVAT API",
      version: "1.0.0",
      description: "API documentation for EVAT App",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// User Route
app.use("/api/auth", UserRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/vehicle", VehicleRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI is available on http://localhost:${PORT}/api/docs`);
});
