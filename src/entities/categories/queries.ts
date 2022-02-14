import { AxiosError } from "axios"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { apiClient } from "../../shared/utils/apiClient"
import { CategoryFormDto, Category } from "./domain"
import { CATEGORIES_KEYS } from "./queryKeys"

export function useCategoryQuery(id: number): UseQueryResult<Category, AxiosError> {
   return useQuery(CATEGORIES_KEYS.byId(id), async () => {
      const response = await apiClient.get<Category>(`/categories/${id}`)
      return response.data
   })
}

export function useCategoriesQuery(): UseQueryResult<Category[], AxiosError> {
   return useQuery(CATEGORIES_KEYS.base, async () => {
      const response = await apiClient.get<Category[]>("/categories")
      return response.data
   })
}

export function useUpdateCategoryQuery(
   id: number
): UseMutationResult<Category, AxiosError, CategoryFormDto> {
   return useMutation(async form => {
      const response = await apiClient.patch<Category>(`/categories/${id}`, form)
      return response.data
   })
}

export function useDeleteCategoryQuery(): UseMutationResult<Category, AxiosError, number> {
   return useMutation(async id => {
      const response = await apiClient.delete<Category>(`/categories/${id}`)
      return response.data
   })
}

export function useAddCategoryQuery(): UseMutationResult<Category, AxiosError, CategoryFormDto> {
   return useMutation(async form => {
      const response = await apiClient.post<Category>("/categories", form)
      return response.data
   })
}
