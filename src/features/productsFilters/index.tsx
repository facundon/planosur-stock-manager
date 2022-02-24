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
import { useState } from "react"
import { PlusCircle, RotateCcw, Search } from "react-feather"
import { ProductWithProviderAndCategory } from "../../entities/products/domain"
import { TableColumn } from "../dataTable"
import { FilterItem } from "./FilterItem"
import { Filter, filtersConfig } from "./filtersConfig"

type ProductsFiltersProps = {
   filters: TableColumn<ProductWithProviderAndCategory>[]
   onSearch: (filters: string[]) => void
}

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({ onSearch, filters }) => {
   const [selectedFilters, setSelectedFilters] = useState<Filter[]>([])

   return (
      <Box boxShadow="dark-lg" p={6}>
         <VStack>
            {selectedFilters.map(filter => (
               <FilterItem key={filter.accessor} {...filter} />
            ))}
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
                        onChange={val =>
                           setSelectedFilters(
                              filtersConfig.filter(filter => val.includes(filter.accessor))
                           )
                        }
                     >
                        {filters.map(filter => (
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
            <Button leftIcon={<Search />}>Buscar</Button>
            <Button leftIcon={<RotateCcw />} colorScheme="red" variant="outline">
               Reestablecer
            </Button>
         </ButtonGroup>
      </Box>
   )
}
