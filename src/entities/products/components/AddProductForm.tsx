import { CommonForm, SelectOption } from "../../../shared/components/form"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { useAddProductQuery } from "../queries"
import { addProductRules } from "./formRules"

const AddProductForm: React.FC = () => {
   const { data: categoriesData, isLoading: isLoadingCategories } = useCategoriesQuery()
   const { data: providersData, isLoading: isLoadingProviders } = useProvidersQuery()

   const categories = categoriesData?.map<SelectOption>(category => ({
      label: category.name,
      value: category.id.toString(),
   }))

   const providers = providersData?.map<SelectOption>(provider => ({
      label: provider.name,
      value: provider.id.toString(),
   }))

   return (
      <CommonForm
         title="Agregar Producto"
         submitText="Agregar"
         query={useAddProductQuery}
         rules={addProductRules}
         fields={[
            {
               initialValue: "",
               label: "Nombre",
               name: "name",
               required: true,
               type: "text",
            },
            {
               initialValue: "",
               label: "Código",
               name: "code",
               required: true,
               type: "text",
            },
            {
               initialValue: 0,
               label: "Precio",
               name: "price",
               required: true,
               type: "number",
            },
            [
               {
                  initialValue: 1,
                  label: "Cantidad",
                  name: "qty",
                  required: true,
                  type: "number",
               },
               {
                  initialValue: "g",
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
                  initialValue: 0,
                  label: "Stock",
                  name: "currentStock",
                  required: true,
                  type: "number",
               },
               {
                  initialValue: 0,
                  label: "Stock Mín.",
                  name: "minStock",
                  required: true,
                  type: "number",
               },
               {
                  initialValue: 10,
                  label: "Stock Máx.",
                  name: "maxStock",
                  required: true,
                  type: "number",
               },
            ],
            [
               {
                  initialValue: "",
                  label: "Proveedor",
                  name: "providerId",
                  required: false,
                  type: "select",
                  options: providers,
                  isLoadingOptions: isLoadingProviders,
               },
               {
                  initialValue: "",
                  label: "Categoría",
                  name: "categoryId",
                  required: false,
                  type: "select",
                  options: categories,
                  isLoadingOptions: isLoadingCategories,
               },
            ],
         ]}
      />
   )
}

export default AddProductForm
