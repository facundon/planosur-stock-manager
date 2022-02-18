import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { useCategoriesQuery, useUpdateCategoryQuery } from "../queries"
import { CATEGORIES_KEYS } from "../queryKeys"
import { getCategoryFormFields } from "../formFields"
import { categoryFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"
import AsyncSelect from "../../../shared/components/form/AsyncSelect"

const UpdateCategoryForm: React.FC = () => {
   const [categoryId, setCategoryId] = useState("")
   const [isOpen, setIsOpen] = useBoolean(false)

   const queryClient = useQueryClient()

   const { data: categories } = useCategoriesQuery(isOpen)
   const currentCategory = categories?.find(category => category.id === +categoryId)

   useEffect(() => {
      if (categories) setCategoryId(categories[0].id.toString())
   }, [categories])

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
            <AsyncSelect
               onChange={e => setCategoryId(e.target.value)}
               value={categoryId}
               bgColor="secondary"
               color="text"
               fontWeight={600}
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

export default UpdateCategoryForm
