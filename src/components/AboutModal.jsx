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
  Textarea,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { BE } from '../constants/constants';
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutModal(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen: isOpenFirst, onOpen: onOpenFirst, onClose: onCloseFirst } = useDisclosure();
  const { isOpen: isOpenSecond, onOpen: onOpenSecond, onClose: onCloseSecond } = useDisclosure();
  const [category, setCategory] = useState();
  const [message, setMessage] = useState();
  const [err, setErr] = useState(false);
  const handleRequest = async () => {
    if (message == undefined || category == undefined) {
      setErr(true);
      return;
    }
    setErr(false)
    const resp = await axios.post(`${BE}request/makeRequest`, {
      beneficiary: Cookies.get("id"),
      benefactor: props.user._id,
      message,
      category
    });
    if (resp.status == 201) {
      toast({
        title: resp.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999
        }
      });
      setCategory(undefined);
      setMessage(undefined);
      onCloseSecond();
      navigate("/beneficiary/beneficiaryRequest")
    }
  }
  return (
    <>
      <Button onClick={onOpenFirst}>About US</Button>

      <Modal isOpen={isOpenFirst} onClose={onCloseFirst}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center">
              <h1 className="text-lg font-semibold">About</h1>
            </div>
            <div className="flex justify-center">
              <p className="font-normal mt-2">{props.user.about}</p>
            </div>
            <div className="flex justify-center">
              <h1 className="text-lg font-semibold">Contact</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="font-serif">Phone: {props.user.contact}</h1>
              <h1 className="font-serif">Email: {props.user.email}</h1>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { onCloseFirst(); onOpenSecond() }} colorScheme='blue'>Request</Button>
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
              <h1 className="text-lg font-semibold">Request to {props.user.name}</h1>
            </div>
            <FormControl className="flex flex-col gap-2" isInvalid={err}>
              <FormLabel>Category</FormLabel>
              <Select placeholder='Select Catgeory' value={category} onChange={(e) => { setCategory(e.target.value); setErr(false) }}>
                <option value="donation">Donation</option>
                {props.user.cats.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
                <option value="other">Other</option>
              </Select>
              <Textarea placeholder='Your Message' value={message} onChange={(e) => { setMessage(e.target.value); setErr(false) }} />
              {err == true ? <FormErrorMessage>Enter all Fields</FormErrorMessage> : null}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleRequest}>
              MAKE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

}
