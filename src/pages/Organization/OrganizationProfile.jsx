import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  useToast,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BE } from "../../constants/constants";
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";
import profileImage from '../../assets/profile.jpg'
import eyeImage from '../../assets/view.png'


const OrganizationProfile = () => {
  const toast = useToast();
  const [err, setErr] = useState(false);
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [errC, setErrC] = useState(false);
  const [cats, setCats] = useState();
  const [about, setAbout] = useState();
  const [user, setUser] = useState();
  const [cities, setCities] = useState();
  const [city, setCity] = useState();
  const [viewOld, setViewOld] = useState("password");
  const [viewNew, setViewNew] = useState("password");
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const fetchCities = async () => {
    const resp = await axios.get(`${BE}users/city/loadCities`);
    setCities(resp.data.cities);
    // console.log(cities);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };
  const changeAbout = async () => {
    const resp = await axios.post(`${BE}users/about/${Cookies.get("id")}`, {
      about,
      contact,
      name,
      location: city
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
    } else {
      toast({
        title: "Failed to Update",
        status: "error",
        isClosable: true,
        duration: 2000,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
  };
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
      const resp = await axios.post(`${BE}auth/changePassword`, {
        email: data.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
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
  const fetchData = async () => {
    const resp = await axios.get(`${BE}users/my/${Cookies.get("id")}`);
    setUser(resp.data.user);
    about == undefined && user && setAbout(user.about);
    contact == undefined && user && setContact(user.contact);
    name == undefined && user && setName(user.name);
    city == undefined && user && setCity(user.location);
    const respCat = await axios.get(`${BE}category/all`);
    setCats(respCat.data.categories);
  };
  const addCategory = async (category) => {
    let ind = user.categories.findIndex((cat) => cat._id == category);
    if (ind != -1) return;
    const resp = await axios.post(`${BE}users/addCategory`, {
      category: category,
      userId: Cookies.get("id"),
    });
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
  };
  const removeCategory = async (category) => {
    const resp = await axios.post(`${BE}users/removeCategory`, {
      category: category,
      userId: Cookies.get("id"),
    });
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
  };
  useEffect(() => {
    fetchData();
    const patternP = /^(?=.*[A-Z]).+$/;
    const numberPattern = /^\d{10}$/;
    if (data.newPassword.length != 0 && !patternP.test(data.newPassword)) {
      setErr(true);
    } else {
      setErr(false);
    }
    if (contact && contact.length != 0 && !numberPattern.test(contact)) {
      setErrC(true);
    }
    else {
      setErrC(false)
    }
  }, [data, user, contact]);
  return (
    <div className="overflow-hidden mt-32 p-3 bg-[url('/hero-bg-image.jpg')] bg-top bg-no-repeat bg-cover ">
      <div className="flex justify-between mx-8" onFocus={fetchCities}>
        <Image
          borderRadius='full'
          boxSize='150px'
          src={profileImage}
          alt='Profile'
        />
        <div className="flex flex-col gap-3 mt-3">
          <Input variant="filled" w={60} size="md" color="blue" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input variant="filled" w={60} size="md" color="blue" placeholder="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
          {errC == true && (
            <p className="text-red-600 font-medium">Invalid Number</p>
          )}
          <Select variant="filled" value={city} placeholder={city} _placeholder={{ color: "blue.700" }}
            backgroundColor="white" color="blue" onChange={(e) => setCity(e.target.value)} w={60}>
            {cities && cities.map((city) => (
              <option key={city._id} value={city.name}>{city.name}</option>
            ))}
          </Select>
          <Button colorScheme="blue" w={60} onClick={changeAbout}>
            Change About
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-lg font-medium text-white">Change Password</h1>
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
              color="blue"
              name="oldPassword"
              value={data.oldPassword}
              onChange={handleChange}
            />
            <Image src={eyeImage} w={5} position="absolute" left="58%" marginTop={3} onMouseDown={() => setViewOld("text")} onMouseUp={() => setViewOld("password")} />
          </div>
          <div className="flex">
            <Input
              variant="filled"
              w={60}
              size="md"
              color="blue"
              placeholder="new password"
              name="newPassword"
              type={viewNew}
              _focus={{ backgroundColor: "white" }}
              value={data.newPassword}
              onChange={handleChange}
            />
            <Image src={eyeImage} w={5} position="absolute" left="58%" marginTop={3} onMouseDown={() => setViewNew("text")} onMouseUp={() => setViewNew("password")} />
          </div>
          {err == true && (
            <p className="text-red-600 font-medium">Atleast one capital letter</p>
          )}
          <Button colorScheme="blue" w={60} onClick={handleSubmit}>
            Change Password
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-lg font-medium text-white mt-5">About Me</h1>
      </div>
      <div className="flex justify-center">
        <Textarea
          margin={5}
          value={about}
          name="about"
          backgroundColor="white"
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <Button colorScheme="blue" onClick={changeAbout}>
          Change
        </Button>
      </div>
      <div className="flex justify-center mt-8">
        <h1 className="text-lg font-medium text-white">Categories</h1>
      </div>
      <div className="flex justify-center mt-8">
        <Select
          placeholder="Select Category"
          _placeholder={{ color: "blue.700" }}
          backgroundColor="white"
          onChange={(e) => addCategory(e.target.value)}
        >
          {cats &&
            cats.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
        </Select>
      </div>
      <Flex gap={5} mx={5} my={4}>
        {user &&
          user.categories.map((cat) => (
            <Box
              key={cat._id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg="blue.600"
            >
              <div className="flex justify-end">
                <MdDelete
                  className="text-red-400 text-lg cursor-pointer"
                  onClick={() => removeCategory(cat._id)}
                />
              </div>
              <h1 className="text-lg font-semibold text-white mt-2">
                {cat.name}
              </h1>
            </Box>
          ))}
      </Flex>
    </div >
  );
};

export default OrganizationProfile;
