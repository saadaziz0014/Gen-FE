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
  Progress,
  Button,
  Flex,
} from "@chakra-ui/react";
import CommunityModal from "../../components/CommunityModal";
import CommunityRequest from "../../components/CommunityRequests";
import EventModal from "../../components/admin/EventModal";

export default function Community() {
  const [communities, setCommunities] = useState();
  const [requests, setRequests] = useState();
  const fetchData = async () => {
    const resp = await axios.get(`${BE}community/our/${Cookies.get("id")}`);
    setCommunities(resp.data.communities);
    const respO = await axios.get(
      `${BE}community/requestO/${Cookies.get("id")}`
    );
    setRequests(respO.data.communitiesRequests);
  };
  useEffect(() => {
    fetchData();
  }, [communities]);
  return (
    <div className="mt-20">
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
            <Card key={x._id}>
              <CardHeader>
                <Heading size="md">{x.title}</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Volunteers
                    </Heading>
                    <Progress hasStripe value={x.value} marginTop={2} />
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
                    <Flex justifyContent="space-between">
                      <Heading size="xs" textTransform="uppercase">
                        <CommunityRequest id={x._id} />
                      </Heading>
                      <Heading size="xs" textTransform="uppercase">
                        <EventModal />
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
