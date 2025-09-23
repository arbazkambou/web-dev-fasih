import { supabase } from "@/lib/supabase";

export async function getBookings(
  filter?: { field: string; value: string } | null
) {
  try {
    let query = supabase
      .from("bookings")
      .select("*, cabins(name), guests(fullName,email)");

    if (filter) query = query.eq(filter.field, filter.value);

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error while getting bookings");
    }
  }
}
