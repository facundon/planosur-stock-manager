import { ButtonProps } from "@chakra-ui/react"
import { Plus } from "react-feather"
import { SidebarButton } from "./SidebarButton"

type AddButtonProps = { title?: string } & ButtonProps

export const AddButton: React.FC<AddButtonProps> = ({ title, ...rest }) => {
   return (
      <SidebarButton leftIcon={<Plus />} colorScheme="green" {...rest}>
         {title || "Alta"}
      </SidebarButton>
   )
}
