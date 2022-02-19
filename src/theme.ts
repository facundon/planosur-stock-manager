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
            default: "yellow.400",
            _dark: "yellow.300",
         },
         secondary: {
            default: "teal.400",
            _dark: "teal.300",
         },
         primaryContrast: {
            default: "teal.500",
            _dark: "teal.400",
         },
         primaryContrastDisabled: {
            default: "teal.400",
            _dark: "teal.300",
         },
         text: {
            default: "blackAlpha.900",
            _dark: "blackAlpha.900",
         },
      },
   },
   components,
})

export default theme
