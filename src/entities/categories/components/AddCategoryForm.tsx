import { useAddCategoryQuery } from "../queries"
import { categoryFormRules } from "../formRules"
import { CommonForm } from "../../../shared/components/form"
import { CATEGORIES_KEYS } from "../queryKeys"
import { useQueryClient } from "react-query"
import { getCategoryFormFields } from "../formFields"

export const AddCategoryForm: React.FC = () => {
   const queryClient = useQueryClient()

   return (
      <CommonForm
         title="Agregar Categoría"
         submitText="Agregar"
         query={useAddCategoryQuery}
         rules={categoryFormRules}
         onSuccess={() => queryClient.invalidateQueries(CATEGORIES_KEYS.base)}
         fields={getCategoryFormFields()}
      />
   )
}
