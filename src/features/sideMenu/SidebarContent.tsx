import {
   Box,
   BoxProps,
   useColorModeValue,
   Flex,
   Icon,
   Accordion,
   CloseButton,
} from "@chakra-ui/react"
import { PlanosurLogo } from "../../shared/assets"
import { BaseAccordionItem } from "./BaseAccordionItem"
import { AddCategoryForm, UpdateCategoryForm } from "../../entities/categories/components"
import { AddProductForm, UpdateProductForm } from "../../entities/products/components"
import { AddProviderForm, UpdateProviderForm } from "../../entities/providers/components"
import { DeleteModal } from "../DeleteModal"
import { SalesForm } from "../salesForm"

type SidebarContentProps = {
   onClose: () => void
} & BoxProps

export const SidebarContent: React.FC<SidebarContentProps> = ({ onClose, ...rest }) => {
   return (
      <Box
         transition="1s ease"
         bg={useColorModeValue("white", "gray.800")}
         boxShadow="dark-lg"
         w={{ base: "full", lg: 60 }}
         pos="fixed"
         h="full"
         {...rest}
      >
         <Flex my={8} mx={4} alignItems="center" justifyContent="space-between">
            <Icon
               as={PlanosurLogo}
               color="red.500"
               w="100%"
               maxW={220}
               h="auto"
               mx={{ base: "0.5", lg: 3 }}
               flexShrink={1}
               flexBasis="fit-content"
            />
            <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} />
         </Flex>
         <Accordion allowToggle w="100%" flexGrow={1}>
            <SalesForm />
            <DeleteModal />
            <BaseAccordionItem title="Productos">
               <AddProductForm />
               <UpdateProductForm />
            </BaseAccordionItem>
            <BaseAccordionItem title="Proveedores">
               <AddProviderForm />
               <UpdateProviderForm />
            </BaseAccordionItem>
            <BaseAccordionItem title="Categorias">
               <AddCategoryForm />
               <UpdateCategoryForm />
            </BaseAccordionItem>
         </Accordion>
      </Box>
   )
}
