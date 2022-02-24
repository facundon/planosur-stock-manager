import { Box, Heading, Icon, VStack } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { AlertOctagon } from "react-feather"
import { useAuth } from "../../auth"
import { ProductWithProviderAndCategory } from "../../entities/products/domain"
import { useProductsQuery } from "../../entities/products/queries"
import { DataTable, TableColumn } from "../../features/dataTable"
import { ProductsFilters } from "../../features/productsFilters"
import { SidebarWithHeader } from "../../features/sideMenu"

const tableColumns: TableColumn<ProductWithProviderAndCategory>[] = [
   { label: "Código", accessor: "code" },
   { label: "Nombre", accessor: "name" },
   { label: "Cantidad", accessor: "qty" },
   { label: "Unidad", accessor: "unit" },
   { label: "Precio [u$S]", accessor: "price" },
   { label: "Proveedor", accessor: "provider" },
   { label: "Categoría", accessor: "category" },
   { label: "Fue pedido", accessor: "didOrder" },
   { label: "Último pedido", accessor: "orderedAt" },
   { label: "Stock Capital", accessor: "blankStock" },
   { label: "Stock Provincia", accessor: "unregisteredStock" },
   { label: "Stock Mín. Capital", accessor: "blankMinStock" },
   { label: "Stock Mín. Provincia", accessor: "unregisteredMinStock" },
   { label: "Stock Max. Capital", accessor: "blankMaxStock" },
   { label: "Stock Max. Provincia", accessor: "unregisteredMaxStock" },
   { label: "Actualizado", accessor: "updatedAt" },
]

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   const { data, error } = useProductsQuery({})

   return (
      <Box minH="100vh" position="relative" overflow="hidden" minW="100vw">
         <SidebarWithHeader>
            <ProductsFilters onSearch={filters => console.log(filters)} />
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
