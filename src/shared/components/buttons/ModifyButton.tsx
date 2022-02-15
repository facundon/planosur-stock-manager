import { Button, ButtonProps } from "@chakra-ui/react"
import { Upload } from "react-feather"

type ModifyButtonProps = ButtonProps

const ModifyButton: React.FC<ModifyButtonProps> = ({ onClick, ...rest }) => {
   return (
      <Button
         variant="ghost"
         w="100%"
         onClick={onClick}
         leftIcon={<Upload />}
         iconSpacing={3}
         justifyContent="space-between"
         colorScheme="orange"
         {...rest}
      >
         Actualizar
      </Button>
   )
}

export default ModifyButton
