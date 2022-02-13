import { useAddCategoryQuery } from "../queries"
import { addCategoryRules } from "./formRules"
import { CommonForm } from "../../../shared/components/form/CommonForm"

export const AddCategoryForm: React.FC = () => {
   return (
      <CommonForm
         title="Agregar Categoría"
         submitText="Agregar"
         query={useAddCategoryQuery}
         rules={addCategoryRules}
         fields={[
            { initialValue: "", label: "Nombre", name: "name", required: true, type: "text" },
         ]}
      />
   )
}
