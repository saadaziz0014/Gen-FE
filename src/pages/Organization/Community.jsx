import axios from "axios";
import { useEffect, useState } from "react";
import { BE } from "../../constants/constants";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  StackDivider,
  Box,
  Text,
  Stack,
  Image,
  Flex,
} from "@chakra-ui/react";
import CommunityModal from "../../components/CommunityModal";
import CommunityRequest from "../../components/CommunityRequests";
import EventModal from "../../components/admin/EventModal";
import { communityOrg } from "../../components/Assets";
import CommunityMember from "../../components/admin/CommunityMember";

export default function Community() {
  const [communities, setCommunities] = useState();
  const [requests, setRequests] = useState();
  const fetchData = async () => {
    const resp = await axios.get(`${BE}community/our/${Cookies.get("id")}`);
    setCommunities(resp.data.communities);
    const respO = await axios.get(
      `${BE}community/requestsO/${Cookies.get("id")}`
    );
    setRequests(respO.data.communitiesRequests);
  };
  useEffect(() => {
    fetchData();
  }, [communities, requests]);
  return (
    <div className="mt-20 bg-neutral-300 p-4">
      <div
        className="flex justify-center"
        style={{
          backgroundImage: `url(/services-page-images/service-hero-bg.jpg)`,
        }}
      >
        <h1 className="text-white font-semibold p-4">Community Engagement</h1>
      </div>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">Our Communities</h1>
      </div>
      <div className="flex justify-end">
        <CommunityModal />
      </div>
      <div className="grid grid-cols-3 my-4">
        {communities &&
          communities.map((x) => (
            <Card key={x._id} maxW="sm" width={80} marginBottom={5}>
              <CardHeader>
                <Heading size="md">{x.title}</Heading>
              </CardHeader>

              <CardBody>
                <Flex justifyContent="center">
                  <Image
                    src={communityOrg}
                    alt="Community"
                    borderRadius="md"
                    objectFit="contain"
                    width={24}
                    height={24}
                  />
                </Flex>
                <Stack divider={<StackDivider />} spacing="2">
                  <Box marginTop={5}>
                    <Heading size="xs" textTransform="uppercase">
                      Volunteers
                    </Heading>
                    <CommunityMember
                      id={x._id}
                      title={x.title}
                      value={x.value}
                    />
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Requests
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {x.requests}
                    </Text>
                  </Box>
                  <Box>
                    <Flex gap={2}>
                      <Heading size="xs" textTransform="uppercase">
                        <CommunityRequest id={x._id} />
                      </Heading>
                      <Heading size="xs" textTransform="uppercase">
                        <EventModal id={x._id} title={x.title} />
                      </Heading>
                    </Flex>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
