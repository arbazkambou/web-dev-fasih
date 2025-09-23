import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";

//fetching
export type Booking = Tables<"bookings"> & {
  cabins: { name: string };
  guests: { fullName: string; email: string };
};
//inserting
export type InsertBooking = TablesInsert<"bookings">;
//updating
export type UpdateBooking = TablesUpdate<"bookings">;
