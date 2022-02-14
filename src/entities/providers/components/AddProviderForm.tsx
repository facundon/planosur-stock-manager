import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { useAddProviderQuery } from "../queries"
import { PROVIDERS_KEYS } from "../queryKeys"
import { getProviderFormFields } from "../formFields"
import { providerFormRules } from "../formRules"

const AddProviderForm: React.FC = () => {
   const queryClient = useQueryClient()

   return (
      <CommonForm
         title="Agregar Proveedor"
         submitText="Agregar"
         query={useAddProviderQuery}
         rules={providerFormRules}
         onSuccess={() => queryClient.invalidateQueries(PROVIDERS_KEYS.base)}
         fields={getProviderFormFields()}
      />
   )
}

export default AddProviderForm
