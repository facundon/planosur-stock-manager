import { Button, ButtonProps } from "@chakra-ui/react"

type SidebarButtonProps = ButtonProps

export const SidebarButton: React.FC<SidebarButtonProps> = ({ children, ...rest }) => {
   return (
      <Button variant="ghost" w="100%" iconSpacing={3} justifyContent="space-between" {...rest}>
         {children}
      </Button>
   )
}
