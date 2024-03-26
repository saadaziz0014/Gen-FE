import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Image,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BE } from "../constants/constants";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.jpg";

export default function AboutModal(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isOpenFirst,
    onOpen: onOpenFirst,
    onClose: onCloseFirst,
  } = useDisclosure();
  const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onClose: onCloseSecond,
  } = useDisclosure();
  const [category, setCategory] = useState();
  const [message, setMessage] = useState();
  const [show, setShow] = useState("");
  const [err, setErr] = useState(false);
  const handleDonation = () => {
    navigate(`/beneficiary/donationBen/${props.user._id}`);
  };
  const handleRequest = async () => {
    setShow("Submitting");
    if (message == undefined || category == undefined) {
      setErr(true);
      return;
    }
    setErr(false);
    const resp = await axios.post(`${BE}request/makeRequest`, {
      beneficiary: Cookies.get("id"),
      benefactor: props.user._id,
      message,
      category,
    });
    setShow("");
    if (resp.status == 201) {
      toast({
        title: resp.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      setCategory(undefined);
      setMessage(undefined);
      // onCloseSecond();
      navigate("/beneficiary/beneficiaryRequest");
    } else {
      toast({
        title: resp.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <Button onClick={onOpenFirst} colorScheme="blue">
          About
        </Button>
      </div>

      <Modal isOpen={isOpenFirst} onClose={onCloseFirst}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {props.user.name}
            <Image src={profileImage} rotate="lg" width={28} height={28} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-3">
              <p>
                <strong>About:</strong> {props.user.about}
              </p>
              <p>
                <strong>Phone:</strong> {props.user.contact}
              </p>
              <p>
                <strong>Email:</strong> {props.user.email}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleDonation} mr={3}>
              Donation Request
            </Button>
            <Button
              onClick={() => {
                onCloseFirst();
                onOpenSecond();
              }}
              colorScheme="blue"
            >
              Service Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Second Modal */}
      <Modal isOpen={isOpenSecond} onClose={onCloseSecond}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center">
              <h1 className="text-lg font-semibold">
                Request to {props.user.name}
              </h1>
            </div>
            <FormControl className="flex flex-col gap-2" isInvalid={err}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Catgeory"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErr(false);
                }}
              >
                {props.user.cats.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="other">Other</option>
              </Select>
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErr(false);
                }}
              />
              {err == true ? (
                <FormErrorMessage>Enter all Fields</FormErrorMessage>
              ) : null}
            </FormControl>
            <span className="text-blue-500">{show}</span>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRequest}>
              MAKE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
