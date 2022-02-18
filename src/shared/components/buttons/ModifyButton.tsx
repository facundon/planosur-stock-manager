import { Button, ButtonProps } from "@chakra-ui/react"
import { Edit2 } from "react-feather"

type ModifyButtonProps = ButtonProps

const ModifyButton: React.FC<ModifyButtonProps> = ({ onClick, ...rest }) => {
   return (
      <Button
         variant="ghost"
         w="100%"
         onClick={onClick}
         leftIcon={<Edit2 />}
         iconSpacing={3}
         justifyContent="space-between"
         colorScheme="orange"
         {...rest}
      >
         Editar
      </Button>
   )
}

export default ModifyButton
