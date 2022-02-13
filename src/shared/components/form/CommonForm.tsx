import { Button, Flex, useBoolean } from "@chakra-ui/react"
import { useRef } from "react"
import { DeepPartial, FieldError, Path, UnpackNestedValue, useForm } from "react-hook-form"
import { BaseForm } from ".."
import { CommonFormProps } from "./types"
import { FormField } from "./FormField"

export function CommonForm<T extends Record<string, unknown>, K>({
   fields,
   title,
   submitText,
   rules,
   query,
   queryParams,
}: CommonFormProps<T, K>) {
   const [isOpen, setIsOpen] = useBoolean(false)
   const firstInput = useRef<HTMLInputElement | HTMLSelectElement | null>(null)

   const {
      mutate: sendToServer,
      isLoading,
      error: serverError,
      reset: resetQuery,
   } = query(queryParams as K)

   const defaultValues = fields
      .flatMap(val => val)
      .reduce(
         (prev, next) => ({ ...prev, [next.name]: next.initialValue }),
         {} as UnpackNestedValue<DeepPartial<T>>
      )

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset: resetForm,
   } = useForm<T>({ defaultValues })

   const { ref: firstInputRef, ...firstInputRegistration } = register(
      Array.isArray(fields[0]) ? (fields[0][0].name as Path<T>) : (fields[0].name as Path<T>),
      rules?.name
   )

   const resetModal = () => {
      setIsOpen.off()
      resetForm()
      resetQuery()
   }

   return (
      <>
         <Button onClick={setIsOpen.on}>{title}</Button>
         <BaseForm
            isOpen={isOpen}
            onClose={setIsOpen.off}
            onSubmit={handleSubmit(data => sendToServer(data, { onSuccess: resetModal }))}
            onCancel={resetModal}
            error={serverError?.message}
            submitProps={{ isLoading }}
            submitText={submitText}
            title={title}
            initialFocusRef={firstInput}
         >
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
