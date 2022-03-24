import {
   useDisclosure,
   Button,
   AlertDialog,
   AlertDialogOverlay,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogCloseButton,
   AlertDialogBody,
   AlertDialogFooter,
   ButtonProps,
} from "@chakra-ui/react"
import React from "react"

type ConfirmModalProps = {
   actionButton: JSX.Element
   confirmText?: string
   cancelText?: string
   message: string
   title: string
   onConfirm: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
   actionButton,
   confirmText = "Aceptar",
   cancelText = "Cancelar",
   message,
   title,
   onConfirm,
}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cancelRef = React.useRef(null)

   const button = React.cloneElement<ButtonProps>(actionButton, { onClick: onOpen })

   return (
      <>
         {button}
         <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
         >
            <AlertDialogOverlay />

            <AlertDialogContent>
               <AlertDialogHeader>{title}</AlertDialogHeader>
               <AlertDialogCloseButton />
               <AlertDialogBody>{message}</AlertDialogBody>
               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose} variant="outline" colorScheme="gray">
                     {cancelText}
                  </Button>
                  <Button
                     colorScheme="red"
                     ml={3}
                     onClick={() => {
                        onConfirm()
                        onClose()
                     }}
                  >
                     {confirmText}
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}
