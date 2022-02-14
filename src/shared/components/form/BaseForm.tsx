import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   Button,
   ModalProps,
   ButtonProps,
   Text,
   VStack,
} from "@chakra-ui/react"
import { FormEvent } from "react"

type BaseFormProps = {
   submitProps?: ButtonProps
   submitText: string
   onSubmit: (e: FormEvent) => void
   title: string
   error?: string
   isLoading?: boolean
} & ModalProps

const BaseForm: React.FC<BaseFormProps> = ({
   isOpen,
   isLoading,
   error,
   onClose,
   title,
   submitText,
   submitProps,
   onSubmit,
   children,
   ...rest
}) => {
   return (
      <Modal
         {...rest}
         isOpen={isOpen}
         onClose={onClose}
         autoFocus
         closeOnEsc
         closeOnOverlayClick={false}
         onEsc={onClose}
         size={"xl"}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton onClick={onClose} disabled={isLoading} />

            <form onSubmit={onSubmit}>
               <ModalBody>
                  <VStack spacing={5} align="stretch">
                     {children}
                  </VStack>
                  {error && (
                     <Text mt={5} color="error">
                        {error}
                     </Text>
                  )}
               </ModalBody>

               <ModalFooter mt={4}>
                  <Button
                     mr={4}
                     colorScheme="grey"
                     variant="outline"
                     onClick={onClose}
                     disabled={isLoading}
                  >
                     Cancelar
                  </Button>
                  <Button type="submit" {...submitProps} isLoading={isLoading}>
                     {submitText}
                  </Button>
               </ModalFooter>
            </form>
         </ModalContent>
      </Modal>
   )
}

export default BaseForm
