import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  scientific_name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(100, { message: "Veuillez inserer 100 caracteres max." }),
  maturity_height: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  maturity_width: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  family: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  origin: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  flower_color: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  leaf_color: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  description1: z.string(),
  description2: z.string(),
  size: z.string().max(50, { message: "Veuillez inserer 50 caracteres max." }),
  pot: z.string().max(50, { message: "Veuillez inserer 50 caracteres max." }),
  stock: z.number().int().nonnegative(),
  price: z
    .number()
    .positive({ message: "Veuillez inserer un numéro valid." })
    .transform((price) => parseFloat(price.toFixed(2))),
  vat: z.number().positive({ message: "Veuillez inserer un numéro valid." }),
  status: z.boolean(),
  yield_id: z.number(),
  hardiness_zone_id: z.number(),
  water_requirement_id: z.number(),
  exposure_id: z.number(),
  ground_cover_power_id: z.number(),
  strate_id: z.number(),
  foliage_id: z.number(),
});

export const userUpdateSchema = z.object({
  last_name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  first_name: z
    .string()
    .min(2, { message: "Le prénom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." }),
  phone: z.string().max(15, { message: "Veuillez inserer 15 caracteres max." }),
  email: z.string().email({
    message: "Entrez un email valid",
  }),
  phone: z.string(),
});

export const registerSchema = z
  .object({
    first_name: z.string().min(1, "Le prénom est requis."),
    last_name: z.string().min(1, "Le nom est requis."),
    email: z
      .string()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Vous devez fournir un email valide.",
      ),
    phone: z.string().min(10, "Le numéro de téléphone est requis."),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (#?!@$%^&*-_).",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Vous devez fournir un email valide.",
    ),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (#?!@$%^&*-_).",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
