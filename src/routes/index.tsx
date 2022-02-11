import React, { Suspense } from "react"
import { FullPageSpinner } from "../shared/components"

const HomePage = React.lazy(() => import("../pages/home"))
const LoginPage = React.lazy(() => import("../pages/login"))

export const routes = {
   "/": () => (
      <Suspense fallback={<FullPageSpinner />}>
         <HomePage />
      </Suspense>
   ),
   "/login": () => (
      <Suspense fallback={<FullPageSpinner />}>
         <LoginPage />
      </Suspense>
   ),
}
