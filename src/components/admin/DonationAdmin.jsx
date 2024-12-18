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
import Loading from "../Loading";

export default function DonationAdmin({ donation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    onClose();
    onCloseC();
    const resp = await axios.post(
      `${BE}adminDonation/addAmount/${donation._id}`,
      {
        amount,
      }
    );
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
      setAmount(0);
      setLoading(false);
    } else {
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
      setAmount(0);
      setLoading(false);
    }
    onClose();
    onCloseC();
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <FaRegEye
        onClick={() => {
          onOpen();
          onCloseC();
        }}
        color="blue"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{donation.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="font-semibold">Message</h1>
            <Textarea readOnly value={donation.message} />
            <h1 className="font-semibold">Contact Me</h1>
            <Flex gap={2}>
              <Input
                readOnly
                variant="filled"
                value={donation.beneficiary.email}
              />
              <Input
                readOnly
                variant="filled"
                value={donation.beneficiary.contact}
              />
            </Flex>
            <h1 className="font-semibold">Amount Demanded</h1>
            <Input readOnly value={donation.amountRequired} />
            <h1 className="font-semibold">Enter Amount</h1>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
