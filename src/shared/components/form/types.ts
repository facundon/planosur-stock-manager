import { RegisterOptions, UnpackNestedValue, UseFormRegisterReturn } from "react-hook-form"
import { UseMutationResult } from "react-query"

export type SelectOption = { label: string; value: string }

export type CommonFormField<T> = {
   name: keyof T
   label: string
   required?: boolean
   initialValue: T[keyof T] | undefined
   type: React.HTMLInputTypeAttribute | "select"
   options?: SelectOption[]
   isLoadingOptions?: boolean
   withEmptyOption?: boolean
}

export type CommonFormProps<T> = {
   fields: (CommonFormField<T> | CommonFormField<T>[])[]
   title: string
   submitText: string
   rules?: Partial<Record<keyof T, RegisterOptions>>
   query: (param?: unknown) => UseMutationResult<unknown, Error, UnpackNestedValue<T>>
}

export type FormFieldProps = {
   error: string | undefined
   isLoading: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   data: CommonFormField<any>
} & UseFormRegisterReturn
