import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from "./components/Header"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Header />
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;


// import { useState } from "react";
// import { Box, Flex, Button, Text, useMediaQuery } from "@chakra-ui/react";


// import { HamburgerIcon } from '@chakra-ui/icons';

// export const Header = () => {
//   const [selectedMenu, setSelectedMenu] = useState("home");
//   const [isSmallerThan991] = useMediaQuery("(max-width: 991px)");
//   const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleSelectMenu = (menu) => {
//     setSelectedMenu(menu);
//     setIsMenuOpen(false);
//   };

//   return (
//     <Flex
//       justify="space-between"
//       align="center"
//       bg="white"
//       px={10}
//       py={4}
//       position={isSmallerThan991 && "fixed"}
//       top={isSmallerThan991 && 0}
//       w="100%"
//       zIndex={999}
//       boxShadow={isSmallerThan991 && "md"}
//     >
//       <Box display={{ base: "block", md: "none" }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         <svg fill="gray" width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <title>Menu</title>
//           <path d="M3 6h14v2H3zm0 4h14v2H3zm0 4h14v2H3z" />
//         </svg>
//       </Box>
//       <Box display={{ base: "none", md: "block" }}>
//         <Text fontSize="lg" fontWeight="bold" color="gray.700">
//           My Website
//         </Text>
//       </Box>
//       <Box display={{ base: isMenuOpen ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
//         <Flex
//           direction={{ base: "column", md: "row" }}
//           align={{ base: "center", md: "center" }}
//           justify={{ base: "center", md: "flex-end" }}
//         >
//           <Button colorScheme={selectedMenu === "home" ? "blue" : "gray"} mr={{ base: 0, md: 2 }} mb={{ base: 2, md: 0 }} w="100%" onClick={() => handleSelectMenu("home")}>Home</Button>
//           <Button colorScheme={selectedMenu === "about" ? "blue" : "gray"} mr={{ base: 0, md: 2 }} mb={{ base: 2, md: 0 }} w="100%" onClick={() => handleSelectMenu("about")}>About</Button>
//           <Button colorScheme={selectedMenu === "contact" ? "blue" : "gray"} w="100%" onClick={() => handleSelectMenu("contact")}>Contact</Button>
//           {isSmallerThan500 && (
//             <Button mt={2} colorScheme="blue" w="100%" onClick={() => console.log("Logout")}>Logout</Button>
//           )}
//         </Flex>
//       </Box>
//     </Flex>
//   )
// }
