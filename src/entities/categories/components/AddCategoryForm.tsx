import { useAddCategoryQuery } from "../queries"
import { categoryFormRules } from "../formRules"
import { CommonForm } from "../../../shared/components/form"
import { CATEGORIES_KEYS } from "../queryKeys"
import { useQueryClient } from "react-query"
import { getCategoryFormFields } from "../formFields"
import { useBoolean } from "@chakra-ui/react"
import { AddButton } from "../../../shared/components/buttons"

export const AddCategoryForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const queryClient = useQueryClient()

   return (
      <>
         <AddButton onClick={setIsOpen.on} />
         <CommonForm
            title="Agregar Categoría"
            submitText="Agregar"
            query={useAddCategoryQuery}
            rules={categoryFormRules}
            onSuccess={() => queryClient.invalidateQueries(CATEGORIES_KEYS.base)}
            onClose={setIsOpen.off}
            isOpen={isOpen}
            fields={getCategoryFormFields()}
         />
      </>
   )
}
