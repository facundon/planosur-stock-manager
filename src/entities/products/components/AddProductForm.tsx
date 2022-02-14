import { CommonForm, SelectOption } from "../../../shared/components/form"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { useAddProductQuery } from "../queries"
import { getProductFormFields } from "../formFields"
import { productFormRules } from "../formRules"
import { Button, useBoolean } from "@chakra-ui/react"

const AddProductForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const { data: categoriesData, isLoading: isLoadingCategories } = useCategoriesQuery(isOpen)
   const { data: providersData, isLoading: isLoadingProviders } = useProvidersQuery(isOpen)

   const categories = categoriesData?.map<SelectOption>(category => ({
      label: category.name,
      value: category.id.toString(),
   }))

   const providers = providersData?.map<SelectOption>(provider => ({
      label: provider.name,
      value: provider.id.toString(),
   }))

   return (
      <>
         <Button onClick={setIsOpen.on}>Agregar Producto</Button>
         <CommonForm
            title="Agregar Producto"
            submitText="Agregar"
            query={useAddProductQuery}
            rules={productFormRules}
            onClose={setIsOpen.off}
            isOpen={isOpen}
            fields={getProductFormFields({
               optionFields: {
                  providerId: { options: providers, isLoading: isLoadingProviders },
                  categoryId: { options: categories, isLoading: isLoadingCategories },
               },
            })}
         />
      </>
   )
}

export default AddProductForm
