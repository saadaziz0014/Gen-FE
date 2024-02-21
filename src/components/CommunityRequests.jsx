import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'
import { BE } from '../constants/constants';

export default function CommunityRequest({ id }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [requests, setRequests] = useState();
    const fetchRequests = async () => {
        const resp = await axios.get(`${BE}community/requests/${id}`);
        setRequests(resp.data.communitiesRequests);
    }
    return (
        <>
            <Button onClick={onOpen} colorScheme='gray'>View Requests</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>All Requests</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='grid grid-cols-3 bg-black text-white p-2'>
                            <h1 className='font-semibold'>Name</h1>
                            <h1 className='font-semibold'>Email</h1>
                            <h1 className='font-semibold'>Action</h1>
                        </div>
                        <div className='grid grid-cols-3'>
                            {requests && requests.map((x) => (
                                <div>
                                    <h2>{x.volunteer.name}</h2>
                                    <h2>{x.volunteer.email}</h2>
                                </div>
                            ))}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}