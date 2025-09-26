import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "Please enter valid email address" }),
  password: z.string().min(8).max(100),
});

export type LoginFormInputs = z.infer<typeof loginFormSchema>;
