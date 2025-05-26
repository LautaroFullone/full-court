import {
  getAllReservations,
  postReservation,
} from "../controllers/reservationsController";
import express from "express";

export const reservationRoutes = express.Router();

reservationRoutes.get("/", getAllReservations);
reservationRoutes.post("/", postReservation);
