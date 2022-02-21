import { Box } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { useAuth } from "../../auth"
import { ProductWithProviderAndCategory } from "../../entities/products/domain"
import { useProductsQuery } from "../../entities/products/queries"
import { DataTable } from "../../features/dataTable"
import { SidebarWithHeader } from "../../features/sideMenu"

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   const { data } = useProductsQuery({})

   return (
      <Box minH="100vh" position="relative" overflow="hidden" minW="100vw">
         <SidebarWithHeader>
            {data && (
               <DataTable
                  data={data as ProductWithProviderAndCategory[]}
                  headers={[
                     { value: "Código", accessor: "code" },
                     { value: "Nombre", accessor: "name" },
                     { value: "Cantidad", accessor: "qty" },
                     { value: "Unidad", accessor: "unit" },
                     { value: "Precio [u$S]", accessor: "price" },
                     { value: "Proveedor", accessor: "provider" },
                     { value: "Categoría", accessor: "category" },
                     { value: "Fue pedido", accessor: "didOrder" },
                     { value: "Último pedido", accessor: "orderedAt" },
                     { value: "Stock Capital", accessor: "blankStock" },
                     { value: "Stock Provincia", accessor: "unregisteredStock" },
                     { value: "Stock Mín. Capital", accessor: "blankMinStock" },
                     { value: "Stock Mín. Provincia", accessor: "unregisteredMinStock" },
                     { value: "Stock Max. Capital", accessor: "blankMaxStock" },
                     { value: "Stock Max. Provincia", accessor: "unregisteredMaxStock" },
                     { value: "Actualizado", accessor: "updatedAt" },
                  ]}
               />
            )}
         </SidebarWithHeader>
      </Box>
   )
}

export default HomePage
