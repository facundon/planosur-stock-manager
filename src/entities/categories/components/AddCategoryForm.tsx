import { useAddCategoryQuery } from "../queries"
import { categoryFormRules } from "../formRules"
import { CommonForm } from "../../../shared/components/form"
import { CATEGORIES_KEYS } from "../queryKeys"
import { useQueryClient } from "react-query"
import { getCategoryFormFields } from "../formFields"
import { Button, useBoolean } from "@chakra-ui/react"

export const AddCategoryForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const queryClient = useQueryClient()

   return (
      <>
         <Button onClick={setIsOpen.on}>Agregar Categoría</Button>
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
