import React, { useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import { Button, Input, Image, useToast, Box } from "@chakra-ui/react";
import eyeImage from "../../assets/view.png";
import axios from "axios";

const Settings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [err, setErr] = useState(false);
  const toast = useToast();
  const [viewOld, setViewOld] = useState("password");
  const [viewNew, setViewNew] = useState("password");
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const handleSubmit = async () => {
    if (err == true) {
      toast({
        title: "Password not correct",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    } else if (data.email.length == 0) {
      toast({
        title: "Provide Email",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    } else if (data.oldPassword.length == 0) {
      toast({
        title: "Provide Old Password",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    } else {
      const resp = await axios.post(
        `http://localhost:3001/auth/changePassword`,
        {
          email: data.email,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }
      );
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
        setData({
          email: "",
          oldPassword: "",
          newPassword: "",
        });
      } else {
        toast({
          title: resp.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
      }
    }
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-screen bg-gray-200 text-gray-500 ${
          showMenu ? "" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <Navbar pagename={"Settings"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div className="flex justify-center">
          <h1 className="text-lg font-medium text-black">Change Password</h1>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex flex-col gap-2 ml-5">
            <Input
              variant="filled"
              w={60}
              size="md"
              placeholder="email"
              name="email"
              color="blue"
              _focus={{ backgroundColor: "white" }}
              value={data.email}
              onChange={handleChange}
            />
            <div className="flex">
              <Input
                variant="filled"
                w={60}
                size="md"
                placeholder="old password"
                _focus={{ backgroundColor: "white" }}
                type={viewOld}
                name="oldPassword"
                value={data.oldPassword}
                onChange={handleChange}
              />
              <Image
                src={eyeImage}
                w={5}
                position="absolute"
                left="68%"
                marginTop={3}
                onMouseDown={() => setViewOld("text")}
                onMouseUp={() => setViewOld("password")}
              />
            </div>
            <div className="flex">
              <Input
                variant="filled"
                w={60}
                size="md"
                placeholder="new password"
                name="newPassword"
                type={viewNew}
                _focus={{ backgroundColor: "white" }}
                value={data.newPassword}
                onChange={handleChange}
              />
              <Image
                src={eyeImage}
                w={5}
                position="absolute"
                left="68%"
                marginTop={3}
                onMouseDown={() => setViewNew("text")}
                onMouseUp={() => setViewNew("password")}
              />
            </div>
            {err == true && (
              <p className="text-red-600 font-medium">
                Atleast one capital letter
              </p>
            )}
            <Button colorScheme="blue" w={60} onClick={handleSubmit}>
              Change Password
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <Box bg="blue.600" w="100%" p={4} color="white" margin={12}>
            We believe in creating a positive impact by fostering connections
            and empowering individuals. Our mission is to provide a supportive
            environment where people can thrive together.
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Settings;
