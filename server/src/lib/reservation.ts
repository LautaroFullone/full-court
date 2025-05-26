import { z } from "zod";

export const reservationSchema = z.object({
  date: z.coerce.date(),
  shift: z.string().min(5),
  courtId: z.string().min(1),
  owner: z.string().min(1),
  price: z.number().nonnegative(),
  type: z.enum(["clase", "partido", "torneo", "otro"]),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
