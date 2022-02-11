import { ChakraProvider } from "@chakra-ui/react"
import { useRoutes } from "hookrouter"
import { QueryClient, QueryClientProvider } from "react-query"
import NotFoundPage from "./pages/notFound"
import { routes } from "./routes"

const queryClient = new QueryClient()

function App() {
   const match = useRoutes(routes)

   return (
      <ChakraProvider>
         <QueryClientProvider client={queryClient}>{match || <NotFoundPage />}</QueryClientProvider>
      </ChakraProvider>
   )
}

export default App
