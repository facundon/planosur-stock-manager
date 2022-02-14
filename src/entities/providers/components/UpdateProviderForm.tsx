import { useState } from "react"
import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { SelectWithQuery } from "../../../shared/components"
import { useProvidersQuery, useUpdateProviderQuery } from "../queries"
import { PROVIDERS_KEYS } from "../queryKeys"
import { getProviderFormFields } from "../formFields"
import { providerFormRules } from "../formRules"

const UpdateProviderForm: React.FC = () => {
   const [providerId, setProviderId] = useState("")
   const queryClient = useQueryClient()

   const { data } = useProvidersQuery()

   const currentProvider = data?.find(provider => provider.id === +providerId)

   return (
      <CommonForm
         title="Modificar Proveedor"
         submitText="Modificar"
         query={useUpdateProviderQuery}
         queryParams={+providerId}
         onSuccess={() => queryClient.invalidateQueries(PROVIDERS_KEYS.base)}
         disabled={!providerId}
         rules={providerFormRules}
         fields={getProviderFormFields({ initialValues: currentProvider })}
      >
         <SelectWithQuery
            query={useProvidersQuery}
            mapOptionsTo={{ label: "name", value: "id" }}
            onChange={setProviderId}
            bgColor="secondary"
            color="text"
            fontWeight={600}
         />
      </CommonForm>
   )
}

export default UpdateProviderForm
