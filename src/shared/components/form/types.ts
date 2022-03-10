import { FormControlProps, InputProps, ModalProps, SelectProps } from "@chakra-ui/react"
import { RegisterOptions, UnpackNestedValue, UseFormRegisterReturn } from "react-hook-form"
import { UseMutationResult } from "react-query"

export type SelectOption = { label: string; value: string }

export type CommonFormField<T> = {
   label: string
   required?: boolean
   initialValue: T[keyof T] | undefined
   type: React.HTMLInputTypeAttribute | "select"
   options?: SelectOption[]
   isLoadingOptions?: boolean
   withEmptyOption?: boolean
}

export type CommonFormFieldWithName<T> = CommonFormField<T> & { name: keyof T }

export type CommonFormProps<T, K> = {
   fields: (CommonFormFieldWithName<T> | CommonFormFieldWithName<T>[])[]
   title: string
   submitText: string
   rules?: Partial<Record<keyof T, RegisterOptions>>
   query: (param: K) => UseMutationResult<unknown, Error, UnpackNestedValue<T>>
   queryParams?: K
   disabled?: boolean
   onSuccess?: () => void
   onClose: () => void
   isOpen: boolean
} & Omit<ModalProps, "children">

export type FormFieldProps = {
   error?: string | undefined
   isLoading?: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   data: Omit<CommonFormField<any>, "initialValue">
   wrapperProps?: FormControlProps
} & UseFormRegisterReturn &
   InputProps &
   SelectProps
