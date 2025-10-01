import { supabase } from "@/lib/supabase";
import { UpdateBooking } from "@/types/bookings.types";
import { getToday } from "@/utils/helpers";

type GetBookingInputs = {
  page?: number;
  limit?: number;
  filter?: { field: string; value: string } | null;
};

export async function getBookings({
  filter = null,
  limit = 10,
  page = 1,
}: GetBookingInputs) {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("bookings")
      .select("*, cabins(*), guests(*)", { count: "exact" })
      .range(from, to);

    if (filter) query = query.eq(filter.field, filter.value);

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error while getting bookings");
  }
}

export async function updateBooking({
  id,
  updatedBooking,
}: {
  id: number;
  updatedBooking: UpdateBooking;
}) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedBooking)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
