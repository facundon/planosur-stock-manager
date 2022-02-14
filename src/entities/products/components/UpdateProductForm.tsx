import { useState } from "react"
import { CommonForm, SelectOption } from "../../../shared/components/form"
import { SelectWithQuery } from "../../../shared/components"
import { useProductsQuery, useUpdateProductQuery } from "../queries"
import { getProductFormFields } from "./formFields"
import { useCategoriesQuery } from "../../categories/queries"
import { useProvidersQuery } from "../../providers/queries"
import { productFormRules } from "./formRules"

const UpdateProductForm: React.FC = () => {
   const [productId, setProductId] = useState("")
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

   const { data } = useProductsQuery()
   const currentProduct = data?.find(product => product.code === productId)

   return (
      <CommonForm
         title="Modificar Producto"
         submitText="Modificar"
         query={useUpdateProductQuery}
         queryParams={productId}
         disabled={!productId}
         rules={productFormRules}
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
         />
      </CommonForm>
   )
}

export default UpdateProductForm
