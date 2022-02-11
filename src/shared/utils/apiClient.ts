import axios from "axios"

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
      error => {
         Promise.reject(error)
      }
   )

   return axiosClient
}
export const apiClient = createapiClient()
