import { Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react"
import { useMemo } from "react"
import { MinusCircle, Plus, ShoppingCart } from "react-feather"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useSimpleProductQuery } from "../../entities/products/queries"
import { BaseForm, DropdownQuery } from "../../shared/components"
import { SidebarButton } from "../../shared/components/buttons/SidebarButton"
import { FormField } from "../../shared/components/form/FormField"
import { SaleDto } from "./domain"
import { useAddSaleQuery } from "./queries"

const defaultValues: SaleDto = { products: [{ code: "", amount: 1, type: "blank" }] }

export const SalesForm: React.FC = () => {
   const { isOpen, onClose, onOpen } = useDisclosure()

   const {
      control,
      register,
      handleSubmit,
      formState: { errors, dirtyFields },
      reset,
   } = useForm<SaleDto>({
      defaultValues,
      shouldFocusError: true,
   })

   const { fields, append, remove } = useFieldArray({
      control,
      name: "products",
   })

   const { mutate, isLoading, error: serverError } = useAddSaleQuery()

   const hasChanged = useMemo(
      () => (dirtyFields.products ? Object.values(dirtyFields.products).every(v => v) : false),
      [dirtyFields.products]
   )

   //FIXME: product focus issue
   //FIXME: dirty fields on appended fields
   return (
      <>
         <SidebarButton onClick={onOpen} leftIcon={<ShoppingCart />}>
            Nueva Venta
         </SidebarButton>
         <BaseForm
            submitText="Enviar"
            title="Nueva Venta"
            onSubmit={handleSubmit(d => mutate(d))}
            isOpen={isOpen}
            onClose={() => {
               onClose()
               reset()
            }}
            size="2xl"
            error={serverError?.message}
            isLoading={isLoading}
            submitProps={{ disabled: !hasChanged }}
         >
            {fields.map((field, index) => (
               <HStack key={field.id} alignItems="flex-start">
                  <Controller
                     rules={{ required: "Ingrese un producto" }}
                     name={`products.${index}.code`}
                     control={control}
                     render={({
                        field: { onChange, name, onBlur, ref, value },
                        fieldState: { error },
                     }) => (
                        <DropdownQuery
                           isRequired
                           mapOptionsTo={{ label: "name", value: "code" }}
                           query={useSimpleProductQuery}
                           onChange={onChange}
                           inputProps={{
                              size: "sm",
                              _disabled: { color: "yellow.300" },
                              onBlur,
                              name,
                              value,
                           }}
                           wrapperProps={{ flexGrow: 1 }}
                           isDisabled={isLoading}
                           label="Producto"
                           ref={ref}
                           error={error?.message}
                        />
                     )}
                  />
                  <FormField
                     data={{
                        label: "Cantidad",
                        type: "number",
                        name: "amount",
                        required: true,
                     }}
                     type="number"
                     isLoading={isLoading}
                     error={errors.products?.[index]?.amount?.message}
                     size="sm"
                     wrapperProps={{ flexBasis: "min-content" }}
                     {...register(`products.${index}.amount` as const, {
                        min: { value: 1, message: "Mínimo 1" },
                        validate: val => Number.isInteger(+val) || "Solo valores enteros",
                     })}
                  />
                  <FormField
                     data={{
                        label: "Tipo",
                        type: "select",
                        options: [
                           { label: "Capital", value: "blank" },
                           { label: "Provincia", value: "unregistered" },
                        ],
                        name: "type",
                        required: true,
                     }}
                     isLoading={isLoading}
                     error={errors.products?.[index]?.type?.message}
                     size="sm"
                     wrapperProps={{ flexBasis: "fit-content" }}
                     {...register(`products.${index}.type` as const)}
                  />
                  <IconButton
                     aria-label="Borrar"
                     title="Borrar"
                     variant="ghost"
                     isRound
                     size="sm"
                     icon={<MinusCircle size="16" />}
                     colorScheme="teal"
                     onClick={() => remove(index)}
                     alignSelf={errors.products?.[index] ? "center" : "flex-end"}
                  />
               </HStack>
            ))}
            <Button
               leftIcon={<Plus />}
               colorScheme="teal"
               size="sm"
               onClick={() => append(defaultValues.products[0])}
               disabled={!hasChanged}
            >
               Agregar
            </Button>
         </BaseForm>
      </>
   )
}
