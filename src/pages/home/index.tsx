import { Box, Grid, GridItem, Switch, useColorMode } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { useAuth } from "../../auth"
import { AddCategoryForm } from "../../entities/categories/components/AddCategoryForm"
import AddProductForm from "../../entities/products/components/AddProductForm"

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()
   const { toggleColorMode, colorMode } = useColorMode()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   return (
      <Box minH="100vh" position="relative">
         <Switch
            position="absolute"
            right={2}
            top={2}
            id="dark-mode"
            colorScheme="teal"
            onChange={toggleColorMode}
            defaultChecked
            checked={colorMode === "dark"}
         >
            Modo Oscuro
         </Switch>
         <Grid h="100vh" templateRows="repeat(1, 1fr)" templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem colSpan={1}>
               <AddCategoryForm />
               <AddProductForm />
            </GridItem>
            <GridItem colSpan={5}>tabla</GridItem>
         </Grid>
      </Box>
   )
}

export default HomePage
