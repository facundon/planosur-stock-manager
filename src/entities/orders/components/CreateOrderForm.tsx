import { Button, Divider, HStack, useDisclosure } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { Plus } from "react-feather"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { BaseForm, DropdownQuery } from "../../../shared/components"
import { AddButton, ListDeleteButton } from "../../../shared/components/buttons"
import { AsyncSelect } from "../../../shared/components/form/AsyncSelect"
import { FormField } from "../../../shared/components/form/FormField"
import { useProductsQuery, useSimpleProductQuery } from "../../products/queries"
import { useProvidersQuery } from "../../providers/queries"
import { CreateOrderDto } from "../domain"
import { useCreateOrderQuery } from "../queries"

export const CreateOrderForm: React.FC = () => {
   const { isOpen, onClose, onOpen } = useDisclosure()

   const { mutate, isLoading } = useCreateOrderQuery()

   const {
      data: providers,
      isLoading: isLoadingProviders,
      isError: isProvidersError,
   } = useProvidersQuery(isOpen)

   const defaultValues: CreateOrderDto = useMemo(
      () => ({
         providerId: NaN,
         products: [{ blankQty: 1, unregisteredQty: 1, code: "" }],
      }),
      []
   )

   const {
      register,
      control,
      formState: { errors },
      watch,
      handleSubmit,
      reset,
      clearErrors,
   } = useForm<CreateOrderDto>()

   const currentProviderId = watch("providerId")
   const currentProducts = watch("products")
   const areEmptyFields = !currentProducts?.every(prod => !!prod.code)

   const { data: products } = useProductsQuery({
      enabled: isOpen && Boolean(currentProviderId),
      needStock: true,
      providerId: currentProviderId,
   })

   const { fields, append, remove, replace } = useFieldArray({ control, name: "products" })

   useEffect(() => {
      if (products?.length) {
         replace(
            products.map(product => {
               const blankQty = product.blankMaxStock - product.blankStock
               const unregisteredQty = product.unregisteredMaxStock - product.unregisteredStock
               return { code: product.code, blankQty, unregisteredQty }
            })
         )
      } else if (currentProviderId) replace(defaultValues.products)
      clearErrors()
   }, [clearErrors, currentProviderId, defaultValues.products, products, replace])

   function handleClose() {
      onClose()
      reset()
   }

   return (
      <>
         <AddButton onClick={onOpen} title="Nuevo" />
         <BaseForm
            isOpen={isOpen}
            onClose={handleClose}
            title="Nuevo Pedido"
            onSubmit={handleSubmit(data => mutate(data, { onSuccess: handleClose }))}
            submitText="Crear"
            submitProps={{ isDisabled: !currentProviderId || !fields.length || areEmptyFields }}
            isLoading={isLoading}
         >
            <AsyncSelect
               isLoading={isLoadingProviders}
               isError={isProvidersError}
               withEmptyOption
               emptyOptionLabel="Seleccionar Proveedor"
               {...register("providerId", { required: "Elija un proveedor" })}
            >
               {providers?.map(provider => (
                  <option key={provider.id} value={provider.id}>
                     {provider.name}
                  </option>
               ))}
            </AsyncSelect>
            <Divider />

            {fields.map((field, index) => (
               <HStack key={field.id} spacing={4}>
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
                           queryParams={{ providerId: currentProviderId }}
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
                           initSearchVal={
                              value
                                 ? `${value} - ${products?.find(prod => prod.code === value)?.name}`
                                 : value
                           }
                        />
                     )}
                  />

                  <FormField
                     size="sm"
                     wrapperProps={{ flexBasis: "min-content" }}
                     data={{
                        label: "Stock Capital",
                        type: "number",
                        required: true,
                        name: `products.${index}.blankQty`,
                     }}
                     {...register(`products.${index}.blankQty`, {
                        min: { message: "Mínimo 1", value: 1 },
                     })}
                     error={errors.products?.[index].blankQty?.message}
                     isLoading={isLoading}
                  />
                  <FormField
                     size="sm"
                     wrapperProps={{ flexBasis: "min-content" }}
                     data={{
                        label: "Stock Provincia",
                        type: "number",
                        required: true,
                        name: `products.${index}.unregisteredQty`,
                     }}
                     {...register(`products.${index}.unregisteredQty`, {
                        min: { message: "Mínimo 1", value: 1 },
                     })}
                     error={errors.products?.[index].unregisteredQty?.message}
                     isLoading={isLoading}
                  />
                  <ListDeleteButton
                     onClick={() => remove(index)}
                     alignSelf={errors.products?.[index] ? "center" : "flex-end"}
                     disabled={fields.length === 1 || isLoading}
                  />
               </HStack>
            ))}
            <Button
               leftIcon={<Plus />}
               colorScheme="teal"
               size="sm"
               onClick={() => append(defaultValues.products[0])}
               disabled={areEmptyFields || !currentProviderId || isLoading}
            >
               Agregar
            </Button>
         </BaseForm>
      </>
   )
}
