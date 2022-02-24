import { Box, Heading, Icon, VStack } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { AlertOctagon } from "react-feather"
import { useAuth } from "../../auth"
import { ProductWithProviderAndCategory } from "../../entities/products/domain"
import { useProductsQuery } from "../../entities/products/queries"
import { DataTable, TableColumn } from "../../features/dataTable"
import { ProductsFilters } from "../../features/productsFilters"
import { filtersConfig } from "../../features/productsFilters/filtersConfig"
import { SidebarWithHeader } from "../../features/sideMenu"

const tableColumns: TableColumn<ProductWithProviderAndCategory>[] = filtersConfig.map(filter => ({
   accessor: filter.accessor,
   label: filter.label,
}))

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   const { data, error } = useProductsQuery({})

   return (
      <Box minH="100vh" position="relative" overflow="hidden" minW="100vw">
         <SidebarWithHeader>
            <ProductsFilters filters={tableColumns} onSearch={() => null} />
            {error?.message ? (
               <VStack color="error">
                  <Icon as={AlertOctagon} w="24" h="auto" />
                  <Heading>{error.message}</Heading>
               </VStack>
            ) : (
               <DataTable data={data as ProductWithProviderAndCategory[]} headers={tableColumns} />
            )}
         </SidebarWithHeader>
      </Box>
   )
}

export default HomePage
