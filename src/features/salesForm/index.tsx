import { Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react"
import { MinusCircle, Plus, ShoppingCart } from "react-feather"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useProductsQuery } from "../../entities/products/queries"
import { BaseForm, DropdownQuery } from "../../shared/components"
import { SidebarButton } from "../../shared/components/buttons/SidebarButton"
import { FormField } from "../../shared/components/form/FormField"
import { SaleDto } from "./domain"
import { useAddSaleQuery } from "./queries"

export const SalesForm: React.FC = () => {
   const { isOpen, onClose, onOpen } = useDisclosure()

   const {
      control,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SaleDto>({
      defaultValues: { products: [{ code: "", qty: 1, type: "blank" }] },
   })

   const { fields, append, remove } = useFieldArray({
      control,
      name: "products",
   })

   const { mutate, isLoading } = useAddSaleQuery()

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
            onClose={onClose}
            size="2xl"
         >
            {fields.map((field, index) => (
               <HStack key={field.id} alignItems="flex-end">
                  <Controller
                     name={`products.${index}.code`}
                     control={control}
                     render={({ field: { onChange } }) => (
                        <DropdownQuery
                           isRequired
                           mapOptionsTo={{ label: "name", value: "code" }}
                           query={useProductsQuery}
                           onChange={onChange}
                           inputProps={{
                              size: "sm",
                              _disabled: { color: "yellow.300" },
                           }}
                           wrapperProps={{ flexGrow: 1 }}
                           isDisabled={isLoading}
                           label="Producto"
                        />
                     )}
                  />
                  <FormField
                     data={{
                        label: "Cantidad",
                        type: "number",
                        name: "qty",
                        required: true,
                     }}
                     isLoading={isLoading}
                     error={errors.products?.[index].qty?.message}
                     size="sm"
                     wrapperProps={{ flexBasis: "min-content" }}
                     {...register(`products.${index}.qty` as const)}
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
                     error={errors.products?.[index].type?.message}
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
                  />
               </HStack>
            ))}
            <Button
               leftIcon={<Plus />}
               colorScheme="teal"
               size="sm"
               onClick={() => append({ code: "pep", type: "blank", qty: 1 })}
            >
               Agregar
            </Button>
         </BaseForm>
      </>
   )
}
