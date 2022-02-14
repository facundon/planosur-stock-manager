import { useState } from "react"
import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { SelectWithQuery } from "../../../shared/components"
import { useCategoriesQuery, useUpdateCategoryQuery } from "../queries"
import { CATEGORIES_KEYS } from "../queryKeys"
import { getCategoryFormFields } from "./formFields"
import { categoryFormRules } from "./formRules"

const UpdateCategoryForm: React.FC = () => {
   const [categoryId, setCategoryId] = useState("")
   const queryClient = useQueryClient()

   const { data } = useCategoriesQuery()

   const currentCategory = data?.find(category => category.id === +categoryId)

   return (
      <CommonForm
         title={"Modificar Categoría"}
         submitText="Modificar"
         query={useUpdateCategoryQuery}
         queryParams={+categoryId}
         onSuccess={() => queryClient.invalidateQueries(CATEGORIES_KEYS.base)}
         disabled={!categoryId}
         rules={categoryFormRules}
         fields={getCategoryFormFields({ initialValues: currentCategory })}
      >
         <SelectWithQuery
            query={useCategoriesQuery}
            mapOptionsTo={{ label: "name", value: "id" }}
            onChange={setCategoryId}
         />
      </CommonForm>
   )
}

export default UpdateCategoryForm
