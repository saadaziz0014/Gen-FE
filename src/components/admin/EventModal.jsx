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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import { FaRegEye } from "react-icons/fa6";
import { BE } from "../../constants/constants";

export default function EventModal({ donation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    isOpen: isOpenC,
    onOpen: onOpenC,
    onClose: onCloseC,
  } = useDisclosure();
  const [amount, setAmount] = useState(0);
  const handleSend = async () => {
    if (amount <= 0) {
      toast({
        title: "Payment Failed, Bad Value",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
      return;
    }
    onClose();
    onOpenC();
  };
  const send = async () => {
    const resp = await axios.post(
      `${BE}adminDonation/addAmount/${donation._id}`,
      {
        amount,
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
      setAmount(0);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>Manage Events</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>K</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSend}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenC}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
