import { AxiosError } from "axios"
import {
   useMutation,
   UseMutationResult,
   useQuery,
   useQueryClient,
   UseQueryResult,
} from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import {
   ProductFormDto,
   ProductWithProviderAndCategory,
   ProductFilters,
   ProductSimple,
} from "./domain"
import { PRODUCTS_KEYS } from "./queryKeys"

export function useProductQuery({
   code,
   enabled,
}: {
   code: string | undefined
   enabled?: boolean
}): UseQueryResult<ProductWithProviderAndCategory, AxiosError> {
   return useQuery(
      PRODUCTS_KEYS.byCode(code),
      async () => {
         const response = await apiClient.get<ProductWithProviderAndCategory>(`/products/${code}`)
         return response.data
      },
      { enabled }
   )
}

export function useProductsQuery({
   enabled = true,
   ...filters
}: ProductFilters & { enabled?: boolean }): UseQueryResult<
   ProductWithProviderAndCategory[] | ProductSimple[],
   AxiosError
> {
   const queryKey = Object.entries(filters).map(filter => `${filter[0]}=${filter[1]}`)

   const query = queryKey.join("&")

   return useQuery(
      PRODUCTS_KEYS.filtered(queryKey),
      async () => {
         const response = await apiClient.get<ProductWithProviderAndCategory[] | ProductSimple[]>(
            `/products${query ? `?${query}` : ""}`
         )
         return response.data
      },
      { enabled }
   )
}

export function useUpdateProductQuery(
   code: string
): UseMutationResult<ProductWithProviderAndCategory, AxiosError, ProductFormDto> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.patch<ProductWithProviderAndCategory>(
            `/products/${code}`,
            form
         )
         return response.data
      },
      {
         onSuccess: data => {
            queryClient.setQueryData(PRODUCTS_KEYS.byCode(code), data)
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
         },
      }
   )
}

export function useDeleteProductQuery(): UseMutationResult<
   ProductWithProviderAndCategory,
   AxiosError,
   string
> {
   const queryClient = useQueryClient()

   return useMutation(
      async code => {
         const response = await apiClient.delete<ProductWithProviderAndCategory>(
            `/products/${code}`
         )
         return response.data
      },
      {
         onSuccess: (_, code) => {
            queryClient.setQueryData(PRODUCTS_KEYS.byCode(code), () => undefined)
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
         },
      }
   )
}

export function useAddProductQuery(): UseMutationResult<
   ProductWithProviderAndCategory,
   AxiosError,
   ProductFormDto
> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.post<ProductWithProviderAndCategory>("/products", form)
         return response.data
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
         },
      }
   )
}
