import { Box, Center, Divider, Heading, HStack, Icon, Link, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Check, ExternalLink, X } from "react-feather"
import { useFieldArray, useForm } from "react-hook-form"
import { BaseForm, DropdownQuery } from "../../../shared/components"
import { ModifyButton } from "../../../shared/components/buttons"
import { FormField } from "../../../shared/components/form/FormField"
import { UpdateOrderDto } from "../domain"
import { useOrderQuery, useOrdersQuery, useUpdateOrderQuery } from "../queries"

export const EntryOrderForm: React.FC = () => {
   const { isOpen, onClose, onOpen } = useDisclosure()
   const [currentOrderId, setCurrentOrderId] = useState(NaN)

   const { data: order } = useOrderQuery({ id: currentOrderId, enabled: !!currentOrderId })

   const { mutate, isLoading, error } = useUpdateOrderQuery(currentOrderId)
   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
      reset,
      clearErrors,
      watch,
   } = useForm<UpdateOrderDto>()

   const { fields, replace } = useFieldArray({ control, name: "products" })

   useEffect(() => {
      if (order) {
         replace(
            order.productInOrder.map(item => ({
               code: item.product.code,
               blankQty: item.blankQty,
               unregisteredQty: item.unregisteredQty,
            }))
         )
      }
   }, [order, replace])

   useEffect(() => {
      if (!currentOrderId) {
         replace([])
      }
   }, [currentOrderId, replace])

   function handleClose() {
      onClose()
      reset()
      clearErrors()
      setCurrentOrderId(NaN)
   }

   return (
      <>
         <ModifyButton onClick={onOpen} title="Ingresar" />
         <BaseForm
            title="Ingresar Pedido"
            submitText="Ingresar"
            onClose={handleClose}
            isOpen={isOpen}
            onSubmit={handleSubmit(data => mutate(data, { onSuccess: handleClose }))}
            error={Array.isArray(error?.message) ? error?.message.join(" - ") : error?.message}
            isLoading={isLoading}
            submitProps={{ disabled: !currentOrderId || !!errors.products }}
         >
            <DropdownQuery
               query={useOrdersQuery}
               queryParams={{ status: JSON.stringify(["pending"]) }}
               mapOptionsTo={{
                  value: "id",
                  label: "id",
               }}
               onChange={id => setCurrentOrderId(Number(id) || NaN)}
               inputProps={{ bgColor: "primary", color: "blackAlpha.900", fontWeight: "600" }}
            />
            {order && (
               <Center gap={3}>
                  <Heading fontSize={"md"}>{order.provider.name}</Heading>
                  <Divider orientation="vertical" h="1.5rem" />
                  <Heading fontSize={"md"}>
                     Creado el{" "}
                     {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                     })}
                  </Heading>
                  <Divider orientation="vertical" h="1.5rem" />
                  <Link href={order.file} color="primary" isExternal>
                     Pedido
                     <Icon ml={1} as={ExternalLink} />
                  </Link>
               </Center>
            )}
            <Divider />

            {fields.map((field, index) => {
               const currFieldValue = watch(`products.${index}`)
               const isOk =
                  +field.blankQty === +currFieldValue.blankQty &&
                  +field.unregisteredQty === +currFieldValue.unregisteredQty

               return (
                  <HStack key={field.id}>
                     <FormField
                        {...register(`products.${index}.code`)}
                        data={{ label: "Producto", type: "text" }}
                        variant="flushed"
                        isDisabled
                        color="yellow.300"
                        size="sm"
                     />
                     <FormField
                        {...register(`products.${index}.blankQty`, {
                           min: { message: "Mínimo 0", value: 0 },
                        })}
                        data={{ label: "Stock Capital", type: "number", required: true }}
                        size="sm"
                        wrapperProps={{ flexBasis: "min-content" }}
                        error={errors.products?.[index].blankQty?.message}
                        isLoading={isLoading}
                        textAlign="center"
                     />
                     <FormField
                        {...register(`products.${index}.unregisteredQty`, {
                           min: { message: "Mínimo 0", value: 0 },
                        })}
                        data={{ label: "Stock Provincia", type: "number", required: true }}
                        size="sm"
                        wrapperProps={{ flexBasis: "min-content" }}
                        error={errors.products?.[index].unregisteredQty?.message}
                        isLoading={isLoading}
                        textAlign="center"
                     />
                     <Box alignSelf={errors.products ? "center" : "flex-end"}>
                        {isOk ? (
                           <Icon color="success" fontSize="xl" as={Check} />
                        ) : (
                           <Icon color="error" fontSize="xl" as={X} />
                        )}
                     </Box>
                  </HStack>
               )
            })}
         </BaseForm>
      </>
   )
}
