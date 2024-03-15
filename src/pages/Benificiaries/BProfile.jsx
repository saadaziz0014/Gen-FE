import { useEffect, useState, useReducer } from "react";
import { BE } from "../../constants/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

export default function BProfile() {
  const toast = useToast();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [user, setUser] = useState();
  const [err, setErr] = useState(false);
  const [city, setCity] = useState();
  const [about, setAbout] = useState();
  const [contact, setContact] = useState();
  const [history, setHistory] = useState();
  const [errC, setErrC] = useState(false);
  const [name, setName] = useState();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [cities, setCities] = useState();
  const [options, setOptions] = useState([
    {
      text: "Account Settings",
      selected: true,
    },
    {
      text: "Application History",
      selected: false,
    },
  ]);
  const fetchHistory = async () => {
    const resp = await axios.get(`${BE}request/history/${Cookies.get('id')}`);
    setHistory(resp.data.history)
  }
  const fetchData = async () => {
    const resp = await axios.get(`${BE}users/my/${Cookies.get("id")}`);
    setUser(resp.data.user);
    contact == undefined && setContact(resp.data.user.contact);
    setName(resp.data.user.name);
    setCity(resp.data.user.location);
    setAbout(resp.data.user.about);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        id: Cookies.get('id'),
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
  const changeAbout = async (e) => {
    e.preventDefault();
    const resp = await axios.post(`${BE}users/about/${Cookies.get("id")}`, {
      contact,
      name,
      location: city,
      about,
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
  const handleChangeCompo = (index) => {
    let stateY = options;
    if (index == 1) {
      stateY[1].selected = true;
      stateY[0].selected = false;
    } else {
      stateY[0].selected = true;
      stateY[1].selected = false;
    }
    // console.log(stateY)
    setOptions(stateY);
    // console.log(options)
    forceUpdate();
  };
  useEffect(() => {
    fetchData();
    fetchHistory();
    fetchCities();
    const patternP = /^(?=.*[A-Z]).+$/;
    if (data.newPassword.length != 0 && !patternP.test(data.newPassword)) {
      setErr(true);
    } else {
      setErr(false);
    }
    const numberPattern = /^\d{10}$/;
    if (contact && contact.length != 0 && !numberPattern.test(contact)) {
      setErrC(true);
    }
    else {
      setErrC(false)
    }
  }, [data, contact]);
  return (
    <div className="bg-gray-100 mt-16 py-12">
      <div className="grid grid-cols-12 mx-8">
        <div className="col-span-4">
          <h1 className="font-bold text-lg">Hi, {Cookies.get("name")}</h1>
          <hr className="border-black mt-4" />
          <h1 className="font-bold text-2xl mt-2">Personal Settings</h1>
          <div className="flex flex-col mt-2 gap-2">
            {options &&
              options.map((opt, index) => (
                <h1
                  className={`${opt.selected && `border-l border-blue-700`
                    } pl-3 cursor-pointer`}
                  onClick={() => handleChangeCompo(index)}
                  key={index}
                >
                  {opt.text}
                </h1>
              ))}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-7">
          <div className={`${options[0].selected == true ? 'block' : 'hidden'}`}>
            <h1 className="font-bold text-2xl mt-2">Account Settings</h1>
            <hr className="border-black mt-5" />
            <div className="flex gap-2">
              <div className="mt-3">
                <h3 className="text-md font-light inline">Jump To</h3>
                <a
                  href="#Personal"
                  className="inline underline ml-5 text-sky-500"
                >
                  Personal Information
                </a>
                <a href="#Password" className="inline underline ml-2 text-sky-500">
                  Password
                </a>
              </div>
            </div>
            <div className="bg-white p-5 mt-5" id="Personal">
              <h1 className="font-bold text-lg">Personal Information</h1>
              <form action="" method="post" onSubmit={changeAbout}>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border p-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location">Location</label>
                    <select
                      name="city"
                      id="city"
                      placeholder="Cities"
                      className="border p-1"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      {cities &&
                        cities.map((city) => (
                          <option value={city.name} key={city._id}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="text"
                      placeholder="Contact"
                      className="border p-1"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    {errC == true && (
                      <p className="text-red-600 font-medium">Invalid Number</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="about">About</label>
                    <textarea
                      name=""
                      id=""
                      cols="5"
                      rows="10"
                      className="border p-1"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white p-1 rounded-lg mt-2"
                      type="submit"
                    >
                      Update Information
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-white p-5 mt-4" id="Password">
              <h1 className="font-bold text-lg">Password</h1>
              <form action="" method="post" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name">Old Password</label>
                    <input
                      type="password"
                      placeholder="OldPassword"
                      value={data.oldPassword}
                      name="oldPassword"
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact">New Password</label>
                    <input
                      type="password"
                      placeholder="NewPassword"
                      className="border p-1"
                      name="newPassword"
                      value={data.newPassword}
                      onChange={handleChange}
                    />
                    {err == true && (
                      <p className="text-red-600 font-medium">Atleast one capital letter</p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white p-1 rounded-lg mt-2"
                      type="submit"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={`${options[1].selected == true ? 'block' : 'hidden'}`}>
            <h1 className="font-bold text-2xl mt-2">Application History</h1>
            <hr className="border-black mt-5" />
            <div className="flex flex-col gap-2 my-3">
              {history && history.map((hist) => (
                <div className="bg-white rounded-md shadow shadow-inherit p-3" key={hist._id}>
                  <div className="flex justify-between">
                    <p><strong>Category:</strong> {hist.category}</p>
                    <p><strong>Status:</strong> {hist.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}