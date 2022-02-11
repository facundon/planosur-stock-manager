import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { AddCategoryForm } from "./features/categories/AddCategoryForm"
import { LoginPage } from "./pages/login"

const queryClient = new QueryClient()

function App() {
   return (
      <ChakraProvider>
         <QueryClientProvider client={queryClient}>
            <LoginPage />
            <AddCategoryForm />
         </QueryClientProvider>
      </ChakraProvider>
   )
}

export default App
