import { supabase } from "@/lib/supabase";
import { CabinDuplicate, CabinInsert } from "@/types/cabins.types";

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

export async function addCabin(newCabin: CabinInsert) {
  try {
    //1. get image path
    const imagePath = `${Date.now()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );

    //2. upload image to bucket
    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(imagePath, newCabin.image);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    //3. get public url from data
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    //4. save the cabin with public url
    const { error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: publicUrlData.publicUrl }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return "Cabin has been added";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error occured while fetching cabins");
    }
  }
}

export async function dupicateCabin(newCabin: CabinDuplicate) {
  try {
    const { description, discount, image, maxCapacity, name, regularPrice } =
      newCabin;
    //4. save the cabin with public url
    const { error } = await supabase
      .from("cabins")
      .insert([
        {
          description,
          discount,
          maxCapacity,
          regularPrice,
          name: `Copy of ${name}`,
          image,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return "Cabin has been added";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error occured while fetching cabins");
    }
  }
}
