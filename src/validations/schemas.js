import { z } from "zod";
import escapeHtml from "escape-html";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  scientific_name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(100, { message: "Veuillez inserer 100 caracteres max." })
    .transform(escapeHtml),
  maturity_height: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  maturity_width: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  family: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  origin: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  flower_color: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  leaf_color: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  description1: z.string().transform(escapeHtml),
  description2: z.string().transform(escapeHtml),
  size: z
    .string()
    .min(2, { message: "La taille est requise" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  pot: z
    .string()
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  stock: z.number().int().nonnegative(),
  price: z
    .number()
    .positive({ message: "Veuillez inserer un numéro valid." })
    .transform((price) => parseFloat(price.toFixed(2))),
  vat: z.number().positive({ message: "Veuillez inserer un numéro valid." }),
  status: z.boolean(),
  yield: z.string().transform(escapeHtml),
  hardiness_zone: z.string().transform(escapeHtml),
  water_requirement: z.string().transform(escapeHtml),
  exposure: z.string().transform(escapeHtml),
  ground_cover_power: z.string().transform(escapeHtml),
  strate: z.string().transform(escapeHtml),
  foliage: z.string().transform(escapeHtml),
});

export const userUpdateSchema = z.object({
  last_name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  first_name: z
    .string()
    .min(2, { message: "Le prénom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  phone: z
    .string()
    .max(15, { message: "Veuillez inserer 15 caracteres max." })
    .transform(escapeHtml),
  email: z
    .string()
    .email({
      message: "Entrez un email valid",
    })
    .transform(escapeHtml),
  phone: z.string().transform(escapeHtml),
});

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "Le prénom est requis.")
      .transform(escapeHtml),
    last_name: z.string().min(1, "Le nom est requis.").transform(escapeHtml),
    email: z
      .string()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Vous devez fournir un email valide.",
      ),
    phone: z
      .string()
      .min(10, "Le numéro de téléphone est requis.")
      .transform(escapeHtml),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (#?!@$%^&*-_).",
      )
      .transform(escapeHtml),
    confirmPassword: z.string().transform(escapeHtml),
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
    )
    .transform(escapeHtml),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (#?!@$%^&*-_).",
      )
      .transform(escapeHtml),
    confirmPassword: z.string().transform(escapeHtml),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export const changePassword = z
  .object({
    oldPassword: z.string().transform(escapeHtml),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
        "Le nouveau mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (#?!@$%^&*-_).",
      )
      .transform(escapeHtml),
    confirmPassword: z.string().transform(escapeHtml),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
