import { TableCaption, TableContainer, Table, Tfoot, Th, Tbody, Td, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";
import { useState } from 'react';
import axios from 'axios';
import { BE } from '../../constants/constants';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import OrgRequestModal from '../../components/OrgRequestModal';


const VolRequest = () => {
    const [requests, setRequests] = useState();
    const fetchData = async () => {
        const resp = await axios.get(`${BE}request/viewRequests/${Cookies.get("id")}`);
        setRequests(resp.data.allRequests);
    }
    useEffect(() => {
        fetchData()
    }, [requests])
    return (
        <div className='bg-gray-900 text-white mt-28 mb-3'>
            <motion.div
                initial="initial"
                whileInView="animate"
                variants={animationVariants.zoomOut}
                viewport={{ once: true, amount: 0.2 }}
                style={{ maxWidth: 1200 }}
            >
                <TableContainer padding={3}>
                    <Table variant='simple'>
                        <TableCaption>List of Requests that You Have Received</TableCaption>
                        <Thead>
                            <Tr>
                                <Th color="white">Beneficiary</Th>
                                <Th color="white">Category</Th>
                                <Th color="white">Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests && requests.map((request) => (
                                <Tr key={request._id}>
                                    <Td>{request.beneficiary.name}</Td>
                                    <Td>{request.category}</Td>
                                    <Td className={`${request.status == "Accepted" ? "text-green-600" : "text-red-600"}`}>{request.status}</Td>
                                    <Td><OrgRequestModal request={request} /></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </motion.div>
        </div>
    )
}

export default VolRequest
