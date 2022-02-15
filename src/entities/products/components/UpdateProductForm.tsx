import { useEffect, useState } from "react"
import { CommonForm, SelectOption } from "../../../shared/components/form"
import { SelectWithQuery } from "../../../shared/components"
import { useProductsQuery, useUpdateProductQuery } from "../queries"
import { getProductFormFields } from "../formFields"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { productFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"

const UpdateProductForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const [productId, setProductId] = useState("")

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

   const { data } = useProductsQuery(isOpen)
   const currentProduct = data?.find(product => product.code === productId)

   useEffect(() => {
      if (data) setProductId(data[0].code)
   }, [data])

   return (
      <>
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Modificar Producto"
            submitText="Modificar"
            query={useUpdateProductQuery}
            queryParams={productId}
            disabled={!productId}
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
            <SelectWithQuery
               query={useProductsQuery}
               mapOptionsTo={{ label: "name", value: "code" }}
               onChange={setProductId}
               value={productId}
               bgColor="secondary"
               color="text"
               fontWeight={600}
            />
         </CommonForm>
      </>
   )
}

export default UpdateProductForm
