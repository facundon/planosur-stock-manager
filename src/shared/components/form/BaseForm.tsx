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

type BaseFormProps = {
   submitProps?: ButtonProps
   submitText: string
   onSubmit: () => void
   title: string
   error?: string
} & ModalProps

const BaseForm: React.FC<BaseFormProps> = ({
   isOpen,
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
            <ModalCloseButton onClick={onClose} />

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
                  <Button mr={4} colorScheme="grey" variant="outline" onClick={onClose}>
                     Cancelar
                  </Button>
                  <Button type="submit" {...submitProps}>
                     {submitText}
                  </Button>
               </ModalFooter>
            </form>
         </ModalContent>
      </Modal>
   )
}

export default BaseForm
