import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  useToast,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BE } from "../constants/constants";
import Cookies from "js-cookie";
import { useEffect } from "react";

function DonationComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [title, setTitle] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState();
  const [amount, setAmount] = useState();
  const [number, setNumber] = useState();
  const handleAmount = (e) => {
    const onlyNumbersPattern = /^\d*$/;
    setErr(false);
    if (!onlyNumbersPattern.test(e.target.value)) {
      return;
    }
    setAmount(e.target.value);
  };
  const handleNumber = (e) => {
    const numberPattern = /^[0-9]{0,10}$/;
    setErr(false);
    if (!numberPattern.test(e.target.value)) {
      return;
    }
    setNumber(e.target.value);
  };
  const handleSubmit = async () => {
    if (
      message == undefined ||
      title == undefined ||
      amount == undefined ||
      amount == "" ||
      message == "" ||
      title == "" ||
      number == undefined ||
      number == ""
    ) {
      setErr(true);
      return;
    } else {
      const resp = await axios.post(`${BE}donation/makeRequest`, {
        beneficiary: Cookies.get("id"),
        message,
        title,
        amountRequired: amount,
      });
      if (resp.status == 201) {
        toast({
          title: resp.data.message,
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        setMessage();
        setTitle();
        setAmount();
        onClose();
      }
    }
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="green" mt={32}>
        Add Request
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Donation Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={err}>
              <Input
                variant="filled"
                size="md"
                className="my-3"
                placeholder="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErr(false);
                }}
              />
              <Input
                variant="filled"
                size="md"
                className="my-3"
                placeholder="amount"
                value={amount}
                onChange={handleAmount}
              />
              <Input
                variant="filled"
                size="md"
                className="my-3"
                placeholder="jazzcash number"
                value={number}
                onChange={handleNumber}
              />
              <Textarea
                variant="filled"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErr(false);
                }}
              />
              <FormErrorMessage>Fill All Fields</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmit}>
              Add Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DonationComponent;
