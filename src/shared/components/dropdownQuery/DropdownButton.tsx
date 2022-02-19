import { ButtonProps, Button } from "@chakra-ui/react"
import { useRef, useLayoutEffect } from "react"

type DropdownButtonProps = {
   isFocus: boolean
   isSelected?: boolean
} & ButtonProps

export function DropdownButton({ isFocus, isSelected, children, ...rest }: DropdownButtonProps) {
   const ref = useRef<HTMLButtonElement>(null)

   useLayoutEffect(() => {
      if (isFocus && ref.current) {
         ref.current.focus()
      }
   }, [isFocus])

   return (
      <Button
         tabIndex={!isSelected && isFocus ? 0 : -1}
         isFullWidth
         isActive={!isSelected && isFocus}
         disabled={isSelected}
         colorScheme={isSelected ? "yellow" : "gray"}
         fontStyle={isSelected ? "italic" : "normal"}
         fontWeight={isSelected ? "600" : "400"}
         variant="ghost"
         justifyContent="flex-start"
         ref={ref}
         {...rest}
      >
         {children}
      </Button>
   )
}
