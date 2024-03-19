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
    useToast
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';

import { FaRegEye } from "react-icons/fa6";
import { BE } from '../../constants/constants';

export default function ViewBenReq({ donation }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <FaRegEye onClick={() => { onOpen(); onCloseC() }} color='blue' />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{donation.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justifyContent="center">
                            <h1>Donation Information</h1>
                        </Flex>
                        <div>
                            <Flex flexDirection="column" gap={2}>
                                <h1>Amount: {donation.amount}</h1>
                                <h1>Reason: {donation.reason}</h1>
                            </Flex>
                        </div>
                        <Flex justifyContent="center">
                            <h1>Guranter Imam Information</h1>
                        </Flex>
                        <div>
                            <Flex justifyContent="space-between">
                                <h1>Name: {donation.guranterImam.name}</h1>
                                <h1>CNIC: {donation.guranterImam.cnic}</h1>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <h1>Phone: {donation.guranterImam.phone}</h1>
                                <h1>Address: {donation.guranterImam.address}</h1>
                            </Flex>
                        </div>
                        <Flex justifyContent="center">
                            <h1>Guranter Counciler Information</h1>
                        </Flex>
                        <div>
                            <Flex justifyContent="space-between">
                                <h1>Name: {donation.guranterCounciler.name}</h1>
                                <h1>CNIC: {donation.guranterCounciler.cnic}</h1>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <h1>Phone: {donation.guranterCounciler.phone}</h1>
                                <h1>Address: {donation.guranterCounciler.address}</h1>
                            </Flex>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}