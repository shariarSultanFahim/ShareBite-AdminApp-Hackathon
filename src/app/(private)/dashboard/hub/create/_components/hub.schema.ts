import { z } from "zod";

export const hubSchema = z.object({
  contact: z
    .string()
    .nonempty({ message: "Contact number is required." })
    .regex(/^01\d{9}$/, {
      message: "Contact number must start with '01' and be 11 digits.",
    }),
  name: z.string().nonempty({ message: "Name is required." }),
  location: z.string().nonempty({ message: "Location is required." }),
});

export type FormValues = z.infer<typeof hubSchema>;
export default hubSchema;
