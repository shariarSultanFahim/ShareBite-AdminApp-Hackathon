import { z } from "zod";

export const dropEditSchema = z.object({
  status: z.string().min(1, "Status is required"),
  adminId: z.number(),
  hubId: z.number(),
});

export type FormValues = z.infer<typeof dropEditSchema>;

export default dropEditSchema;
