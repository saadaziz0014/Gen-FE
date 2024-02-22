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
    Progress,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BE } from "../../constants/constants";
import { MdDeleteForever } from "react-icons/md";


export default function CommunityMember({ id, title, value }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [members, setMembers] = useState();
    const fetchMembers = async () => {
        const resp = await axios.get(`${BE}community/members/${id}`);
        setMembers(resp.data.volunteers);
    }
    const removeMember = async (volunteer) => {
        onClose();
        const resp = await axios.get(`${BE}community/deleteMember/${id}/${volunteer}`);
        if (resp.status == 201) {
            toast({
                status: "success",
                title: resp.data.message,
                duration: 2000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    zIndex: 9999
                }
            })
        }
    }
    return (
        <>
            <Progress hasStripe value={value} marginTop={2} onClick={() => { onOpen(); fetchMembers() }} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title} Community Members</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="grid grid-cols-12 bg-slate-800 p-4">
                            <h1 className="col-span-6 text-xl font-bold text-white">Email</h1>
                            <h1 className="col-span-4 text-xl font-bold text-white">Contact</h1>
                        </div>
                        {members && members.map((x) => (
                            <div className="grid grid-cols-12 p-4">
                                <h2 className="col-span-6">{x.email}</h2>
                                <h2 className="col-span-4">{x.contact}</h2>
                                <MdDeleteForever className="col-span-2 text-red-600" onClick={() => removeMember(x._id)} />
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