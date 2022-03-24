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
import { FormEvent, useRef } from "react"
import { ConfirmModal } from "../ConfirmModal"

type BaseFormProps = {
   confirmationMessage?: string
   submitProps?: ButtonProps
   submitText: string
   onSubmit: (e: FormEvent) => void
   title: string
   error?: string
   isLoading?: boolean
   withConfirmation?: boolean
} & Omit<ModalProps, "children">

export const BaseForm: React.FC<BaseFormProps> = ({
   confirmationMessage,
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
   withConfirmation,
   ...rest
}) => {
   const id = `form_${Math.random()}`
   const formRef = useRef<HTMLFormElement>(null)

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
               <form onSubmit={onSubmit} id={id} ref={formRef}>
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
                  {withConfirmation ? (
                     <ConfirmModal
                        message={confirmationMessage || "Esta seguro?"}
                        title={title}
                        onConfirm={() =>
                           formRef.current?.dispatchEvent(
                              new Event("submit", { cancelable: true, bubbles: true })
                           )
                        }
                        actionButton={
                           <Button
                              {...submitProps}
                              isLoading={isLoading}
                              iconSpacing={3}
                              spinnerPlacement="end"
                              loadingText="Solicitando"
                           >
                              {submitText}
                           </Button>
                        }
                     />
                  ) : (
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
                  )}
               </ButtonGroup>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}
