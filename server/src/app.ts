import express from "express";
import cors from "cors";
import { reservationRoutes } from "./routes/reservations";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);

export default app;
