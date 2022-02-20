import {
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   Heading,
   Icon,
   VStack,
} from "@chakra-ui/react"
import { Minus, Plus } from "react-feather"

type BaseAccordionItemProps = { title: string }

export const BaseAccordionItem: React.FC<BaseAccordionItemProps> = ({ title, children }) => {
   return (
      <AccordionItem>
         {({ isExpanded }) => (
            <>
               <AccordionButton _expanded={{ bg: "red.100", color: "red.900" }} borderRadius={10}>
                  <Heading flex="1" textAlign="left" size="md" my={1}>
                     {title}
                  </Heading>
                  {isExpanded ? (
                     <Icon as={Minus} color="yellow.900" />
                  ) : (
                     <Icon as={Plus} color="yellow.100" />
                  )}
               </AccordionButton>
               <AccordionPanel pb={4} w="100%">
                  <VStack>{children}</VStack>
               </AccordionPanel>
            </>
         )}
      </AccordionItem>
   )
}
