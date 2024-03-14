import { TableCaption, TableContainer, Table, Tfoot, Th, Tbody, Td, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";
import { useState } from 'react';
import axios from 'axios';
import { BE } from '../../constants/constants';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


const Request = () => {
    const [requests, setRequests] = useState();
    const fetchData = async () => {
        const resp = await axios.get(`${BE}request/myRequests/${Cookies.get("id")}`);
        setRequests(resp.data.requests);
    }
    useEffect(() => {
        fetchData()
    }, [])
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
                        <TableCaption>List of Requests that You Have Sent</TableCaption>
                        <Thead>
                            <Tr>
                                <Th color="white">Benefactor</Th>
                                <Th color="white">Role</Th>
                                <Th color="white">Category</Th>
                                <Th color="white">Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests && requests.map((request) => (
                                <Tr key={request._id}>
                                    <Td>{request.benefactor.name}</Td>
                                    <Td>{request.benefactor.role}</Td>
                                    <Td>{request.category}</Td>
                                    <Td className={`${request.status == "Accepted" ? "text-green-600" : "text-red-600"}`}>{request.status}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </motion.div>
        </div>
    )
}

export default Request
