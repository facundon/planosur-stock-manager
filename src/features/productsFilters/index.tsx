import {
   Box,
   Button,
   ButtonGroup,
   Divider,
   MenuButton,
   MenuItemOption,
   Menu,
   MenuList,
   MenuOptionGroup,
   VStack,
   Portal,
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
      <Box boxShadow="dark-lg" p={6}>
         <form onSubmit={handleSubmit(onSearch)}>
            <VStack>
               {fields.map((field, index) => {
                  const currentFilter = filtersConfig.find(
                     filter => filter.accessor === field.accessor
                  )
                  if (!currentFilter) return null
                  return (
                     <FilterItem
                        {...currentFilter}
                        key={field.id}
                        control={control}
                        register={register}
                        index={index}
                     />
                  )
               })}
            </VStack>
            <Divider my={6} />
            <ButtonGroup>
               <Menu closeOnSelect={false}>
                  <MenuButton as={Button} colorScheme="teal" leftIcon={<PlusCircle />}>
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
                           defaultValue={[defaultAccessor]}
                        >
                           {filtersConfig.map(filter => (
                              <MenuItemOption
                                 _checked={{ svg: { color: "success" } }}
                                 key={filter.accessor}
                                 value={filter.accessor}
                              >
                                 {filter.label}
                              </MenuItemOption>
                           ))}
                        </MenuOptionGroup>
                     </MenuList>
                  </Portal>
               </Menu>
               <Button leftIcon={<Search />} type="submit">
                  Buscar
               </Button>
               <Button
                  leftIcon={<RotateCcw />}
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
               >
                  Reestablecer
               </Button>
            </ButtonGroup>
         </form>
      </Box>
   )
}
