import { useState } from "react"
import { CommonForm } from "../../../shared/components/form"
import { useProvidersQuery, useUpdateProviderQuery } from "../queries"
import { getProviderFormFields } from "../formFields"
import { providerFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { ModifyButton } from "../../../shared/components/buttons"
import AsyncSelect from "../../../shared/components/form/AsyncSelect"

export const UpdateProviderForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const [providerId, setProviderId] = useState("")

   const { data: providers } = useProvidersQuery(isOpen)
   const currentProvider = providers?.find(provider => provider.id === +providerId)

   function handleClose() {
      setIsOpen.off()
      setProviderId("")
   }

   return (
      <>
         <ModifyButton onClick={setIsOpen.on} />
         <CommonForm
            title="Editar Proveedor"
            submitText="Aplicar"
            query={useUpdateProviderQuery}
            queryParams={+providerId}
            disabled={!providerId}
            rules={providerFormRules}
            isOpen={isOpen}
            onClose={handleClose}
            fields={getProviderFormFields({ initialValues: currentProvider })}
         >
            <AsyncSelect
               onChange={e => setProviderId(e.target.value)}
               value={providerId}
               bgColor="primary"
               color="blackAlpha.900"
               fontWeight={600}
               withEmptyOption
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
