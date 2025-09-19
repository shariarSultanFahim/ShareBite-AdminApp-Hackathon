import { z } from "zod";

export const employeeSchema = z.object({
  email: z.email().nonempty({ message: "Email is required." }),
  phone: z.string().nonempty({ message: "Phone number is required." }),
  username: z.string().nonempty({ message: "Username is required." }),
  avatar: z.string().optional(),
  passhash: z.string().nonempty({ message: "Password hash is required." }),
  passphrase: z.string().nonempty({ message: "Password phrase is required." }),
  role: z.enum(["ADMIN", "HUB_MANAGER", "RIDER"]),
});

export type FormValues = z.infer<typeof employeeSchema>;
export default employeeSchema;
