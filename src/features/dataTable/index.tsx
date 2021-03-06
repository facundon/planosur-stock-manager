import {
   Box,
   HStack,
   Icon,
   Skeleton,
   Table,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tooltip,
   Tr,
   VStack,
} from "@chakra-ui/react"
import { useEffect, useMemo, useRef } from "react"
import { AlertOctagon } from "react-feather"
import { useTable, Column, usePagination, useSortBy } from "react-table"
import { SortIcon } from "../../shared/assets"
import { ExtractArray } from "../../shared/utils/types"
import { PaginationFooter } from "./PaginationFooter"
import { ShowAllColumnsCheckbox } from "./ShowAllColumnsCheckbox"

export type TableColumn<T> = {
   label: string
   accessor: keyof T
}

type DataTableProps<T> = {
   headers: TableColumn<ExtractArray<T>>[]
   data: T
   isLoading?: boolean
}

export function DataTable<T extends Record<string, unknown>[]>({
   headers,
   data,
   isLoading,
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
                     return <Text textAlign="right">{value}</Text>

                  case "updatedAt":
                  case "orderedAt":
                     return (
                        <Text textAlign="center">
                           {value
                              ? new Date(value).toLocaleDateString("es-ES", {
                                   year: "numeric",
                                   day: "2-digit",
                                   month: "2-digit",
                                })
                              : "-"}
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
               Header: header.label,
               accessor: header.accessor as string,
               Cell: cell,
            }
         }),
      [headers]
   )

   const wrapperRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
      if (data) {
         wrapperRef.current?.scrollIntoView({ behavior: "smooth" })
      }
   }, [data])

   const tableData = useMemo(
      () => (isLoading ? (new Array(10).fill(0) as T) : data),
      [data, isLoading]
   )
   const tableInstance = useTable(
      {
         columns,
         data: tableData,
         initialState: {
            hiddenColumns: [
               "blankMaxStock",
               "blankMinStock",
               "unregisteredMaxStock",
               "unregisteredMinStock",
               "updatedAt",
               "orderedAt",
               "category",
               "provider",
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
      rows,
      state: { pageIndex },
   } = tableInstance

   return (
      <VStack display="block" maxW="100%" m="auto" boxShadow="dark-lg" p={5} ref={wrapperRef}>
         <Text color="yellow.200" textAlign="end" fontWeight={200}>
            {`${rows.length} resultado${rows.length > 1 ? "s" : ""}`}
         </Text>
         <Box maxW="100%" maxH={{ base: "70vh", lg: "100vh" }} overflow="auto" display="block">
            <Table {...getTableProps()} w="100%" colorScheme="teal">
               <Thead>
                  {headerGroups.map(headerGroup => (
                     // eslint-disable-next-line react/jsx-key
                     <Tr
                        {...headerGroup.getHeaderGroupProps()}
                        position="sticky"
                        top={0}
                        overflow="auto"
                        bg="gray.900"
                        boxShadow="xl"
                        zIndex={1}
                     >
                        {headerGroup.headers.map(column => {
                           const isSticky = column.id === "code"
                           return (
                              // eslint-disable-next-line react/jsx-key
                              <Th
                                 {...column.getHeaderProps(
                                    column.getSortByToggleProps({ title: "Ordenar" })
                                 )}
                                 backgroundClip="padding-box"
                                 position={isSticky ? "sticky" : undefined}
                                 left={isSticky ? 0 : undefined}
                                 bg={isSticky ? "gray.900" : undefined}
                                 boxShadow={isSticky ? "xl" : undefined}
                              >
                                 <Text display="flex" align="center" alignItems="center">
                                    {column.render("Header")}
                                    {column.isSorted && (
                                       <SortIcon isAscending={!column.isSortedDesc} ml={1} />
                                    )}
                                 </Text>
                              </Th>
                           )
                        })}
                     </Tr>
                  ))}
               </Thead>
               <Tbody {...getTableBodyProps()}>
                  {page.map(row => {
                     prepareRow(row)
                     const isAlert =
                        (row.original.blankStock as number) <
                           (row.original.blankMinStock as number) ||
                        (row.original.unregisteredStock as number) <
                           (row.original.unregisteredMinStock as number)

                     const isWarn =
                        (row.original.blankStock as number) ===
                           (row.original.blankMinStock as number) ||
                        (row.original.unregisteredStock as number) ===
                           (row.original.unregisteredMinStock as number)

                     return (
                        // eslint-disable-next-line react/jsx-key
                        <Tr {...row.getRowProps()} border="none">
                           {row.cells.map(cell => {
                              const isSticky = cell.column.id === "code"
                              return (
                                 // eslint-disable-next-line react/jsx-key
                                 <Td
                                    {...cell.getCellProps()}
                                    position={isSticky ? "sticky" : undefined}
                                    left={isSticky ? 0 : undefined}
                                    bg={isSticky ? "gray.900" : undefined}
                                    boxShadow={isSticky ? "xl" : undefined}
                                    whiteSpace="nowrap"
                                    textAlign={Number.isInteger(cell.value) ? "center" : "left"}
                                 >
                                    {!isLoading ? (
                                       <HStack>
                                          {isSticky && (isAlert || isWarn) && (
                                             <Tooltip
                                                label={
                                                   isAlert
                                                      ? "Stock comprometido"
                                                      : isWarn
                                                      ? "Stock al l??mite"
                                                      : undefined
                                                }
                                                fontSize="sm"
                                             >
                                                <Icon
                                                   color={
                                                      isAlert
                                                         ? "error"
                                                         : isWarn
                                                         ? "warning"
                                                         : undefined
                                                   }
                                                   as={AlertOctagon}
                                                />
                                             </Tooltip>
                                          )}
                                          {cell.render("Cell")}
                                       </HStack>
                                    ) : (
                                       <Skeleton startColor="yellow.300" h={2} />
                                    )}
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
