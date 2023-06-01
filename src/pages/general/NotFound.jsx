import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Box padding={20}>
            <Box textAlign='center'>
                <Heading color='rgb(220, 53, 69)' fontSize={300}>404</Heading>
                <Text fontWeight='bold'>Oops! You seem to be lost.</Text>
                <Link to='/'><Text fontWeight='bold' color='blue'>Back to Home</Text></Link>
            </Box>
        </Box>
    )
}

export default NotFound;