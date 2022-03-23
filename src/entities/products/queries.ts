import { useToast } from "@chakra-ui/react"
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
   ProductWithProviderAndCategory[],
   AxiosError
> {
   const queryKey = Object.entries(filters).map(filter => `${filter[0]}=${filter[1]}`)

   const query = queryKey.join("&")

   return useQuery(
      PRODUCTS_KEYS.filtered(filters),
      async () => {
         const response = await apiClient.get<ProductWithProviderAndCategory[]>(
            `/products${query ? `?${query}` : ""}`
         )
         return response.data
      },
      { enabled }
   )
}

export function useSimpleProductQuery({
   enabled = true,
   ...filters
}: Pick<ProductFilters, "searchVal" | "providerId"> & {
   enabled?: boolean
}): UseQueryResult<ProductSimple[], AxiosError> {
   const queryKey = Object.entries(filters).map(filter => `${filter[0]}=${filter[1]}`)

   const query = queryKey.join("&")

   return useQuery(
      PRODUCTS_KEYS.simple(query),
      async () => {
         const response = await apiClient.get<ProductSimple[]>(
            `/products/simple${query ? `?${query}` : ""}`
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
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

   return useMutation(
      async form => {
         const response = await apiClient.patch<ProductWithProviderAndCategory>(
            `/products/${code}`,
            form
         )
         return response.data
      },
      {
         onSuccess: product => {
            queryClient.setQueryData(PRODUCTS_KEYS.byCode(code), product)
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
            toast({ title: `Producto actualizado`, status: "success" })
         },
         onError: () => {
            toast({ title: "No se pudo actualizar el producto", status: "error" })
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
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

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
            toast({ title: `Producto eliminado`, status: "success" })
         },
         onError: () => {
            toast({ title: "Error al eliminar el producto", status: "error" })
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
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

   return useMutation(
      async form => {
         const response = await apiClient.post<ProductWithProviderAndCategory>("/products", form)
         return response.data
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries(PRODUCTS_KEYS.base)
            toast({ title: `Producto creado`, status: "success" })
         },
         onError: () => {
            toast({ title: "Error al crear el producto", status: "error" })
         },
      }
   )
}
