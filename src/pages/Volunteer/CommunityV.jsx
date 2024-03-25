import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BE } from "../../constants/constants";
import { community } from "../../components/Assets";
import Cookies from "js-cookie";
import EventModalVol from "../../components/admin/EventModalVol";
export default function CommunityV() {
  const toast = useToast();
  const [communities, setCommunities] = useState();
  const [text, setText] = useState("Request");
  const fetchData = async () => {
    const resp = await axios.get(`${BE}community/all`);
    setCommunities(resp.data.communities);
  };
  const handleRequest = async (org, id) => {
    if (text == "Requesting") return;
    setText("Requesting");
    const resp = await axios.post(`${BE}community/addRequest`, {
      organization: org,
      volunteer: Cookies.get("id"),
      community: id,
    });
    if (resp.status == 201) {
      toast({
        title: resp.data.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
    } else {
      toast({
        title: resp.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
    setText("Request");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="mt-32"
      style={{
        backgroundImage: `url(/services-page-images/service-hero-bg.jpg)`,
      }}
    >
      <div className="flex justify-center">
        <h1 className="text-lg font-bold text-white my-5">All Communities</h1>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {communities &&
          communities.map((x) => (
            <Card key={x._id} marginBottom={4} width={72}>
              <CardBody>
                <Image
                  src={community}
                  alt="Community"
                  width={56}
                  height={56}
                  borderRadius="md"
                />
                <div className="flex justify-center">
                  <h1 className="m-2 font-medium text-lg">{x.title}</h1>
                </div>
                <div className="flex justify-around">
                  <h1>Members</h1>
                  <h2>
                    {x.volunteers.length} / {x.allowed}
                  </h2>
                </div>
                <div className="flex justify-center mt-5">
                  {x.volunteers.length < x.allowed &&
                    !x.volunteers.includes(Cookies.get("id")) && (
                      <Button
                        colorScheme="blue"
                        marginTop={2}
                        onClick={() => handleRequest(x.org, x._id)}
                      >
                        {text}
                      </Button>
                    )}
                  {x.volunteers.includes(Cookies.get("id")) && (
                    <EventModalVol id={x._id} title={x.title} />
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
