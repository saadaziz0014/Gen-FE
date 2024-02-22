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
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoTrashBinSharp } from "react-icons/io5";

import { BE } from "../../constants/constants";

export default function EventModalVol({ id, title }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [events, setEvents] = useState();
    const fetchEvents = async () => {
        const resp = await axios.get(`${BE}event/events/${id}`);
        setEvents(resp.data.events);
    }
    return (
        <>
            <Button onClick={() => { onOpen(); fetchEvents() }}>Events</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title} Community Events</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="grid grid-cols-12 bg-slate-800 p-4">
                            <h1 className="col-span-6 text-xl font-bold text-white">Purpose</h1>
                            <h1 className="col-span-6 text-xl font-bold text-white">Date</h1>
                        </div>
                        {events && events.map((x) => (
                            <div className="grid grid-cols-12 p-4">
                                <h2 className="col-span-6">{x.purpose}</h2>
                                <h2 className="col-span-6">{x.date}</h2>
                            </div>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

}