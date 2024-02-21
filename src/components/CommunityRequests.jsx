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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BE } from "../constants/constants";

export default function CommunityRequest({ id }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requests, setRequests] = useState();
  const fetchRequests = async () => {
    const resp = await axios.get(`${BE}community/requests/${id}`);
    setRequests(resp.data.communitiesRequests);
  };
  const decideRequest = async (decision, reqId) => {
    const resp = await axios.post(`${BE}community/decideRequest/${reqId}`, {
      decision,
    });
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
      onClose();
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          fetchRequests();
        }}
        colorScheme="gray"
      >
        View Requests
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Requests</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-12 bg-black text-white p-2">
              <h1 className="font-semibold col-span-9">Email</h1>
              <h1 className="font-semibold col-span-3">Action</h1>
            </div>
            {requests &&
              requests.map((x) => (
                <div className="grid grid-cols-12 p-2 bg-slate-600 text-white">
                  <h2 className="font-norma col-span-8">{x.volunteer.email}</h2>
                  <button
                    className="col-span-2 bg-green-600 rounded-lg"
                    onClick={() => decideRequest("Accepted", x._id)}
                  >
                    Y
                  </button>
                  <button
                    className="col-span-2 bg-red-600 rounded-lg"
                    onClick={() => decideRequest("Rejected", x._id)}
                  >
                    N
                  </button>
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
