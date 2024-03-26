import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";
import DonationComponent from "../../components/DonationComponent";
import axios from "axios";
import { BE } from "../../constants/constants";
import Cookies from "js-cookie";
const ReqDontation = () => {
  const [requests, setRequests] = useState();
  const fetchRequests = async () => {
    const resp = await axios.get(
      `${BE}request/myDonationBen/${Cookies.get("id")}`
    );
    setRequests(resp.data.requests);
  };
  useEffect(() => {
    fetchRequests();
  }, [requests]);
  return (
    <div className="bg-gray-900 text-white mt-24">
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={animationVariants.zoomOut}
        viewport={{ once: true, amount: 0.2 }}
        style={{ maxWidth: 1200 }}
      >
        <TableContainer padding={1}>
          <Table variant="simple">
            <TableCaption>Donation Requests</TableCaption>
            <Thead>
              <Tr>
                <Th color="white">Title</Th>
                <Th isNumeric color="white">
                  Amount Required
                </Th>
                <Th isNumeric color="white">
                  Amount Till
                </Th>
                <Th color="white">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests &&
                requests.map((request) => (
                  <Tr key={request._id}>
                    <Td>{request.title}</Td>
                    <Td isNumeric>{request.amount}</Td>
                    <Td isNumeric>{request.amountReceived}</Td>
                    <Td>{request.status}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </motion.div>
    </div>
  );
};

export default ReqDontation;
