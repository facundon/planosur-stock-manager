import { Box, Heading, Icon, VStack } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect, useState } from "react"
import { AlertCircle, AlertOctagon } from "react-feather"
import { useAuth } from "../../auth"
import { ProductFilters, ProductWithProviderAndCategory } from "../../entities/products/domain"
import { useProductsQuery } from "../../entities/products/queries"
import { DataTable, TableColumn } from "../../features/dataTable"
import { ProductsFilters } from "../../features/productsFilters"
import { mapFilters } from "../../features/productsFilters/filtersConfig"
import { SidebarWithHeader } from "../../features/sideMenu"

const tableColumns: TableColumn<ProductWithProviderAndCategory>[] = [
   { label: "Código", accessor: "code" },
   { label: "Nombre", accessor: "name" },
   { label: "Contenido", accessor: "qty" },
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
   const [filters, setFilters] = useState<ProductFilters>()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   const {
      data: products,
      error,
      isLoading,
      isFetched,
   } = useProductsQuery({ ...filters, enabled: !!filters })

   return (
      <Box minH="100vh" position="relative" overflow="hidden" minW="100%">
         <SidebarWithHeader>
            <ProductsFilters onSearch={data => setFilters(mapFilters(data))} />
            {filters &&
               (isFetched && !products?.length ? (
                  <VStack color="warning" textAlign="center" mt={10}>
                     <Icon as={AlertCircle} w="24" h="auto" />
                     <Heading>No hay resultados para la búsqueda</Heading>
                  </VStack>
               ) : (
                  <DataTable
                     data={products as ProductWithProviderAndCategory[]}
                     headers={tableColumns}
                     isLoading={isLoading}
                  />
               ))}
            {error?.message && (
               <VStack color="error" textAlign="center" mt={10}>
                  <Icon as={AlertOctagon} w="24" h="auto" />
                  <Heading>{error.message}</Heading>
               </VStack>
            )}
         </SidebarWithHeader>
      </Box>
   )
}

export default HomePage
