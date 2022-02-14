import { ChakraProvider } from "@chakra-ui/react"
import { useRoutes } from "hookrouter"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { routes } from "./routes"
import NotFoundPage from "./pages/notFound"
import theme from "./theme"

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })

function App() {
   const match = useRoutes(routes)

   return (
      <ChakraProvider theme={theme}>
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {match || <NotFoundPage />}
         </QueryClientProvider>
      </ChakraProvider>
   )
}

export default App
