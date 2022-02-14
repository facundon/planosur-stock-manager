import { RegisterOptions } from "react-hook-form"
import { ProductFormDto } from "../domain"

export const productFormRules: Partial<Record<keyof ProductFormDto, RegisterOptions>> = {
   name: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Ingrese un nombre" },
      setValueAs: (value: string) =>
         value.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
         }),
   },
   code: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Ingrese un código" },
   },
   currentStock: {
      min: { value: 0, message: "Mínimo 0" },
      max: { value: 1000, message: "Máximo 1000" },
      required: { value: true, message: "Ingrese el stock actual" },
      valueAsNumber: true,
   },
   maxStock: {
      min: { value: 1, message: "Mínimo 1" },
      max: { value: 1000, message: "Máximo 1000" },
      required: { value: true, message: "Ingrese el stock máximo" },
      valueAsNumber: true,
   },
   minStock: {
      min: { value: 0, message: "Mínimo 0" },
      max: { value: 800, message: "Máximo 800" },
      required: { value: true, message: "Ingrese el stock mínimo" },
      valueAsNumber: true,
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
      valueAsNumber: true,
   },
}
