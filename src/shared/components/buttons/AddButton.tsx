import { ButtonProps } from "@chakra-ui/react"
import { Plus } from "react-feather"
import { SidebarButton } from "./SidebarButton"

type AddButtonProps = ButtonProps

const AddButton: React.FC<AddButtonProps> = ({ ...rest }) => {
   return (
      <SidebarButton leftIcon={<Plus />} colorScheme="green" {...rest}>
         Alta
      </SidebarButton>
   )
}

export default AddButton
