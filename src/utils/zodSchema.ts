import { z } from "zod";

export const signupValidationSchema = z.object({
    adminname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});