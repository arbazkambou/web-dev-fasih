import z from "zod";

export const addCabinFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Please enter valid name")
      .max(20, "Please enter name upto 20 characters"),
    maxCapacity: z.coerce.number().min(1).max(20),

    regularPrice: z.coerce.number().min(1),
    discount: z.coerce.number().default(0),
    description: z
      .string()
      .min(5, "Please enter valid description")
      .max(100, "Please enter description upto 100 characters"),
    image: z.instanceof(File, { message: "Please select an image" }),
  })
  .refine((data) => data.discount < data.regularPrice, {
    message: "Discount must be less than regular price",
    path: ["discount"],
  });

export type AddCabinInputsType = z.infer<typeof addCabinFormSchema>;
