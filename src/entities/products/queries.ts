import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import {
   AddProductFormDto,
   Product,
   ProductWithProviderAndCategory,
   UpdateProductFormDto,
} from "./domain"
import { PRODUCTS_KEYS } from "./queryKeys"

export function useProductQuery(code: string): UseQueryResult<ProductWithProviderAndCategory> {
   return useQuery(PRODUCTS_KEYS.byCode(code), async () => {
      const response = await apiClient.get<ProductWithProviderAndCategory>(`/products/${code}`)
      return response.data
   })
}

export function useCategoriesQuery(): UseQueryResult<ProductWithProviderAndCategory[]> {
   return useQuery(PRODUCTS_KEYS.base, async () => {
      const response = await apiClient.get<ProductWithProviderAndCategory[]>("/products")
      return response.data
   })
}

export function useUpdateProductQuery(): UseMutationResult<
   Product,
   Error,
   { code: string; form: UpdateProductFormDto }
> {
   return useMutation(async ({ code, form }) => {
      const response = await apiClient.patch<Product>(`/products/${code}`, form)
      return response.data
   })
}

export function useDeleteProductQuery(): UseMutationResult<Product, Error, string> {
   return useMutation(async code => {
      const response = await apiClient.delete<Product>(`/products/${code}`)
      return response.data
   })
}

export function useAddProductQuery(): UseMutationResult<Product, Error, AddProductFormDto> {
   return useMutation(async form => {
      const response = await apiClient.post<Product>("/products", form)
      return response.data
   })
}
