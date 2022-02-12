import { ChakraProvider } from "@chakra-ui/react"
import { useRoutes } from "hookrouter"
import { QueryClient, QueryClientProvider } from "react-query"
import { routes } from "./routes"
import NotFoundPage from "./pages/notFound"
import theme from "./theme"

const queryClient = new QueryClient()

function App() {
   const match = useRoutes(routes)

   return (
      <ChakraProvider theme={theme}>
         <QueryClientProvider client={queryClient}>{match || <NotFoundPage />}</QueryClientProvider>
      </ChakraProvider>
   )
}

export default App
