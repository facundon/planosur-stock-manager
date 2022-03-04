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
import React, { useMemo } from "react"
import { PlusCircle, RotateCcw, Search } from "react-feather"
import { useFieldArray, useForm } from "react-hook-form"
import { FilterItem } from "./FilterItem"
import { Filter, FilterAccessor, filtersConfig, FiltersDto } from "./filtersConfig"

type ProductsFiltersProps = {
   onSearch: (filters: FiltersDto) => void
}

const defaultAccessor: FilterAccessor = "name"

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({ onSearch }) => {
   const defaultValues: FiltersDto = useMemo(() => {
      const item = filtersConfig.find(filter => filter.accessor === defaultAccessor) as Filter
      return {
         filters: [{ ...item }],
      }
   }, [])

   const { register, control, handleSubmit } = useForm<FiltersDto>({ defaultValues })

   const { fields, remove, append, replace } = useFieldArray({
      control,
      name: "filters",
   })

   function handleChangeFilters(accessors: string[]) {
      const newFilters = accessors
         .filter(accessor => fields.findIndex(field => field.accessor === accessor) < 0)
         .map(accessor => filtersConfig.find(filter => filter.accessor === accessor)!)

      if (newFilters.length) append(newFilters)
      else {
         const removeIndex = fields.findIndex(field => !accessors.includes(field.accessor))
         remove(removeIndex)
      }
   }

   return (
      <Box boxShadow="dark-lg" p={{ base: 3, sm: 6 }}>
         <form onSubmit={handleSubmit(data => onSearch(data as FiltersDto))}>
            <VStack gap={3}>
               {fields.map((field, index) => {
                  const currentFilter = filtersConfig.find(
                     filter => filter.accessor === field.accessor
                  )
                  if (!currentFilter) return null
                  return (
                     <React.Fragment key={field.id}>
                        <FilterItem
                           {...currentFilter}
                           control={control}
                           register={register}
                           index={index}
                           onRemove={() => remove(index)}
                           removeDisabled={fields.length === 1}
                        />
                        <Divider display={fields.length === index + 1 ? "none" : undefined} />
                     </React.Fragment>
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
                           onChange={accessors => handleChangeFilters(accessors as string[])}
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
                  onClick={() => replace(defaultValues.filters)}
               />
               <Button w="100%" leftIcon={<Search />} type="submit">
                  Buscar
               </Button>
            </Box>
         </form>
      </Box>
   )
}
