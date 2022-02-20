import { CommonFormProps, SelectOption } from "../../shared/components/form/types"
import { Product, ProductFormDto } from "./domain"

export function getProductFormFields(props?: {
   initialValues?: Product
   optionFields?: Partial<
      Record<keyof Product, { options: SelectOption[] | undefined; isLoading?: boolean }>
   >
}): CommonFormProps<ProductFormDto, never>["fields"] {
   return [
      [
         {
            initialValue: props?.initialValues?.name || "",
            label: "Nombre",
            name: "name",
            required: true,
            type: "text",
         },
         {
            initialValue: props?.initialValues?.code || "",
            label: "Código",
            name: "code",
            required: true,
            type: "text",
         },
      ],
      {
         initialValue: props?.initialValues?.price || "",
         label: "Precio",
         name: "price",
         required: true,
         type: "number",
      },
      [
         {
            initialValue: props?.initialValues?.qty || 1,
            label: "Cantidad",
            name: "qty",
            required: true,
            type: "number",
         },
         {
            initialValue: props?.initialValues?.unit || "g",
            label: "Unidad",
            name: "unit",
            required: true,
            type: "select",
            options: [
               { label: "g", value: "g" },
               { label: "kg", value: "kg" },
               { label: "ml", value: "ml" },
               { label: "lt", value: "lt" },
            ],
         },
      ],
      [
         {
            initialValue: props?.initialValues?.providerId || "",
            label: "Proveedor",
            name: "providerId",
            type: "select",
            options: props?.optionFields?.providerId?.options,
            isLoadingOptions: props?.optionFields?.providerId?.isLoading,
            withEmptyOption: true,
         },
         {
            initialValue: props?.initialValues?.categoryId || "",
            label: "Categoría",
            name: "categoryId",
            type: "select",
            options: props?.optionFields?.categoryId?.options,
            isLoadingOptions: props?.optionFields?.categoryId?.isLoading,
            withEmptyOption: true,
         },
      ],
      [
         {
            initialValue: props?.initialValues?.blankStock || 0,
            label: "Stock Capial",
            name: "blankStock",
            required: true,
            type: "number",
         },
         {
            initialValue: props?.initialValues?.unregisteredStock || 0,
            label: "Stock Provincia",
            name: "unregisteredStock",
            required: true,
            type: "number",
         },
      ],
      [
         {
            initialValue: props?.initialValues?.unregisteredMinStock || 0,
            label: "Stock Mín. Capital",
            name: "blankMinStock",
            required: true,
            type: "number",
         },
         {
            initialValue: props?.initialValues?.unregisteredMinStock || 0,
            label: "Stock Mín. Provincia",
            name: "unregisteredMinStock",
            required: true,
            type: "number",
         },
      ],
      [
         {
            initialValue: props?.initialValues?.unregisteredMaxStock || 10,
            label: "Stock Máx. Capital",
            name: "blankMaxStock",
            required: true,
            type: "number",
         },
         {
            initialValue: props?.initialValues?.unregisteredMaxStock || 10,
            label: "Stock Máx. Provincia",
            name: "unregisteredMaxStock",
            required: true,
            type: "number",
         },
      ],
   ]
}
