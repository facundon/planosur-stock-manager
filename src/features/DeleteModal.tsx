import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, useBoolean } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { Delete } from "react-feather"
import { useQueryClient } from "react-query"
import { useCategoriesQuery, useDeleteCategoryQuery } from "../entities/categories/queries"
import { CATEGORIES_KEYS } from "../entities/categories/queryKeys"
import { useDeleteProductQuery, useProductsQuery } from "../entities/products/queries"
import { useDeleteProviderQuery, useProvidersQuery } from "../entities/providers/queries"
import { PROVIDERS_KEYS } from "../entities/providers/queryKeys"
import { BaseForm, DropdownQuery } from "../shared/components"
import AsyncSelect from "../shared/components/form/AsyncSelect"

export const DeleteModal: React.FC = () => {
   const [isOpen, setIsOpen] = useBoolean()
   const [recordToDelete, setRecordToDelete] = useState("")
   const [tabIndex, setTabIndex] = useState(0)

   const queryClient = useQueryClient()

   const { data: providers } = useProvidersQuery()
   const { data: categories } = useCategoriesQuery()

   const {
      mutate: deleteCategory,
      isLoading: isLoadingCategory,
      error: categoryError,
      reset: resetCategory,
   } = useDeleteCategoryQuery()
   const {
      mutate: deleteProduct,
      isLoading: isLoadingProduct,
      error: productError,
      reset: resetProduct,
   } = useDeleteProductQuery()
   const {
      mutate: deleteProvider,
      isLoading: isLoadingProvider,
      error: providerError,
      reset: resetProvider,
   } = useDeleteProviderQuery()

   function handleSubmit(e: FormEvent) {
      e.preventDefault()
      switch (tabIndex) {
         case 0:
            deleteProduct(recordToDelete, { onSuccess: setIsOpen.off })
            break

         case 1:
            deleteProvider(+recordToDelete, {
               onSuccess: () => {
                  queryClient.invalidateQueries(PROVIDERS_KEYS.base)
                  setIsOpen.off()
               },
            })
            break

         case 2:
            deleteCategory(+recordToDelete, {
               onSuccess: () => {
                  queryClient.invalidateQueries(CATEGORIES_KEYS.base)
                  setIsOpen.off()
               },
            })
            break

         default:
            throw Error(`Tab with id ${tabIndex} does not exist`)
      }
   }

   return (
      <>
         <Button
            variant="ghost"
            w="100%"
            onClick={setIsOpen.on}
            leftIcon={<Delete />}
            iconSpacing={3}
            justifyContent="space-between"
            colorScheme="red"
         >
            Bajas
         </Button>
         <BaseForm
            submitText="Eliminar"
            title="Bajas"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={setIsOpen.off}
            isLoading={isLoadingCategory || isLoadingProduct || isLoadingProvider}
            error={categoryError?.message || productError?.message || providerError?.message}
            submitProps={{ disabled: recordToDelete === "" }}
         >
            <Tabs
               isFitted
               variant="solid-rounded"
               colorScheme="yellow"
               onChange={i => {
                  resetProvider()
                  resetProduct()
                  resetCategory()
                  setTabIndex(i)
               }}
            >
               <TabList mb="1em">
                  <Tab>Productos</Tab>
                  <Tab>Proveedores</Tab>
                  <Tab>Categorias</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>
                     <DropdownQuery
                        query={useProductsQuery}
                        mapOptionsTo={{ label: "name", value: "code" }}
                        onChange={value => setRecordToDelete(value || "")}
                     />
                  </TabPanel>
                  <TabPanel>
                     <AsyncSelect onChange={e => setRecordToDelete(e.target.value)} withEmptyOption>
                        {providers?.map(provider => (
                           <option key={provider.id} value={provider.id}>
                              {provider.name}
                           </option>
                        ))}
                     </AsyncSelect>
                  </TabPanel>
                  <TabPanel>
                     <AsyncSelect onChange={e => setRecordToDelete(e.target.value)} withEmptyOption>
                        {categories?.map(category => (
                           <option key={category.id} value={category.id}>
                              {category.name}
                           </option>
                        ))}
                     </AsyncSelect>
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </BaseForm>
      </>
   )
}
