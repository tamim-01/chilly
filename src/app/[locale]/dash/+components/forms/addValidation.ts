import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const schema = z.object({
  title: z.string().min(3, "Food name Must have at least 3 character"),
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
  price: z
    .object({
      value: z.number().int("enter a valid price").min(1, "price is required"),
      discount: z.number().int("enter a valid percentage"),
    })
    .required(),
  category: z.enum(["burger", "pizza", "salad"], {
    errorMap: () => ({ message: "You have to select a gender option" }),
  }),
});
export type ADD_SCHEMA = z.infer<typeof schema>;
