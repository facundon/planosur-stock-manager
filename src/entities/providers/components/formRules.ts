import { RegisterOptions } from "react-hook-form"
import { ProviderFormDto } from "../domain"

export const providerFormRules: Partial<Record<keyof ProviderFormDto, RegisterOptions>> = {
   name: {
      maxLength: { value: 25, message: "Máximo 25 caracteres" },
      required: { value: true, message: "Ingrese un nombre" },
      setValueAs: (value: string) =>
         value.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
         }),
   },
   email: {
      pattern:
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ||
         "Ingrese un Email válido",
   },
   phone: {
      min: { value: 8, message: "Ingrese un teléfono válido" },
      valueAsNumber: true,
   },
}
