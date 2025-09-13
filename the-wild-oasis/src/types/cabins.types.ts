import { Tables, TablesInsert } from "./database.types";

export type Cabin = Tables<"cabins">;

export type CabinInsert = Omit<TablesInsert<"cabins">, "image"> & {
  image: File;
};

export type CabinDuplicate = Omit<TablesInsert<"cabins">, "id">;
