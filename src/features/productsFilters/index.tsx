import {
   Box,
   Button,
   Divider,
   MenuButton,
   MenuItemOption,
   Menu,
   MenuList,
   MenuOptionGroup,
   VStack,
   Portal,
   IconButton,
} from "@chakra-ui/react"
import { PlusCircle, RotateCcw, Search } from "react-feather"
import { useFieldArray, useForm } from "react-hook-form"
import { FilterItem } from "./FilterItem"
import { FilterAccessor, filtersConfig, FiltersDto } from "./filtersConfig"

type ProductsFiltersProps = {
   onSearch: (filters: FiltersDto) => void
}

const defaultAccessor: FilterAccessor = "blankStock"
const defaultValues: FiltersDto = {
   filters: [{ accessor: defaultAccessor, condition: "lte", value: "" }],
}

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({ onSearch }) => {
   const { register, control, handleSubmit } = useForm<FiltersDto>({ defaultValues })

   const { fields, replace, remove } = useFieldArray({
      control,
      name: "filters",
   })

   return (
      <Box boxShadow="dark-lg" p={{ base: 3, sm: 6 }}>
         <form onSubmit={handleSubmit(onSearch)}>
            <VStack gap={3}>
               {fields.map((field, index) => {
                  const currentFilter = filtersConfig.find(
                     filter => filter.accessor === field.accessor
                  )
                  if (!currentFilter) return null
                  return (
                     <>
                        <FilterItem
                           {...currentFilter}
                           key={field.id}
                           control={control}
                           register={register}
                           index={index}
                           onRemove={() => remove(index)}
                        />
                        <Divider display={fields.length === index + 1 ? "none" : undefined} />
                     </>
                  )
               })}
            </VStack>
            <Divider my={6} />
            <Box display="flex" flexWrap="wrap" w="100%" gap={3}>
               <Menu closeOnSelect={false}>
                  <MenuButton flexGrow={1} as={Button} colorScheme="teal" leftIcon={<PlusCircle />}>
                     Añadir Filtro
                  </MenuButton>
                  <Portal>
                     <MenuList minW="fit-content" maxH="50vh" overflowY="auto" pr={6}>
                        <MenuOptionGroup
                           title="Filtros"
                           type="checkbox"
                           onChange={accessors => {
                              const newFilters = filtersConfig.filter(filter =>
                                 accessors.includes(filter.accessor)
                              )
                              replace(newFilters)
                           }}
                           value={fields.map(field => field.accessor)}
                           defaultValue={[defaultAccessor]}
                        >
                           {filtersConfig.map(filter => (
                              <MenuItemOption
                                 _checked={{ svg: { color: "success" } }}
                                 key={filter.accessor}
                                 value={filter.accessor}
                                 isDisabled={
                                    filter.accessor === fields[0]?.accessor && fields.length === 1
                                 }
                              >
                                 {filter.label}
                              </MenuItemOption>
                           ))}
                        </MenuOptionGroup>
                     </MenuList>
                  </Portal>
               </Menu>
               <IconButton
                  aria-label="reestablecer"
                  title="Reestablecer"
                  flexGrow={0}
                  icon={<RotateCcw />}
                  colorScheme="red"
                  variant="outline"
                  type="reset"
                  onClick={() =>
                     remove(
                        fields
                           .filter(field => field.accessor !== defaultAccessor)
                           .map(field => +field.id)
                     )
                  }
               />
               <Button w="100%" leftIcon={<Search />} type="submit">
                  Buscar
               </Button>
            </Box>
         </form>
      </Box>
   )
}
