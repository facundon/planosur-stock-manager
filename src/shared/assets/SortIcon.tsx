import { Icon, IconProps } from "@chakra-ui/react"
import React from "react"

export const SortIcon: React.FC<IconProps & { isAscending: boolean }> = ({
   isAscending,
   ...props
}) => {
   return (
      <Icon h="auto" w={4} {...props} viewBox="0 0 16 16">
         <path
            d="M10.267 7.467v5.6M13.067 10.267l-2.8 2.8-2.8-2.8"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={
               isAscending ? "var(--chakra-colors-yellow-200)" : "var(--chakra-colors-gray-300)"
            }
         />
         <path
            d="M4.2 7.194V1.205M1.205 4.2L4.2 1.205 7.194 4.2"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={
               !isAscending ? "var(--chakra-colors-yellow-200)" : "var(--chakra-colors-gray-300)"
            }
         />
      </Icon>
   )
}
