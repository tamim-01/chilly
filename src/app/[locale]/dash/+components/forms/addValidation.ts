import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const schema = z.object({
  name: z.string().min(3, "Food name Must have at least 3 character"),
  spicy: z.boolean(),
  images: z
    .instanceof(Array<File>)
    .refine((list) => list.length > 0, "No files selected")
    .refine((list) => list.length <= 5, "Maximum 5 files allowed")
    .transform((list) => Array.from(list))
    .refine(
      (files) => {
        return files.every((file) => file.size <= MAX_FILE_SIZE);
      },
      {
        message: "File size should not exceed 50MB",
      }
    ),
});
export type ADD_SCHEMA = z.infer<typeof schema>;
