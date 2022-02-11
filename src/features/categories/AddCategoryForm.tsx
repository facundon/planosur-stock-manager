import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AddCategoryFormDto } from "../../entities/categories/domain"
import { useAddCategoryQuery } from "../../entities/categories/queries"

type AddCategoryFormProps = { isOpen: boolean; onClose: () => void }

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ isOpen, onClose }) => {
   const { mutate: sendToServer, isLoading, error: serverError, isSuccess } = useAddCategoryQuery()

   const defaultValues: AddCategoryFormDto = { name: "" }

   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm({ defaultValues })

   const onSubmit: SubmitHandler<AddCategoryFormDto> = data => {
      sendToServer(data)
   }
   /*
   useEffect(() => {
      isSuccess && onClose()
   }, [isSuccess, onClose]) */

   useEffect(() => {
      serverError && setError("name", { message: serverError.message })
   }, [serverError, setError])
   console.log(serverError)
   return (
      <Modal isOpen={isOpen} onClose={onClose} autoFocus closeOnEsc>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Agregar Categoria</ModalHeader>
            <ModalCloseButton />

            <form onSubmit={handleSubmit(onSubmit)}>
               <ModalBody>
                  <FormControl isInvalid={!!errors.name?.message}>
                     <FormLabel>Nombre</FormLabel>
                     <Input
                        {...register("name", {
                           maxLength: { value: 25, message: "Máximo 25 caracteres" },
                           required: { value: true, message: "Este campo es requerido" },
                        })}
                     />
                     <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button type="submit" isLoading={isLoading}>
                     Agregar
                  </Button>
               </ModalFooter>
            </form>
         </ModalContent>
      </Modal>
   )
}
