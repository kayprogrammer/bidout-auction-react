import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const toastFunctions = {
    success: (message) => {
        showToast(message, 'success');
    },
    warning: (message) => {
        showToast(message, 'warning');
    },
    error: (message) => {
        showToast(message, 'error');
    },
};

const showToast = (message, status) => {
    toast({
        title: message,
        status: status,
        duration: 4000,
        isClosable: true,
        position: 'top-right',
    });
};

export default toastFunctions;
