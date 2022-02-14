import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, useBoolean } from "@chakra-ui/react"
import { useCategoriesQuery } from "../entities/categories/queries"
import { useProductsQuery } from "../entities/products/queries"
import { useProvidersQuery } from "../entities/providers/queries"
import { BaseForm } from "../shared/components"
import SelectWithQuery from "../shared/components/SelectWithQuery"

const DeleteModal: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean()

   return (
      <>
         <Button onClick={setIsOpen.on}>Bajas</Button>
         <BaseForm
            submitText="Eliminar"
            title="Bajas"
            onSubmit={() => null}
            isOpen={isOpen}
            onClose={setIsOpen.off}
         >
            <Tabs isFitted isLazy variant="solid-rounded" colorScheme="yellow">
               <TabList mb="1em">
                  <Tab>Productos</Tab>
                  <Tab>Proveedores</Tab>
                  <Tab>Categorias</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>
                     <SelectWithQuery
                        query={useProductsQuery}
                        mapOptionsTo={{ label: "name", value: "code" }}
                     />
                  </TabPanel>
                  <TabPanel>
                     <SelectWithQuery
                        query={useProvidersQuery}
                        mapOptionsTo={{ label: "name", value: "id" }}
                     />
                  </TabPanel>
                  <TabPanel>
                     <SelectWithQuery
                        query={useCategoriesQuery}
                        mapOptionsTo={{ label: "name", value: "id" }}
                     />
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </BaseForm>
      </>
   )
}

export default DeleteModal
