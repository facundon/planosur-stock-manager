import { CommonForm } from "../../../shared/components/form"
import { useAddProviderQuery } from "../queries"
import { addProviderRules } from "./formRules"

const AddProviderForm: React.FC = () => {
   return (
      <CommonForm
         title="Agregar Proveedor"
         submitText="Agregar"
         query={useAddProviderQuery}
         rules={addProviderRules}
         fields={[
            {
               name: "name",
               label: "Nombre",
               initialValue: "",
               required: true,
               type: "text",
            },
            {
               name: "email",
               label: "Email",
               initialValue: "",
               required: false,
               type: "email",
            },
            {
               name: "address",
               label: "Dirección",
               initialValue: "",
               required: false,
               type: "text",
            },
            {
               name: "phone",
               label: "Teléfono",
               initialValue: "",
               required: false,
               type: "number",
            },
         ]}
      />
   )
}

export default AddProviderForm
