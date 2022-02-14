import { CommonFormProps, SelectOption } from "../../shared/components/form/types"
import { Provider, ProviderFormDto } from "./domain"

export function getProviderFormFields(props?: {
   initialValues?: Provider
   optionFields?: Partial<
      Record<keyof Provider, { options: SelectOption[] | undefined; isLoading?: boolean }>
   >
}): CommonFormProps<ProviderFormDto, never>["fields"] {
   return [
      {
         name: "name",
         label: "Nombre",
         initialValue: props?.initialValues?.name || "",
         required: true,
         type: "text",
      },
      {
         name: "email",
         label: "Email",
         initialValue: props?.initialValues?.email || "",
         required: false,
         type: "email",
      },
      {
         name: "phone",
         label: "Teléfono",
         initialValue: props?.initialValues?.phone || undefined,
         required: false,
         type: "number",
      },
      {
         name: "address",
         label: "Dirección",
         initialValue: props?.initialValues?.address || "",
         required: false,
         type: "text",
      },
   ]
}
