import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    ModalCloseButton,
    Button,
    Textarea,
    Input,
    Flex,
    useToast,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { BE } from '../constants/constants';
import Cookies from 'js-cookie';

export default function CommunityModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const [title, setTitle] = useState("");
    const [allowed, setAllowed] = useState(0);
    const [error, setError] = useState("");
    const [valid, setValid] = useState(false);
    const add = async () => {
        setValid(false);
        setError("");
        if (title.length == 0) {
            setValid(true);
            setError("Title must Provided")
            return;
        }
        if (allowed <= 0) {
            setValid(true);
            setError("Provide Correct Limit");
            return;
        }
        const resp = await axios.post(`${BE}community/add`, {
            title,
            allowed,
            org: Cookies.get('id')
        })
        if (resp.status == 201) {
            onClose();
            toast({
                title: resp.data.message,
                status: "success",
                duration: 2000,
                position: "top",
                isClosable: true,
                containerStyle: {
                    zIndex: 9999,
                },
            });
            setTitle("");
        }
    }
    return (
        <>
            <Button onClick={onOpen} colorScheme='blue'>Add Community</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Community</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isInvalid={valid}>
                            <h1 className='font-semibold'>Enter Title</h1>
                            <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <h1 className='font-semibold'>Enter Limit</h1>
                            <Input type='number' value={allowed} onChange={(e) => setAllowed(e.target.value)} />
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={add}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}