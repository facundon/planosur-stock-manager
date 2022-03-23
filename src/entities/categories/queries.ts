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
import { addUpdater, deleteUpdater, patchUpdater } from "../../shared/utils/queriesUpdater"
import { CategoryFormDto, Category } from "./domain"
import { CATEGORIES_KEYS } from "./queryKeys"

export function useCategoryQuery(id: number): UseQueryResult<Category, AxiosError> {
   return useQuery(CATEGORIES_KEYS.byId(id), async () => {
      const response = await apiClient.get<Category>(`/categories/${id}`)
      return response.data
   })
}

export function useCategoriesQuery(enabled = true): UseQueryResult<Category[], AxiosError> {
   return useQuery(
      CATEGORIES_KEYS.base,
      async () => {
         const response = await apiClient.get<Category[]>("/categories")
         return response.data
      },
      { enabled }
   )
}

export function useUpdateCategoryQuery(
   id: number
): UseMutationResult<Category, AxiosError, CategoryFormDto> {
   const queryClient = useQueryClient()
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

   return useMutation(
      async form => {
         const response = await apiClient.patch<Category>(`/categories/${id}`, form)
         return response.data
      },
      {
         onSuccess: data => {
            queryClient.setQueryData(CATEGORIES_KEYS.byId(id), data)
            queryClient.setQueryData<Category[]>(CATEGORIES_KEYS.base, prev =>
               patchUpdater(data, prev, "id")
            )
            toast({ title: `Categoría actualizada`, status: "success" })
         },
         onError: () => {
            toast({ title: "No se pudo actualizar la categoria", status: "error" })
         },
      }
   )
}

export function useDeleteCategoryQuery(): UseMutationResult<Category, AxiosError, number> {
   const queryClient = useQueryClient()
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

   return useMutation(
      async id => {
         const response = await apiClient.delete<Category>(`/categories/${id}`)
         return response.data
      },
      {
         onSuccess: (_, id) => {
            queryClient.setQueryData(CATEGORIES_KEYS.byId(id), () => undefined)
            queryClient.setQueryData<Category[] | undefined>(CATEGORIES_KEYS.base, prev =>
               deleteUpdater(id, prev, "id")
            )
            toast({ title: `Categoría eliminada`, status: "success" })
         },
         onError: () => {
            toast({ title: "No se pudo eliminar la categoria", status: "error" })
         },
      }
   )
}

export function useAddCategoryQuery(): UseMutationResult<Category, AxiosError, CategoryFormDto> {
   const queryClient = useQueryClient()
   const toast = useToast({ variant: "top-accent", position: "bottom-left" })

   return useMutation(
      async form => {
         const response = await apiClient.post<Category>("/categories", form)
         return response.data
      },
      {
         onSuccess: data => {
            queryClient.setQueryData<Category[]>(CATEGORIES_KEYS.base, prev =>
               addUpdater(data, prev)
            )
            toast({ title: `Categoría agregada`, status: "success" })
         },
         onError: () => {
            toast({ title: "No se pudo agregar la categoria", status: "error" })
         },
      }
   )
}
