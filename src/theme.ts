import { extendTheme, ThemeComponents, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react"

const config: ThemeConfig = {
   initialColorMode: "dark",
}

const components: ThemeComponents = {
   Input: {
      defaultProps: {
         focusBorderColor: "pink.400",
      },
   },
   Select: {
      defaultProps: {
         focusBorderColor: "pink.400",
      },
   },
   Button: {
      baseStyle: {
         _focus: {
            boxShadow: "0 0 3px var(--chakra-colors-pink-400)",
         },
      },
   },
   AccordionButton: {
      baseStyle: {
         _focus: {
            boxShadow: "0 0 3px var(--chakra-colors-pink-400)",
         },
      },
   },
}

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "yellow" }), {
   config,
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
            default: "red.500",
            _dark: "red.400",
         },
         secondary: {
            default: "yellow.500",
            _dark: "yellow.400",
         },
         text: {
            default: "whiteAlpha.900",
            _dark: "blackAlpha.900",
         },
      },
   },
   components,
})

export default theme
