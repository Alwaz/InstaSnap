import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be min 8 characters" }),
});

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be min 8 characters" }),
});

export const postFormSchema = z.object({
  caption: z.string(),
});
