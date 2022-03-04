import {
   Box,
   useColorModeValue,
   Drawer,
   DrawerContent,
   useDisclosure,
   VStack,
} from "@chakra-ui/react"
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

         <VStack ml={{ base: 0, lg: 60 }} p={{ sm: 6 }} spacing={6}>
            {children}
         </VStack>
      </Box>
   )
}
