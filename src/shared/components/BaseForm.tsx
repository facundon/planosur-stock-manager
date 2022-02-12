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
} from "@chakra-ui/react"

type BaseFormProps = {
   submitProps: ButtonProps
   submitText: string
   onSubmit: () => void
   onCancel: () => void
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
   onCancel,
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
         onEsc={onCancel}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton onClick={onCancel} />

            <form onSubmit={onSubmit}>
               <ModalBody>
                  {children}
                  {error && (
                     <Text mt={5} color="error">
                        {error}
                     </Text>
                  )}
               </ModalBody>

               <ModalFooter>
                  <Button mr={4} colorScheme="grey" variant="outline" onClick={onCancel}>
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
