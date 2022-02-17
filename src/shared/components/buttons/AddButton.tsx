import { Button, ButtonProps } from "@chakra-ui/react"
import { Plus } from "react-feather"

type AddButtonProps = ButtonProps

const AddButton: React.FC<AddButtonProps> = ({ onClick, ...rest }) => {
   return (
      <Button
         variant="ghost"
         w="100%"
         onClick={onClick}
         leftIcon={<Plus />}
         iconSpacing={3}
         justifyContent="space-between"
         {...rest}
         colorScheme="green"
      >
         Agregar
      </Button>
   )
}

export default AddButton