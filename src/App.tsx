import { ChakraProvider, css } from "@chakra-ui/react"
import { useRoutes } from "hookrouter"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { routes } from "./routes"
import NotFoundPage from "./pages/notFound"
import theme from "./theme"

import { Global } from "@emotion/react"
import "focus-visible/dist/focus-visible"

const queryClient = new QueryClient({
   defaultOptions: { queries: { staleTime: Infinity, notifyOnChangeProps: "tracked" } },
})

//@ts-expect-error emotion
const globalStyles = css`
   .js-focus-visible :focus:not([data-focus-visible-added]) {
      outline: none;
      box-shadow: none;
   }
`

function App() {
   const match = useRoutes(routes)

   return (
      <ChakraProvider theme={theme}>
         <Global styles={globalStyles} />
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {match || <NotFoundPage />}
         </QueryClientProvider>
      </ChakraProvider>
   )
}

export default App
