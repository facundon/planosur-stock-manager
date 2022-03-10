import {
   FormControl,
   FormLabel,
   InputGroup,
   InputLeftElement,
   Input,
   FormErrorMessage,
} from "@chakra-ui/react"
import React from "react"
import { Phone, DollarSign, AtSign } from "react-feather"
import { AsyncSelect } from "./AsyncSelect"
import { FormFieldProps } from "./types"

function FormFieldWithoutRef(
   {
      error,
      isLoading,
      data: { label, type, options, isLoadingOptions, withEmptyOption, required },
      wrapperProps,
      ...rest
   }: FormFieldProps,
   ref: React.ForwardedRef<HTMLInputElement | HTMLSelectElement>
) {
   const shouldRenderIcon = rest.name === "phone" || type === "email" || rest.name === "price"

   return (
      <FormControl
         isInvalid={!!error}
         isRequired={required}
         isDisabled={isLoading}
         {...wrapperProps}
      >
         <FormLabel whiteSpace="nowrap" fontSize={rest.size}>
            {label}
         </FormLabel>
         {type === "select" ? (
            <AsyncSelect
               {...rest}
               ref={ref as React.ForwardedRef<HTMLSelectElement>}
               withEmptyOption={withEmptyOption}
               isLoading={isLoadingOptions}
            >
               {options?.map(option => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </AsyncSelect>
         ) : (
            <InputGroup>
               {shouldRenderIcon && (
                  <InputLeftElement pointerEvents="none" color="gray.300">
                     {rest.name === "phone" && <Phone strokeWidth={1} size={18} />}
                     {rest.name === "price" && <DollarSign strokeWidth={1} size={18} />}
                     {type === "email" && <AtSign strokeWidth={1} size={18} />}
                  </InputLeftElement>
               )}
               <Input
                  type={type}
                  {...rest}
                  ref={ref as React.ForwardedRef<HTMLInputElement>}
                  onClick={e => e.currentTarget.select()}
                  step={rest.name === "price" || rest.name === "qty" ? 0.01 : 1}
               />
            </InputGroup>
         )}
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   )
}

export const FormField = React.forwardRef(FormFieldWithoutRef)
