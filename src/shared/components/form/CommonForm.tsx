import { Flex, useConst } from "@chakra-ui/react"
import { PropsWithChildren, useEffect } from "react"
import { DeepPartial, FieldError, Path, UnpackNestedValue, useForm } from "react-hook-form"
import { BaseForm } from ".."
import { CommonFormProps } from "./types"
import { FormField } from "./FormField"

export default function CommonForm<T extends Record<string, unknown>, K>({
   fields,
   title,
   submitText,
   rules,
   query,
   queryParams,
   onSuccess,
   onClose,
   isOpen,
   disabled,
   children,
   ...rest
}: PropsWithChildren<CommonFormProps<T, K>>) {
   const {
      mutate: sendToServer,
      isLoading,
      error: serverError,
      reset: resetQuery,
   } = query(queryParams as K)

   const defaultValues = useConst(() =>
      fields
         .flat()
         .reduce(
            (prev, next) => ({ ...prev, [next.name]: next.initialValue }),
            {} as UnpackNestedValue<DeepPartial<T>>
         )
   )

   const {
      register,
      handleSubmit,
      formState: { errors, dirtyFields },
      reset: resetForm,
      resetField,
   } = useForm<T>({ defaultValues, shouldFocusError: true })

   useEffect(() => {
      fields.flat().forEach(field => {
         resetField(field.name as Path<T>, { defaultValue: field.initialValue })
      })
   }, [defaultValues, fields, resetField])

   function resetModal() {
      onClose()
      resetForm()
      resetQuery()
   }

   return (
      <BaseForm
         isOpen={isOpen}
         onClose={resetModal}
         onSubmit={handleSubmit(data =>
            sendToServer(data, {
               onSuccess: () => {
                  resetModal()
                  onSuccess && onSuccess()
               },
            })
         )}
         error={serverError?.message}
         submitText={submitText}
         submitProps={{ disabled: disabled || !Object.values(dirtyFields).some(v => v) }}
         title={title}
         isLoading={isLoading}
         {...rest}
      >
         {children}
         {fields.map(field => {
            if (Array.isArray(field)) {
               return (
                  <Flex key={field.reduce((p, c) => p + c.name, "")} gap={4} alignItems="flex-end">
                     {field.map(subField => (
                        <FormField
                           key={subField.name as Path<T>}
                           isLoading={isLoading || Boolean(disabled)}
                           error={
                              (errors[subField.name as Path<T>] as unknown as FieldError)?.message
                           }
                           data={subField}
                           {...register(subField.name as Path<T>, rules?.[subField.name])}
                        />
                     ))}
                  </Flex>
               )
            }

            return (
               <FormField
                  key={field.name as Path<T>}
                  isLoading={isLoading || Boolean(disabled)}
                  error={(errors[field.name as Path<T>] as unknown as FieldError)?.message}
                  data={field}
                  {...register(field.name as Path<T>, rules?.[field.name])}
               />
            )
         })}
      </BaseForm>
   )
}
