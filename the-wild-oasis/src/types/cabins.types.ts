import { Tables, TablesInsert } from "./database.types";

export type Cabin = Tables<"cabins">;

export type CabinInsert = Omit<TablesInsert<"cabins">, "image"> & {
  image: File;
};

export type CabinDuplicate = Omit<TablesInsert<"cabins">, "id">;

// export type CabinEdit = Omit<Cabin, "id" | "created_at" | "image"> & {
//   imageUrl: string;
//   image?: File;
// };

export type CabinEdit = {
  name: string;
  description: string;
  discount: number;
  image?: File | undefined;
  maxCapacity: number;
  regularPrice: number;
  imageUrl: string;
};
