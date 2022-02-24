import { FlexProps, Flex, useColorModeValue, IconButton, HStack, Icon } from "@chakra-ui/react"
import { Menu } from "react-feather"
import { PlanosurLogo } from "../../shared/assets"

type MobileNavProps = {
   onOpen: () => void
} & FlexProps

export const MobileNav: React.FC<MobileNavProps> = ({ onOpen, ...rest }) => {
   return (
      <Flex
         ml={{ base: 0, lg: 60 }}
         px={4}
         height={10}
         alignItems="center"
         bg={useColorModeValue("white", "gray.900")}
         justifyContent={{ base: "space-between", lg: "flex-end" }}
         {...rest}
      >
         <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
            variant="ghost"
            isRound
            aria-label="open menu"
            icon={<Menu />}
         />

         <Icon
            display={{ base: "flex", lg: "none" }}
            as={PlanosurLogo}
            w={220}
            h="auto"
            color="red.500"
         />

         <HStack spacing={{ base: "0", lg: 6 }}>{/* navbar */}</HStack>
      </Flex>
   )
}
