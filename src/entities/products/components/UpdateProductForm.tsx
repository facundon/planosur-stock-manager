import { useState } from "react"
import { CommonForm, SelectOption } from "../../../shared/components/form"
import { DropdownQuery } from "../../../shared/components"
import { useProductsQuery, useUpdateProductQuery } from "../queries"
import { getProductFormFields } from "../formFields"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { productFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"
import { ProductWithProviderAndCategory } from "../domain"

const UpdateProductForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const [currentProduct, setCurrentProduct] = useState<ProductWithProviderAndCategory>()

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
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Editar Producto"
            submitText="Aplicar"
            query={useUpdateProductQuery}
            queryParams={currentProduct?.code}
            disabled={!currentProduct}
            rules={productFormRules}
            isOpen={isOpen}
            onClose={setIsOpen.off}
            onSuccess={setIsOpen.off}
            fields={getProductFormFields({
               initialValues: currentProduct,
               optionFields: {
                  providerId: { options: providers, isLoading: isLoadingProviders },
                  categoryId: { options: categories, isLoading: isLoadingCategories },
               },
            })}
         >
            <DropdownQuery
               query={useProductsQuery}
               mapOptionsTo={{ label: "name", value: "code" }}
               onChange={setCurrentProduct}
               value={currentProduct?.code}
            />
         </CommonForm>
      </>
   )
}

export default UpdateProductForm
