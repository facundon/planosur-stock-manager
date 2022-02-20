import { ButtonGroup, Flex, Text, Icon, IconButton, Select } from "@chakra-ui/react"
import { ArrowLeft, ArrowRight, SkipBack, SkipForward } from "react-feather"

type PaginationFooterProps = {
   onNextPage: () => void
   onPreviousPage: () => void
   onGotoFirstPage: () => void
   onGotoLastPage: () => void
   onPageResize: (number: number) => void
   canPreviousPage: boolean
   canNextPage: boolean
   currentPage: number
   totalPages: number
}

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
   onGotoFirstPage,
   onNextPage,
   onPreviousPage,
   onGotoLastPage,
   canNextPage,
   canPreviousPage,
   onPageResize,
   totalPages,
   currentPage,
}) => {
   return (
      <Flex align="center" width="fit-content" justifyContent="flex-end" grow={1}>
         <Text fontSize="sm" mr={2}>
            Mostrando
         </Text>
         <Select
            onChange={e => {
               onPageResize(+e.target.value)
            }}
            flexBasis="fit-content"
            size="sm"
            variant="flushed"
         >
            {[10, 20, 30, 40, 50].map(pageSize => (
               <option key={pageSize} value={pageSize}>
                  {pageSize}
               </option>
            ))}
         </Select>

         <Text mx={5} fontSize="sm">
            Página{" "}
            <Text as="strong" color="yellow">
               {currentPage}
            </Text>{" "}
            / {totalPages}
         </Text>

         <ButtonGroup isAttached size="sm">
            <IconButton
               aria-label="Primer página"
               title="Primer página"
               onClick={onGotoFirstPage}
               disabled={!canPreviousPage}
               icon={<Icon as={SkipBack} />}
            />
            <IconButton
               aria-label="Página anterior"
               title="Página anterior"
               onClick={onPreviousPage}
               disabled={!canPreviousPage}
               icon={<Icon as={ArrowLeft} />}
            />
            <IconButton
               aria-label="Página siguiente"
               title="Página siguiente"
               onClick={onNextPage}
               disabled={!canNextPage}
               icon={<Icon as={ArrowRight} />}
            />
            <IconButton
               aria-label="Ultima página"
               title="Ultima página"
               onClick={onGotoLastPage}
               disabled={!canNextPage}
               icon={<Icon as={SkipForward} />}
            />
         </ButtonGroup>
      </Flex>
   )
}
