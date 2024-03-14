import { Button, Input, useToast, Select, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BE } from "../../constants/constants";
import profileImage from '../../assets/profile.jpg'
import Cookies from "js-cookie";
import eyeImage from '../../assets/view.png'


const BeneficiaryProfile = () => {
  const toast = useToast();
  const [err, setErr] = useState(false);
  const [errC, setErrC] = useState(false);
  const [user, setUser] = useState();
  const [cities, setCities] = useState();
  const [city, setCity] = useState();
  const [contact, setContact] = useState();
  const [viewOld, setViewOld] = useState("password");
  const [viewNew, setViewNew] = useState("password");
  const [name, setName] = useState();
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const changeAbout = async () => {
    const resp = await axios.post(`${BE}users/about/${Cookies.get("id")}`, {
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
    contact == undefined && user && setContact(user.contact);
    name == undefined && user && setName(user.name);
    city == undefined && user && setCity(user.location);
  };
  useEffect(() => {
    document.title = "Beneficiaries-Profile - GENServe";
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
    <div className="overflow-hidden mt-28 bg-[url('/hero-bg-image.jpg')] h-[100vh] p-3 bg-top bg-no-repeat bg-cover ">
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
          <Select variant="filled" value={city} placeholder={city} onChange={(e) => setCity(e.target.value)} w={60} _placeholder={{ color: "blue.700" }}
            backgroundColor="white" color="blue">
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
              type={viewOld}
              color="blue"
              _focus={{ backgroundColor: "white" }}
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
              _focus={{ backgroundColor: "white" }}
              name="newPassword"
              type={viewNew}
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
    </div>
  );
};

export default BeneficiaryProfile;
