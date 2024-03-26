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
    Flex,
    useToast,
    Input
} from '@chakra-ui/react'
import axios from 'axios';

import { IoMdEye } from "react-icons/io";
import { BE } from '../constants/constants';

export default function OrgRequestModal({ request }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const { isOpen: isOpenC, onOpen: onOpenC, onClose: onCloseC } = useDisclosure()
    const handleSend = async () => {
        onClose();
        onOpenC();
    }
    const send = async (decision) => {
        const resp = await axios.get(`${BE}request/decideRequest/${request._id}`, { params: { decision } })
        if (resp.status == 201) {
            onClose();
            onCloseC();
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
        }
    }
    return (
        <>
            <IoMdEye onClick={() => { onOpen(); onCloseC() }} color='blue' />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{request.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <h1 className='font-semibold'>Message</h1>
                        <Textarea readOnly value={request.message} />
                        <h1 className='font-semibold'>Contact Me</h1>
                        <Flex gap={2}>
                            <Input readOnly variant="filled" value={request.beneficiary.email} />
                            <Input readOnly variant="filled" value={request.beneficiary.contact} />
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {request.status == "Pending" && <Button variant='ghost' onClick={handleSend}>Decide</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenC}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Decision</ModalHeader>
                    <ModalCloseButton onClick={() => { onCloseC(); onClose() }} />
                    <Flex justifyContent="center" marginBottom={6}>
                        <Flex columnGap={2}>
                            <Button color="white" backgroundColor="blue.500" _hover={{ backgroundColor: "blue.600" }} onClick={() => send("Accepted")}>Accept</Button>
                            <Button color="white" backgroundColor="red.500" _hover={{ backgroundColor: "red.600" }} onClick={() => send("Rejected")}>Reject</Button>
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal >
        </>
    )
}