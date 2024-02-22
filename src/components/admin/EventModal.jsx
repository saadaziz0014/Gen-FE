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

export default function EventModal({ id, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState();
  const toast = useToast();
  const {
    isOpen: isOpenC,
    onOpen: onOpenC,
    onClose: onCloseC,
  } = useDisclosure();
  const fetchEvents = async () => {
    const resp = await axios.get(`${BE}event/community/${id}`);
    setEvents(resp.data.events);
  }
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const handleSend = async () => {
    onClose();
    onOpenC();
  }
  const sendMail = async (eventId) => {
    toast({
      title: "Sending Mail",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
      containerStyle: {
        zIndex: 9999,
      },
    });
    const resp = await axios.get(`${BE}event/mail/${id}/${eventId}`);
    if (resp.status == 201) {
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
    else {
      toast({
        title: resp.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
    onClose()
  }
  const HandleDelete = async (eventId) => {
    onClose()
    const resp = await axios.get(`${BE}event/delete/${eventId}`);
    if (resp.status == 201) {
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
    else {
      toast({
        title: resp.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
  }
  const send = async () => {
    if (purpose.length == 0) {
      setError("Purpose Not Defined")
      setIsInvalid(true);
      return;
    }
    else {
      setIsInvalid(false);
      setError("");
    }
    if (date.length == 0) {
      setError("Date is Missing")
      setIsInvalid(true);
      return;
    }
    else {
      setIsInvalid(false);
      setError("");
    }
    const resp = await axios.post(
      `${BE}event/add`,
      {
        community: id,
        purpose,
        date
      }
    );
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
      setDate("");
      setPurpose("");
    }
  };
  return (
    <>
      <Button onClick={() => { onOpen(); fetchEvents() }}>Manage Events</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title} Community Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-12 bg-slate-800 p-4">
              <h1 className="col-span-4 text-xl font-bold text-white">Purpose</h1>
              <h1 className="col-span-4 text-xl font-bold text-white">Date</h1>
              <h1 className="col-span-4 text-xl font-bold text-white">Action</h1>
            </div>
            {events && events.map((x) => (
              <div className="grid grid-cols-12 p-4">
                <h2 className="col-span-4">{x.purpose}</h2>
                <h2 className="col-span-4">{x.date}</h2>
                <CiMail className="col-span-2 text-blue-600 text-xl" onClick={() => sendMail(x._id)} />
                <IoTrashBinSharp className="col-span-2 text-red-600 text-xl" onClick={() => HandleDelete(x._id)} />
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSend}>
              Add New Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenC}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={isInvalid}>
              <FormLabel>Purpose</FormLabel>
              <Input value={purpose} type="text" onChange={(e) => setPurpose(e.target.value)} />
              <FormLabel>Date</FormLabel>
              <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseC}>
              Close
            </Button>
            <Button variant="ghost" onClick={send}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

}