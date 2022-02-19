import { useState } from "react"
import { useBoolean } from "@chakra-ui/react"
import { CommonForm, SelectOption } from "../../../shared/components/form"
import { DropdownQuery } from "../../../shared/components"
import { useProductQuery, useProductsQuery, useUpdateProductQuery } from "../queries"
import { getProductFormFields } from "../formFields"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { productFormRules } from "../formRules"
import { ModifyButton } from "../../../shared/components/buttons"

const UpdateProductForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const [currentProductCode, setCurrentProductCode] = useState<string>()

   const { data: categoriesData, isLoading: isLoadingCategories } = useCategoriesQuery(isOpen)
   const { data: providersData, isLoading: isLoadingProviders } = useProvidersQuery(isOpen)

   const { data: currentProduct } = useProductQuery({
      code: currentProductCode,
      enabled: Boolean(currentProductCode),
   })

   const categories = categoriesData?.map<SelectOption>(category => ({
      label: category.name,
      value: category.id.toString(),
   }))

   const providers = providersData?.map<SelectOption>(provider => ({
      label: provider.name,
      value: provider.id.toString(),
   }))

   function handleClose() {
      setIsOpen.off()
      setCurrentProductCode(undefined)
   }

   return (
      <>
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Editar Producto"
            submitText="Aplicar"
            query={useUpdateProductQuery}
            queryParams={currentProductCode}
            disabled={!currentProductCode}
            rules={productFormRules}
            isOpen={isOpen}
            onClose={handleClose}
            onSuccess={handleClose}
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
               onChange={setCurrentProductCode}
            />
         </CommonForm>
      </>
   )
}

export default UpdateProductForm
