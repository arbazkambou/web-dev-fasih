import { supabase } from "@/lib/supabase";

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

  // await new Promise((res) => setTimeout(res, 2000));
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export async function getCabinById(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }

  return data;
}
