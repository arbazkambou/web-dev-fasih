import { supabase } from "@/lib/supabase";

export async function getAllCabins() {
  try {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return cabins;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error occured while fetching cabins");
    }
  }
}

export async function deleteCabin(id: number) {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return "Cabin has been successfully deleted";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error occured while fetching cabins");
    }
  }
}
