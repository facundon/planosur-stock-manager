import { ButtonProps } from "@chakra-ui/react"
import { Edit2 } from "react-feather"
import { SidebarButton } from "./SidebarButton"

type ModifyButtonProps = ButtonProps

export const ModifyButton: React.FC<ModifyButtonProps> = ({ ...rest }) => {
   return (
      <SidebarButton leftIcon={<Edit2 />} colorScheme="orange" {...rest}>
         Editar
      </SidebarButton>
   )
}
