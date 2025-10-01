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

export type ConfirmedStays = {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: string;
  totalPrice: number;
  guests: {
    fullName: string;
  };
};

export type RecentBookings = {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
};
