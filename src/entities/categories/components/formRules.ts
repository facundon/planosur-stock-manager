import { RegisterOptions } from "react-hook-form"
import { CategoryFormDto } from "../domain"

export const categoryFormRules: Partial<Record<keyof CategoryFormDto, RegisterOptions>> = {
   name: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Este campo es requerido" },
      setValueAs: (value: string) =>
         value.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
         }),
   },
}
