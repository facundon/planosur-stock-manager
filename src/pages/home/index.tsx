import { Box, Flex } from "@chakra-ui/react"
import { navigate } from "hookrouter"
import { useEffect } from "react"
import { useAuth } from "../../auth"
import SideMenu from "../../features/sideMenu"

const HomePage: React.FC = () => {
   const { isAuth } = useAuth()

   useEffect(() => {
      if (isAuth !== undefined && !isAuth) navigate("/login")
   }, [isAuth])

   return (
      <Box minH="100vh" position="relative">
         <Flex h="100vh" gap={4}>
            <SideMenu />
            <Box>tabla</Box>
         </Flex>
      </Box>
   )
}

export default HomePage
