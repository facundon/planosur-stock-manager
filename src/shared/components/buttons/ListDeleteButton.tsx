import { ButtonProps, IconButton } from "@chakra-ui/react"
import { MinusCircle } from "react-feather"

type ListDeleteButtonProps = ButtonProps

export const ListDeleteButton: React.FC<ListDeleteButtonProps> = props => {
   return (
      <IconButton
         aria-label="Borrar"
         title="Borrar"
         variant="ghost"
         isRound
         size="sm"
         icon={<MinusCircle size="16" />}
         colorScheme="teal"
         {...props}
      />
   )
}
