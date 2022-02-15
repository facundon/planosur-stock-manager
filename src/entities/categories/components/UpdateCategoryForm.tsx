import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { SelectWithQuery } from "../../../shared/components"
import { useCategoriesQuery, useUpdateCategoryQuery } from "../queries"
import { CATEGORIES_KEYS } from "../queryKeys"
import { getCategoryFormFields } from "../formFields"
import { categoryFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"

const UpdateCategoryForm: React.FC = () => {
   const [categoryId, setCategoryId] = useState("")
   const [isOpen, setIsOpen] = useBoolean(false)

   const queryClient = useQueryClient()

   const { data } = useCategoriesQuery(isOpen)
   const currentCategory = data?.find(category => category.id === +categoryId)

   useEffect(() => {
      if (data) setCategoryId(data[0].id.toString())
   }, [data])

   return (
      <>
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Modificar Categoría"
            submitText="Modificar"
            query={useUpdateCategoryQuery}
            queryParams={+categoryId}
            onSuccess={() => {
               queryClient.invalidateQueries(CATEGORIES_KEYS.base)
               setIsOpen.off()
            }}
            disabled={!categoryId}
            rules={categoryFormRules}
            onClose={setIsOpen.off}
            isOpen={isOpen}
            fields={getCategoryFormFields({ initialValues: currentCategory })}
         >
            <SelectWithQuery
               query={useCategoriesQuery}
               mapOptionsTo={{ label: "name", value: "id" }}
               onChange={setCategoryId}
               value={categoryId}
               bgColor="secondary"
               color="text"
               fontWeight={600}
            />
         </CommonForm>
      </>
   )
}

export default UpdateCategoryForm
