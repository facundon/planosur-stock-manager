import { RegisterOptions } from "react-hook-form"
import { AddProductFormDto } from "../domain"

export const addProductRules: Partial<Record<keyof AddProductFormDto, RegisterOptions>> = {
   name: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Ingrese un nombre" },
   },
   code: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Ingrese un código" },
   },
   currentStock: {
      min: { value: 0, message: "Mínimo 0" },
      max: { value: 1000, message: "Máximo 1000" },
      required: { value: true, message: "Ingrese el stock actual" },
   },
   maxStock: {
      min: { value: 1, message: "Mínimo 1" },
      max: { value: 1000, message: "Máximo 1000" },
      required: { value: true, message: "Ingrese el stock máximo" },
   },
   minStock: {
      min: { value: 0, message: "Mínimo 0" },
      max: { value: 800, message: "Máximo 800" },
      required: { value: true, message: "Ingrese el stock mínimo" },
   },
   price: {
      min: { value: 1, message: "Mínimo 1" },
      max: { value: 999999, message: "Máximo 999999" },
      required: { value: true, message: "Ingrese el precio" },
   },
   qty: {
      min: { value: 0.1, message: "Mínimo 1" },
      max: { value: 10000, message: "Máximo 10000" },
      required: { value: true, message: "Ingrese cantidad" },
   },
}
