import { Button, Divider, Flex, useBoolean, useConst } from "@chakra-ui/react"
import { PropsWithChildren, useEffect, useRef } from "react"
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
   disabled,
   children,
}: PropsWithChildren<CommonFormProps<T, K>>) {
   const [isOpen, setIsOpen] = useBoolean(false)
   const firstInput = useRef<HTMLInputElement | HTMLSelectElement | null>(null)

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
   } = useForm<T>({ defaultValues })

   useEffect(() => {
      fields.flat().forEach(field => {
         resetField(field.name as Path<T>, { defaultValue: field.initialValue })
      })
   }, [defaultValues, fields, resetField])

   const { ref: firstInputRef, ...firstInputRegistration } = register(
      Array.isArray(fields[0]) ? (fields[0][0].name as Path<T>) : (fields[0].name as Path<T>),
      rules?.name
   )

   function resetModal() {
      setIsOpen.off()
      resetForm()
      resetQuery()
   }

   return (
      <>
         <Button onClick={setIsOpen.on}>{title}</Button>
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
            initialFocusRef={firstInput}
            isLoading={isLoading}
         >
            {children}
            {children && <Divider pt="3" />}
            {fields.map((field, i) => {
               if (Array.isArray(field)) {
                  return (
                     <Flex key={field.reduce((p, c) => p + c.name, "")} gap={4}>
                        {field.map(subField => {
                           const registerData =
                              i !== 0
                                 ? register(subField.name as Path<T>, rules?.[subField.name])
                                 : firstInputRegistration
                           return (
                              <FormField
                                 key={subField.name as Path<T>}
                                 isLoading={isLoading}
                                 error={
                                    (errors[subField.name as Path<T>] as unknown as FieldError)
                                       ?.message
                                 }
                                 data={subField}
                                 ref={e => {
                                    if (i === 0) {
                                       firstInputRef(e)
                                       firstInput.current = e
                                    }
                                 }}
                                 {...registerData}
                              />
                           )
                        })}
                     </Flex>
                  )
               }

               const registerData =
                  i !== 0
                     ? register(field.name as Path<T>, rules?.[field.name])
                     : firstInputRegistration
               return (
                  <FormField
                     key={field.name as Path<T>}
                     isLoading={isLoading}
                     error={(errors[field.name as Path<T>] as unknown as FieldError)?.message}
                     data={field}
                     ref={e => {
                        if (i === 0) {
                           firstInputRef(e)
                           firstInput.current = e
                        }
                     }}
                     {...registerData}
                  />
               )
            })}
         </BaseForm>
      </>
   )
}
