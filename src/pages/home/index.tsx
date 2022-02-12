import { Box, Button, useColorMode } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { useAuth } from "../../auth"
import { AddCategoryForm } from "../../features/categories/AddCategoryForm"

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()
   const { toggleColorMode } = useColorMode()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   return (
      <Box minH="100vh">
         <AddCategoryForm />
         <Button onClick={toggleColorMode}>Modo oscuro</Button>
      </Box>
   )
}

export default HomePage
