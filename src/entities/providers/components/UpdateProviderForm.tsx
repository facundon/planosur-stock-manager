import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { CommonForm } from "../../../shared/components/form"
import { SelectWithQuery } from "../../../shared/components"
import { useProvidersQuery, useUpdateProviderQuery } from "../queries"
import { PROVIDERS_KEYS } from "../queryKeys"
import { getProviderFormFields } from "../formFields"
import { providerFormRules } from "../formRules"
import { Button, useBoolean } from "@chakra-ui/react"

const UpdateProviderForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const [providerId, setProviderId] = useState("")

   const queryClient = useQueryClient()

   const { data } = useProvidersQuery(isOpen)
   const currentProvider = data?.find(provider => provider.id === +providerId)

   useEffect(() => {
      if (data) setProviderId(data[0].id.toString())
   }, [data])

   return (
      <>
         <Button onClick={setIsOpen.on}>Modificar Proveedor</Button>
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
            <SelectWithQuery
               query={useProvidersQuery}
               mapOptionsTo={{ label: "name", value: "id" }}
               onChange={setProviderId}
               value={providerId}
               bgColor="secondary"
               color="text"
               fontWeight={600}
            />
         </CommonForm>
      </>
   )
}

export default UpdateProviderForm
