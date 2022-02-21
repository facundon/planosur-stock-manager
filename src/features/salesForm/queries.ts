import { AxiosError } from "axios"
import { UseMutationResult, useQueryClient, useMutation } from "react-query"
import { ProductWithProviderAndCategory } from "../../entities/products/domain"
import { PRODUCTS_KEYS } from "../../entities/products/queryKeys"
import { apiClient } from "../../shared/utils/apiClient"
import { SaleDto } from "./domain"

export function useAddSaleQuery(): UseMutationResult<
   ProductWithProviderAndCategory[],
   AxiosError,
   SaleDto
> {
   const queryClient = useQueryClient()

   return useMutation(
      async form => {
         const response = await apiClient.post<ProductWithProviderAndCategory[]>(
            "/products/sale",
            form
         )
         return response.data
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
         },
      }
   )
}
