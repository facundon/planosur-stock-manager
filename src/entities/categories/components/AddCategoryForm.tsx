import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   useBoolean,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { AddCategoryFormDto } from "../domain"
import { useAddCategoryQuery } from "../queries"
import { BaseForm } from "../../../shared/components"
import { addCategoryRules } from "./formRules"

export const AddCategoryForm: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean(false)
   const firstInput = useRef<HTMLInputElement | null>(null)

   const {
      mutate: sendToServer,
      isLoading,
      error: serverError,
      reset: resetQuery,
   } = useAddCategoryQuery(setIsOpen.off)

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset: resetForm,
   } = useForm<AddCategoryFormDto>({ defaultValues: { name: "" } })

   const { ref, ...firstInputRegistration } = register("name", addCategoryRules.name)

   const handleCancel = () => {
      setIsOpen.off()
      resetForm()
      resetQuery()
   }

   return (
      <>
         <Button onClick={setIsOpen.on}>Agregar Categoria</Button>
         <BaseForm
            isOpen={isOpen}
            onClose={setIsOpen.off}
            onSubmit={handleSubmit(data => sendToServer(data))}
            onCancel={handleCancel}
            error={serverError?.message}
            submitProps={{ isLoading }}
            submitText="Agregar"
            title="Agregar Categoria"
            initialFocusRef={firstInput}
         >
            <FormControl isInvalid={!!errors.name?.message} isRequired isDisabled={isLoading}>
               <FormLabel>Nombre</FormLabel>
               <Input
                  {...firstInputRegistration}
                  name="name"
                  ref={e => {
                     ref(e)
                     firstInput.current = e
                  }}
               />
               <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
         </BaseForm>
      </>
   )
}
