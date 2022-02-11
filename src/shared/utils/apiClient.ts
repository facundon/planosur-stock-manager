import axios from "axios"
import { navigate } from "hookrouter"

export const JWT_KEY = "PS_JWT"

function createapiClient() {
   const axiosClient = axios.create()

   axiosClient.defaults.baseURL = "http://localhost:3001"

   axiosClient.defaults.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
   }

   axiosClient.interceptors.request.use(
      async config => {
         const key = localStorage.getItem(JWT_KEY)
         if (key) {
            config.headers = {
               Authorization: `Bearer ${key}`,
            }
         }
         return config
      },
      error => error
   )

   axiosClient.interceptors.response.use(
      res => res,
      rejection => {
         if (rejection.message.includes("401")) {
            navigate("/login")
         }
         return rejection
      }
   )

   return axiosClient
}
export const apiClient = createapiClient()
