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
import { BE } from "../constants/constants";
import Cookies from "js-cookie";
import Loading from "./Loading";

export default function DonationBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isOpenC,
    onOpen: onOpenC,
    onClose: onCloseC,
  } = useDisclosure();
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
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
    if (number.length != 10) {
      toast({
        title: "Payment Failed, Bad Number",
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
    setLoading(true);
    onClose();
    onCloseC();
    const resp = await axios.post(`${BE}donation/add`, {
      amount,
      number,
      userId: Cookies.get("id"),
    });
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
      setNumber("");
      setLoading(false);
    } else {
      onClose();
      onCloseC();
      toast({
        title: "Payment Failed",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
      setAmount(0);
      setNumber("");
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          onCloseC();
        }}
        backgroundColor={"#FB923C"}
        color="white"
        _hover={{ backgroundColor: "#F6B548", color: "white" }}
      >
        Make Donation
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Donation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="font-semibold">Enter Amount</h1>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <h1 className="font-semibold">Enter Jazzcash Number</h1>
            <Input
              type="text"
              value={number}
              onChange={(e) => {
                const numberPattern = /^[0-9]{0,10}$/;
                if (numberPattern.test(e.target.value)) {
                  setNumber(e.target.value);
                }
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              _hover={{ backgroundColor: "#F6B548", color: "white" }}
              backgroundColor={"#FB923C"}
              color="white"
              onClick={handleSend}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenC}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <Flex justifyContent="center" marginBottom={6}>
            <Flex columnGap={2}>
              <Button
                color="white"
                backgroundColor="blue.500"
                disabled={loading}
                _hover={{ backgroundColor: "blue.600" }}
                onClick={() => {
                  onCloseC();
                  onOpen();
                }}
              >
                Close
              </Button>
              <Button
                color="white"
                backgroundColor="red.500"
                disabled={loading}
                _hover={{ backgroundColor: "red.600" }}
                onClick={send}
              >
                Yes
              </Button>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
