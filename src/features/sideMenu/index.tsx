import { Accordion, Heading, Switch, useColorMode, VStack } from "@chakra-ui/react"
import { AddCategoryForm } from "../../entities/categories/components/AddCategoryForm"
import UpdateCategoryForm from "../../entities/categories/components/UpdateCategoryForm"
import AddProductForm from "../../entities/products/components/AddProductForm"
import UpdateProductForm from "../../entities/products/components/UpdateProductForm"
import AddProviderForm from "../../entities/providers/components/AddProviderForm"
import UpdateProviderForm from "../../entities/providers/components/UpdateProviderForm"
import DeleteModal from "../DeleteModal"
import BaseAccordionItem from "./BaseAccordionItem"

const SideMenu: React.FC = () => {
   const { toggleColorMode, colorMode } = useColorMode()

   return (
      <VStack boxShadow="dark-lg" h="100%" px={3} minW="2xs">
         <Heading color="red.500" my={5}>
            Planosur
         </Heading>
         <Accordion allowToggle w="100%" flexGrow={1}>
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
            <DeleteModal />
         </Accordion>
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
      </VStack>
   )
}

export default SideMenu
