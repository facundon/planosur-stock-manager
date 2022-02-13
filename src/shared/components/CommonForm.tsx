import {
   Button,
   Flex,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Select,
   useBoolean,
} from "@chakra-ui/react"
import React from "react"
import { useRef } from "react"
import {
   DeepPartial,
   FieldError,
   Path,
   RegisterOptions,
   UnpackNestedValue,
   useForm,
   UseFormRegisterReturn,
} from "react-hook-form"
import { UseMutationResult } from "react-query"
import { BaseForm } from "."

type CommonFormField<T> = {
   name: keyof T
   label: string
   required: boolean
   initialValue: T[keyof T]
   type: React.HTMLInputTypeAttribute | "select"
   options?: { label: string; value: string }[]
}

type CommonFormProps<T> = {
   fields: (CommonFormField<T> | CommonFormField<T>[])[]
   title: string
   submitText: string
   rules?: Partial<Record<keyof T, RegisterOptions>>
   query: (param?: unknown) => UseMutationResult<unknown, Error, UnpackNestedValue<T>>
}

type FormFieldProps = {
   error: string | undefined
   isLoading: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   data: CommonFormField<any>
} & UseFormRegisterReturn

const FormField = React.forwardRef<HTMLInputElement | HTMLSelectElement, FormFieldProps>(
   ({ error, isLoading, data: { label, type, required, options }, ...rest }, ref) => (
      <FormControl isInvalid={!!error} isRequired={required} isDisabled={isLoading}>
         <FormLabel>{label}</FormLabel>
         {type === "select" ? (
            <Select {...rest} ref={ref as React.ForwardedRef<HTMLSelectElement>}>
               {options?.map(option => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </Select>
         ) : (
            <Input type={type} {...rest} ref={ref as React.ForwardedRef<HTMLInputElement>} />
         )}
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   )
)

export function CommonForm<T extends Record<string, unknown>>({
   fields,
   title,
   submitText,
   rules,
   query,
}: CommonFormProps<T>) {
   const [isOpen, setIsOpen] = useBoolean(false)
   const firstInput = useRef<HTMLInputElement | HTMLSelectElement | null>(null)

   const { mutate: sendToServer, isLoading, error: serverError, reset: resetQuery } = query()

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

   const handleCancel = () => {
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
            onSubmit={handleSubmit(data => sendToServer(data, { onSuccess: setIsOpen.off }))}
            onCancel={handleCancel}
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
