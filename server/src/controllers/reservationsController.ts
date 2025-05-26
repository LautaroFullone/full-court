import { reservationSchema } from "../lib/reservation";
import { Request, Response } from "express";
import {
  createReservation,
  getReservations,
} from "../services/reservationsService";

export async function getAllReservations(_req: Request, res: Response) {
  const data = await getReservations();
  res.json(data);
}

export async function postReservation(req: Request, res: Response) {
  try {
    const parsed = reservationSchema.parse(req.body);
    const reservation = await createReservation(parsed);
    res.status(201).json(reservation);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Unexpected error" });
  }
}
