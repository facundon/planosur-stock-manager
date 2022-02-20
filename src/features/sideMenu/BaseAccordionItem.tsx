import {
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   Heading,
   Icon,
   Box,
} from "@chakra-ui/react"
import { Minus, Plus } from "react-feather"

type BaseAccordionItemProps = { title: string }

export const BaseAccordionItem: React.FC<BaseAccordionItemProps> = ({ title, children }) => {
   return (
      <AccordionItem>
         {({ isExpanded }) => (
            <>
               <AccordionButton
                  role="group"
                  cursor="pointer"
                  _expanded={{ bg: "yellow.100", color: "yellow.700" }}
                  _hover={{ bg: "yellow: 700", color: "yellow.100" }}
               >
                  {isExpanded ? (
                     <Icon as={Minus} color="yellow.700" />
                  ) : (
                     <Icon as={Plus} color="yellow.100" />
                  )}
                  <Heading flex="1" ml={3} textAlign="left" size="md">
                     {title}
                  </Heading>
               </AccordionButton>
               <AccordionPanel bg={isExpanded ? "gray.700" : undefined} pb={2} w="100%">
                  <Box>{children}</Box>
               </AccordionPanel>
            </>
         )}
      </AccordionItem>
   )
}
