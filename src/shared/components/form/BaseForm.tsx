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
   Divider,
   Box,
   ButtonGroup,
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
                     <Box mt={8} color="error">
                        <Divider />
                        <Text mt={3}>{error}</Text>
                     </Box>
                  )}
               </ModalBody>

               <ModalFooter mt={2}>
                  <ButtonGroup spacing={4}>
                     <Button
                        colorScheme="grey"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                     >
                        Cancelar
                     </Button>
                     <Button
                        type="submit"
                        {...submitProps}
                        isLoading={isLoading}
                        iconSpacing={3}
                        spinnerPlacement="end"
                        loadingText="Solicitando"
                     >
                        {submitText}
                     </Button>
                  </ButtonGroup>
               </ModalFooter>
            </form>
         </ModalContent>
      </Modal>
   )
}

export default BaseForm
