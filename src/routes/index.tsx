import { Spinner } from "@chakra-ui/react"
import React, { Suspense } from "react"

const HomePage = React.lazy(() => import("../pages/home"))
const LoginPage = React.lazy(() => import("../pages/login"))

export const routes = {
   "/": () => (
      <Suspense fallback={<Spinner />}>
         <HomePage />
      </Suspense>
   ),
   "/login": () => (
      <Suspense fallback={<Spinner />}>
         <LoginPage />
      </Suspense>
   ),
}
