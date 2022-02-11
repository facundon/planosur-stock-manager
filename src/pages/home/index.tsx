import { Box, Button, useBoolean } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { useAuth } from "../../auth"
import { AddCategoryForm } from "../../features/categories/AddCategoryForm"

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   const [addCategoryOpen, setAddCategoryOpen] = useBoolean(false)

   return (
      <Box bg="gray.800" minH="100vh">
         <Button onClick={() => setAddCategoryOpen.on()}>Agregar Categoria</Button>
         <AddCategoryForm isOpen={addCategoryOpen} onClose={() => setAddCategoryOpen.off()} />
      </Box>
   )
}

export default HomePage
