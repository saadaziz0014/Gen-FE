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

export default function DonationBenefactor({ donation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState();
  const {
    isOpen: isOpenC,
    onOpen: onOpenC,
    onClose: onCloseC,
  } = useDisclosure();
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState();
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
    onCloseC();
    onClose();
    setLoading(true);
    const resp = await axios.post(`${BE}request/sendDonation/${donation._id}`, {
      amount,
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
    }
  };
  return (
    <>
      <Button
        colorScheme="white"
        onClick={() => {
          onOpen();
        }}
      >
        Make Payment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{donation.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="font-semibold">Message</h1>
            <Textarea readOnly value={donation.reason} />
            <h1 className="font-semibold">Amount Demanded</h1>
            <Input readOnly value={donation.amount} />
            <h1 className="font-semibold">Enter Amount</h1>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <h1 className="font-semibold">JazzCash Number</h1>
            <Input
              type="number"
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
          <Flex justifyContent="center" marginBottom={6}>
            <Flex columnGap={2}>
              <Button
                color="white"
                backgroundColor="blue.500"
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
