import { CommonForm } from "../../../shared/components/form"
import { useUpdateCategoryQuery } from "../queries"

const UpdateCategoryForm: React.FC = () => {
   return (
      <CommonForm
         title={"Modificar Categoría"}
         submitText="Modificar"
         query={useUpdateCategoryQuery}
         fields={[
            { name: "name", label: "Nombre", initialValue: "", type: "text", required: true },
         ]}
      />
   )
}

export default UpdateCategoryForm
