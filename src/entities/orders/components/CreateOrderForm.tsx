import { useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { BaseForm } from "../../../shared/components"
import { AddButton } from "../../../shared/components/buttons"
import { AsyncSelect } from "../../../shared/components/form/AsyncSelect"
import { useProductsQuery } from "../../products/queries"
import { useProvidersQuery } from "../../providers/queries"

export const CreateOrderForm: React.FC = () => {
   const { isOpen, onClose, onOpen } = useDisclosure()
   const [currentProvider, setCurrentProvider] = useState("")

   const {
      data: providers,
      isLoading: isLoadingProviders,
      isError: isProvidersError,
   } = useProvidersQuery(isOpen)

   const { data: products } = useProductsQuery({
      enabled: isOpen && Boolean(currentProvider),
      needStock: true,
   })

   return (
      <>
         <AddButton onClick={onOpen} title="Nuevo">
            Nueva Orden
         </AddButton>
         <BaseForm
            isOpen={isOpen}
            onClose={onClose}
            title="Nuevo Pedido"
            onSubmit={() => null}
            submitText="Crear"
         >
            <AsyncSelect
               isLoading={isLoadingProviders}
               isError={isProvidersError}
               onChange={e => setCurrentProvider(e.target.value)}
               withEmptyOption
            >
               {providers?.map(provider => (
                  <option key={provider.id} value={provider.id}>
                     {provider.name}
                  </option>
               ))}
            </AsyncSelect>
         </BaseForm>
      </>
   )
}
