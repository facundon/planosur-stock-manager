import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { useProvidersQuery, useUpdateProviderQuery } from "../queries"
import { PROVIDERS_KEYS } from "../queryKeys"
import { getProviderFormFields } from "../formFields"
import { providerFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"
import AsyncSelect from "../../../shared/components/form/AsyncSelect"

const UpdateProviderForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const [providerId, setProviderId] = useState("")

   const queryClient = useQueryClient()

   const { data: providers } = useProvidersQuery(isOpen)
   const currentProvider = providers?.find(provider => provider.id === +providerId)

   useEffect(() => {
      if (providers) setProviderId(providers[0].id.toString())
   }, [providers])

   return (
      <>
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Modificar Proveedor"
            submitText="Modificar"
            query={useUpdateProviderQuery}
            queryParams={+providerId}
            onSuccess={() => queryClient.invalidateQueries(PROVIDERS_KEYS.base)}
            disabled={!providerId}
            rules={providerFormRules}
            isOpen={isOpen}
            onClose={setIsOpen.off}
            fields={getProviderFormFields({ initialValues: currentProvider })}
         >
            <AsyncSelect
               onChange={e => setProviderId(e.target.value)}
               value={providerId}
               bgColor="secondary"
               color="text"
               fontWeight={600}
            >
               {providers?.map(provider => (
                  <option key={provider.id} value={provider.id}>
                     {provider.name}
                  </option>
               ))}
            </AsyncSelect>
         </CommonForm>
      </>
   )
}

export default UpdateProviderForm
