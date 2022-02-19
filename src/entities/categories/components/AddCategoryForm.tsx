import { useAddCategoryQuery } from "../queries"
import { categoryFormRules } from "../formRules"
import { CommonForm } from "../../../shared/components/form"
import { getCategoryFormFields } from "../formFields"
import { useBoolean } from "@chakra-ui/react"
import { AddButton } from "../../../shared/components/buttons"

export const AddCategoryForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)

   return (
      <>
         <AddButton onClick={setIsOpen.on} />
         <CommonForm
            title="Agregar Categoría"
            submitText="Agregar"
            query={useAddCategoryQuery}
            rules={categoryFormRules}
            onClose={setIsOpen.off}
            isOpen={isOpen}
            fields={getCategoryFormFields()}
         />
      </>
   )
}
