import { CommonForm, SelectOption } from "../../../shared/components/form"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { useAddProductQuery } from "../queries"
import { getProductFormFields } from "../formFields"
import { productFormRules } from "../formRules"

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
         rules={productFormRules}
         fields={getProductFormFields({
            optionFields: {
               providerId: { options: providers, isLoading: isLoadingProviders },
               categoryId: { options: categories, isLoading: isLoadingCategories },
            },
         })}
      />
   )
}

export default AddProductForm
