import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BE } from "../../constants/constants";
import Cookies from "js-cookie";

export default function DonationBen() {
  const toast = useToast();
  const params = useParams();
  const [title, setTitle] = useState();
  const [dialer, setDialer] = useState();
  const [amount, setAmount] = useState();
  const [reason, setReason] = useState();
  const [number, setNumber] = useState();
  const [iName, setIName] = useState();
  const [iCNIC, setICNIC] = useState();
  const [iPhone, setIPhone] = useState();
  const [iAddress, setIAddress] = useState();
  const [cName, setCName] = useState();
  const [cCNIC, setCCNIC] = useState();
  const [cPhone, setCPhone] = useState();
  const [cAddress, setCAddress] = useState();
  const [valid, setValid] = useState(true);
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const submitRequest = async () => {
    setValid(true);
    setErr("");
    if (
      !title ||
      !amount ||
      !reason ||
      !iName ||
      !iCNIC ||
      !iPhone ||
      !iAddress ||
      !cName ||
      !cCNIC ||
      !cPhone ||
      !cAddress ||
      !number
    ) {
      setValid(false);
      setErr("Fill All Details");
      return;
    }
    let guranterCounciler = {
      name: cName,
      cnic: cCNIC,
      address: cAddress,
      phone: cPhone,
    };
    let guranterImam = {
      name: iName,
      cnic: iCNIC,
      address: iAddress,
      phone: iPhone,
    };
    const resp = await axios.post(`${BE}request/addDonationBen`, {
      title,
      amount,
      reason,
      guranterCounciler,
      guranterImam,
      beneficiary: Cookies.get("id"),
      benefactor: params.id,
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
      navigate("/beneficiary/beneficiaryExplore");
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
  };
  const fetchDialer = async () => {
    const resp = await axios.get(`${BE}users/dialer/load`);
    setDialer(resp.data.dialers);
  };
  useEffect(() => {
    fetchDialer();
  }, []);
  return (
    <>
      <div className="bg-white mt-16 py-12">
        <div className="flex justify-center">
          <h1 className="text-xl font-serif">Donation Request</h1>
        </div>
        <div className="mx-5">
          <div className="flex justify-start">
            <h1 className="font-bold text-lg my-3">Donation Information</h1>
          </div>
          <FormControl isInvalid={!valid}>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor="title">Title: </label>
                <Input
                  variant="filled"
                  size="md"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    const patter = /^[A-Za-z ]*$/;
                    patter.test(e.target.value)
                      ? setTitle(e.target.value)
                      : null;
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="amount">Amount: </label>
                <Input
                  variant="filled"
                  size="md"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => {
                    const patter = /^[0-9]{0,2000000}$/;
                    patter.test(e.target.value) && setAmount(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex flex-col gap-3">
                <label htmlFor="reason">Reason:</label>
                <Textarea
                  variant="filled"
                  size="md"
                  width={80}
                  height={36}
                  placeholder="Details Here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="number">Jazzcash Number:</label>
                <Input
                  variant="filled"
                  size="md"
                  placeholder="Jazzcash Number"
                  value={number}
                  onChange={(e) => {
                    const pattern = /^[0-9]{0,10}$/;
                    pattern.test(e.target.value) && setNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <hr className="mt-5 border-black mx-10" />
            <div className="flex justify-start">
              <h1 className="font-bold text-lg my-3">
                Guranter Imam Information
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="iName">Name: </label>
                  <Input
                    variant="filled"
                    size="md"
                    placeholder="Full Name"
                    value={iName}
                    onChange={(e) => {
                      const patter = /^[A-Za-z ]*$/;
                      patter.test(e.target.value) && setIName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="iCnic">CNIC: </label>
                  <Input
                    variant="filled"
                    size="md"
                    placeholder="1234567890123"
                    value={iCNIC}
                    onChange={(e) => {
                      const patter = /^[0-9]{0,13}$/;
                      patter.test(e.target.value) && setICNIC(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="iPhone">Phone: </label>
                  <div className="flex gap-2">
                    {/* <select name="" id="">
                        {dialer &&
                          dialer.map((dialer) => (
                            <option value={dialer.dial_code} key={dialer._id}>
                              {dialer.dial_code}
                            </option>
                          ))}
                      </select> */}
                    <input type="text" className="w-8" placeholder="+92" />
                    <Input
                      variant="filled"
                      size="md"
                      placeholder="Phone"
                      value={iPhone}
                      onChange={(e) => {
                        const patter = /^[0-9]{0,10}$/;
                        patter.test(e.target.value) &&
                          setIPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="iAddress">Address: </label>
                  <Input
                    variant="filled"
                    size="md"
                    placeholder="Address"
                    value={iAddress}
                    onChange={(e) => setIAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr className="mt-5 border-black mx-10" />
            <div className="flex justify-start">
              <h1 className="font-bold text-lg my-3">
                Guranter Counciler Information
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="iName">Name: </label>
                  <Input
                    variant="filled"
                    size="md"
                    placeholder="Full Name"
                    value={cName}
                    onChange={(e) => {
                      const patter = /^[A-Za-z ]*$/;
                      patter.test(e.target.value) && setCName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="iCnic">CNIC: </label>
                  <Input
                    variant="filled"
                    size="md"
                    placeholder="1234567890123"
                    value={cCNIC}
                    onChange={(e) => {
                      const patter = /^[0-9]{0,13}$/;
                      patter.test(e.target.value) && setCCNIC(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="iPhone">Phone: </label>
                  <div className="flex gap-2">
                    {/* <select name="" id="">
                        {dialer &&
                          dialer.map((dialer) => (
                            <option value={dialer.dial_code} key={dialer._id}>
                              {dialer.dial_code}
                            </option>
                          ))}
                      </select> */}
                    <input type="text" className="w-8" placeholder="+92" />
                    <Input
                      variant="filled"
                      size="md"
                      placeholder="Phone"
                      value={cPhone}
                      onChange={(e) => {
                        const patter = /^[0-9]{0,10}$/;
                        patter.test(e.target.value) &&
                          setCPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="iAddress">Address: </label>
                  <Input
                    variant="filled"
                    size="md"
                    placeholder="Address"
                    value={cAddress}
                    onChange={(e) => setCAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <FormErrorMessage>{err}</FormErrorMessage>
            </div>
            <div className="flex justify-end mt-10">
              <Button colorScheme="blue" onClick={submitRequest}>
                Send Request
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
    </>
  );
}
