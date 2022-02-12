import { RegisterOptions } from "react-hook-form"
import { AddCategoryFormDto } from "../../entities/categories/domain"

export const addCategoryRules: Record<keyof AddCategoryFormDto, RegisterOptions> = {
   name: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Este campo es requerido" },
   },
}
