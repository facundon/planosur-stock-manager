import { AxiosError } from "axios"
import {
   useMutation,
   UseMutationResult,
   useQuery,
   useQueryClient,
   UseQueryResult,
} from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { ProductFormDto, ProductWithProviderAndCategory, ProductFilters } from "./domain"
import { PRODUCTS_KEYS } from "./queryKeys"

export function useProductQuery(
   code: string
): UseQueryResult<ProductWithProviderAndCategory, AxiosError> {
   return useQuery(PRODUCTS_KEYS.byCode(code), async () => {
      const response = await apiClient.get<ProductWithProviderAndCategory>(`/products/${code}`)
      return response.data
   })
}

export function useProductsQuery({
   enabled = true,
   ...filters
}: ProductFilters & { enabled?: boolean }): UseQueryResult<
   ProductWithProviderAndCategory[],
   AxiosError
> {
   const filterList = Object.values(filters)

   const query = Object.entries(filters)
      .map(filter => `${filter[0]}=${filter[1]}`)
      .join("&")

   return useQuery(
      PRODUCTS_KEYS.filtered(filterList),
      async () => {
         const response = await apiClient.get<ProductWithProviderAndCategory[]>(
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
         },
      }
   )
}

export function useDeleteProductQuery(): UseMutationResult<
   ProductWithProviderAndCategory,
   AxiosError,
   string
> {
   return useMutation(async code => {
      const response = await apiClient.delete<ProductWithProviderAndCategory>(`/products/${code}`)
      return response.data
   })
}

export function useAddProductQuery(): UseMutationResult<
   ProductWithProviderAndCategory,
   AxiosError,
   ProductFormDto
> {
   return useMutation(async form => {
      const response = await apiClient.post<ProductWithProviderAndCategory>("/products", form)
      return response.data
   })
}
