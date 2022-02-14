import { CommonFormProps, SelectOption } from "../../../shared/components/form/types"
import { Category, CategoryFormDto } from "../domain"

export function getCategoryFormFields(props?: {
   initialValues?: Category
   optionFields?: Partial<
      Record<keyof Category, { options: SelectOption[] | undefined; isLoading?: boolean }>
   >
}): CommonFormProps<CategoryFormDto, never>["fields"] {
   return [
      {
         name: "name",
         label: "Nombre",
         initialValue: props?.initialValues?.name || "",
         required: true,
         type: "text",
      },
   ]
}
