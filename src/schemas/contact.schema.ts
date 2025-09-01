import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name or company name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  type: z.enum([
    "COLLABORATION",
    "JOB INQUIRY",
    "DEVELOPMENT REQUEST",
    "OTHER",
  ]),
  message: z.string().min(10, "Message is required."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
