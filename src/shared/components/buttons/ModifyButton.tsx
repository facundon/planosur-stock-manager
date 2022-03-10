import { ButtonProps } from "@chakra-ui/react"
import { Edit2 } from "react-feather"
import { SidebarButton } from "./SidebarButton"

type ModifyButtonProps = { title?: string } & ButtonProps

export const ModifyButton: React.FC<ModifyButtonProps> = ({ title, ...rest }) => {
   return (
      <SidebarButton leftIcon={<Edit2 />} colorScheme="orange" {...rest}>
         {title || "Editar"}
      </SidebarButton>
   )
}
