import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "red" }), {
   semanticTokens: {
      colors: {
         error: {
            default: "red.400",
            _dark: "red.300",
         },
         success: {
            default: "green.400",
            _dark: "green.300",
         },
         warning: {
            default: "orange.400",
            _dark: "orange.300",
         },
         primary: {
            default: "pink.500",
            _dark: "pink.400",
         },
         secondary: {
            default: "yellow.500",
            _dark: "yellow.400",
         },
      },
   },
})

export default theme
