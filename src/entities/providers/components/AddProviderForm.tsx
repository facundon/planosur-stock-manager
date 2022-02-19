import { CommonForm } from "../../../shared/components/form"
import { useAddProviderQuery } from "../queries"
import { getProviderFormFields } from "../formFields"
import { providerFormRules } from "../formRules"
import { useBoolean } from "@chakra-ui/react"
import { AddButton } from "../../../shared/components/buttons"

const AddProviderForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)

   return (
      <>
         <AddButton onClick={setIsOpen.on} />
         <CommonForm
            title="Agregar Proveedor"
            submitText="Agregar"
            query={useAddProviderQuery}
            rules={providerFormRules}
            isOpen={isOpen}
            onClose={setIsOpen.off}
            fields={getProviderFormFields()}
         />
      </>
   )
}

export default AddProviderForm
