import {
   Box,
   useColorModeValue,
   Drawer,
   DrawerContent,
   useDisclosure,
   DrawerFooter,
   Switch,
   useColorMode,
} from "@chakra-ui/react"
import { SidebarContent } from "./SidebarContent"
import { MobileNav } from "./MobileNav"

export const SidebarWithHeader: React.FC = ({ children }) => {
   const { toggleColorMode, colorMode } = useColorMode()
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
         <SidebarContent onClose={() => onClose} display={{ base: "none", lg: "block" }} />
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
            <DrawerFooter>
               <Switch
                  id="dark-mode"
                  colorScheme="teal"
                  onChange={toggleColorMode}
                  defaultChecked
                  checked={colorMode === "dark"}
                  alignSelf="flex-start"
                  pb={4}
                  pl={2}
               >
                  Modo Oscuro
               </Switch>
            </DrawerFooter>
         </Drawer>

         <MobileNav onOpen={onOpen} />

         <Box ml={{ base: 0, lg: 60 }} p="4">
            {children}
         </Box>
      </Box>
   )
}
