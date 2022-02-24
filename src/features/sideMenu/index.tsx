import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react"
import { SidebarContent } from "./SidebarContent"
import { MobileNav } from "./MobileNav"

export const SidebarWithHeader: React.FC = ({ children }) => {
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
         <SidebarContent onClose={onClose} display={{ base: "none", lg: "block" }} />
         <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
         >
            <DrawerContent>
               <SidebarContent onClose={onClose} />
            </DrawerContent>
         </Drawer>

         <MobileNav onOpen={onOpen} />

         <Box ml={{ base: 0, lg: 60 }} p={6}>
            {children}
         </Box>
      </Box>
   )
}
