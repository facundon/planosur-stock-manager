import { useState } from "react"
import { CommonForm } from "../../../shared/components/form"
import { useCategoriesQuery, useUpdateCategoryQuery } from "../queries"
import { getCategoryFormFields } from "../formFields"
import { categoryFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"
import AsyncSelect from "../../../shared/components/form/AsyncSelect"

export const UpdateCategoryForm: React.FC = () => {
   const [categoryId, setCategoryId] = useState("")
   const [isOpen, setIsOpen] = useBoolean(false)

   const { data: categories } = useCategoriesQuery(isOpen)
   const currentCategory = categories?.find(category => category.id === +categoryId)

   function handleClose() {
      setIsOpen.off()
      setCategoryId("")
   }

   return (
      <>
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Editar Categoría"
            submitText="Aplicar"
            query={useUpdateCategoryQuery}
            queryParams={+categoryId}
            disabled={!categoryId}
            rules={categoryFormRules}
            onClose={handleClose}
            isOpen={isOpen}
            fields={getCategoryFormFields({ initialValues: currentCategory })}
         >
            <AsyncSelect
               onChange={e => setCategoryId(e.target.value)}
               value={categoryId}
               bgColor="primary"
               color="blackAlpha.900"
               fontWeight={600}
               withEmptyOption
            >
               {categories?.map(category => (
                  <option key={category.id} value={category.id}>
                     {category.name}
                  </option>
               ))}
            </AsyncSelect>
         </CommonForm>
      </>
   )
}
