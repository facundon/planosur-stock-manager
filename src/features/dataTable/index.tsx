import { Box, HStack, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useMemo } from "react"
import { ArrowDown, ArrowUp } from "react-feather"
import { useTable, Column, usePagination, useSortBy } from "react-table"
import { ExtractArray } from "../../shared/utils/types"
import { PaginationFooter } from "./PaginationFooter"
import { ShowAllColumnsCheckbox } from "./ShowAllColumnsCheckbox"

type DataTableProps<T> = {
   headers: { accessor: keyof ExtractArray<T>; value: string }[]
   data: T
}

export function DataTable<T extends Record<string, unknown>[]>({
   headers,
   data,
}: DataTableProps<T>) {
   const columns: Column<Record<string, unknown>>[] = useMemo(
      () =>
         headers.map(header => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cell = ({ value }: { value: any }) => {
               switch (header.accessor) {
                  case "code":
                     return (
                        <Text fontWeight={600} textAlign="right">
                           {value}
                        </Text>
                     )

                  case "price":
                     return (
                        <Text display="flex" justifyContent="space-between">
                           <Text as="span" mr={5}>
                              u$s
                           </Text>
                           {value}
                        </Text>
                     )

                  case "updatedAt":
                  case "orderedAt":
                     return (
                        <Text textAlign="center">
                           {value ? new Date(value).toLocaleDateString() : "-"}
                        </Text>
                     )

                  case "provider":
                  case "category":
                     return String(value?.name || "-")

                  default:
                     return String(value) === "true" ? (
                        <Text textAlign="center">Si</Text>
                     ) : String(value) === "false" ? (
                        <Text textAlign="center">No</Text>
                     ) : (
                        String(value)
                     )
               }
            }
            return {
               Header: header.value,
               accessor: header.accessor as string,
               Cell: cell,
            }
         }),
      [headers]
   )

   const tableInstance = useTable(
      {
         columns,
         data,
         initialState: {
            hiddenColumns: [
               "blankMaxStock",
               "blankMinStock",
               "unregisteredMaxStock",
               "unregisteredMinStock",
               "updatedAt",
               "category",
            ],
            sortBy: [
               { id: "code", desc: false },
               { id: "qty", desc: false },
            ],
         },
         disableSortRemove: true,
         autoResetSortBy: false,
      },
      useSortBy,
      usePagination
   )

   const {
      allColumns,
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      getToggleHideAllColumnsProps,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex },
   } = tableInstance

   return (
      <VStack display="block" maxW="100%" m="auto" boxShadow="dark-lg" p={5}>
         <Box maxW="100%" overflowX="auto" overflowY="hidden" display="block">
            <Table {...getTableProps()} w="100%" colorScheme="teal">
               <Thead>
                  {headerGroups.map(headerGroup => (
                     // eslint-disable-next-line react/jsx-key
                     <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                           // eslint-disable-next-line react/jsx-key
                           <Th
                              {...column.getHeaderProps(
                                 column.getSortByToggleProps({ title: "Ordenar" })
                              )}
                           >
                              <Text display="flex" align="center" alignItems="center">
                                 {column.render("Header")}
                                 {column.isSorted && (
                                    <Icon
                                       ml={1}
                                       color="yellow.300"
                                       as={column.isSortedDesc ? ArrowDown : ArrowUp}
                                    />
                                 )}
                              </Text>
                           </Th>
                        ))}
                     </Tr>
                  ))}
               </Thead>
               <Tbody {...getTableBodyProps()}>
                  {page.map(row => {
                     prepareRow(row)
                     return (
                        // eslint-disable-next-line react/jsx-key
                        <Tr {...row.getRowProps()}>
                           {row.cells.map(cell => {
                              return (
                                 // eslint-disable-next-line react/jsx-key
                                 <Td
                                    {...cell.getCellProps()}
                                    whiteSpace="nowrap"
                                    textAlign={Number.isInteger(cell.value) ? "center" : "left"}
                                 >
                                    {cell.render("Cell")}
                                 </Td>
                              )
                           })}
                        </Tr>
                     )
                  })}
               </Tbody>
            </Table>
         </Box>
         <HStack w="100%">
            <ShowAllColumnsCheckbox {...getToggleHideAllColumnsProps()} allColumns={allColumns} />
            <PaginationFooter
               onNextPage={nextPage}
               onPreviousPage={previousPage}
               onGotoFirstPage={() => gotoPage(0)}
               onGotoLastPage={() => gotoPage(pageCount - 1)}
               onPageResize={setPageSize}
               canPreviousPage={canPreviousPage}
               canNextPage={canNextPage}
               currentPage={pageIndex + 1}
               totalPages={pageOptions.length}
            />
         </HStack>
      </VStack>
   )
}

export default DataTable
