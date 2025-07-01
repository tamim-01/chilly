import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const schema = z.object({
  title: z.string().min(3, "Food name Must have at least 3 character"),
  spicy: z.boolean(),
  active: z.boolean(),
  images: z
    .instanceof(Array<File>)
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
  image_urls: z.array(z.string()),
  payment_type: z
    .object({
      value: z.number().int("enter a valid price").min(1, "price is required"),
      discount: z.number().int("enter a valid percentage"),
    })
    .required(),
  category: z.enum(["burger", "pizza", "salad"], {
    errorMap: () => ({ message: "you have to select an option" }),
  }),
  dependency: z
    .array(
      z.object({
        label: z.string(),
        value: z.number().int().min(1, "value cant be empty"),
        id: z.number().int(),
      })
    )
    .nonempty("you have to select at least one dependency"),
  description: z
    .string()
    .min(5, "Description must be at least 5 character long"),
});
export type EDIT_SCHEMA = z.infer<typeof schema>;
