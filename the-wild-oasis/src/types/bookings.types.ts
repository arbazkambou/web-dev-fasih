import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";
import { Cabin } from "./cabins.types";

//fetching

export type Guests = Tables<"guests">;
export type Booking = Tables<"bookings"> & {
  cabins: Cabin;
  guests: Guests;
};
//inserting
export type InsertBooking = TablesInsert<"bookings">;
//updating
export type UpdateBooking = TablesUpdate<"bookings">;
