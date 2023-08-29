import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN, PORT } from "./config/envConfig.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // To allow requests with no origin (e.g. mobile apps)

    if (origin !== CORS_ORIGIN) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

app.use(cookieParser());
app.use("/inventory", inventoryRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);
app.use("/authentication", authenticationRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
