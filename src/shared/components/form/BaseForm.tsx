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
} & Omit<ModalProps, "children">

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
   size = "xl",
   ...rest
}) => {
   const id = `form_${Math.random()}`
   return (
      <Modal
         {...rest}
         isOpen={isOpen}
         onClose={onClose}
         autoFocus
         closeOnEsc
         closeOnOverlayClick={false}
         scrollBehavior="inside"
         size={size}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton disabled={isLoading} tabIndex={-1} />

            <ModalBody>
               <form onSubmit={onSubmit} id={id}>
                  <VStack spacing={5} align="stretch">
                     {children}
                  </VStack>
                  {error && (
                     <Box mt={8} color="error">
                        <Divider />
                        <Text mt={3}>{error}</Text>
                     </Box>
                  )}
               </form>
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
                     form={id}
                  >
                     {submitText}
                  </Button>
               </ButtonGroup>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default BaseForm
