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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BE } from "../constants/constants";
import Cookies from "js-cookie";

function BCategory() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [name, setName] = useState("");
    const handleSubmit = async () => {
        if (name.length == 0) {
            toast({
                title: "Name Can't Empty",
                status: "error",
                isClosable: true,
                duration: 2000,
                position: "top",
                containerStyle: {
                    zIndex: 9999,
                },
            });
        } else {
            const resp = await axios.post(`${BE}categoryRequest/add`, {
                name,
                id: Cookies.get("id")
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
                setName("");
                onClose();
            }
        }
    };
    return (
        <>
            <Button onClick={onOpen} colorScheme="blue" m={5}>
                Add Category Request
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            variant="filled"
                            size="md"
                            placeholder="Name of Category"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Add Category
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default BCategory;
