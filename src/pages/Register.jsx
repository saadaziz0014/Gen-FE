import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BE } from "../constants/constants";
import "react-autocomplete-input/dist/bundle.css";
import Cookies from "js-cookie";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("Abbotabad");
  const [role, setRole] = useState("beneficiary");
  const [errN, setErrN] = useState({ css: "hidden", message: "" });
  const [errE, setErrE] = useState({ css: "hidden", message: "" });
  const [errP, setErrP] = useState({ css: "hidden", message: "" });
  const [err, setErr] = useState({ css: "hidden", message: "" });
  const [e, setE] = useState({ css: "hidden", message: "" });
  const [cities, setCities] = useState();
  const [submit, setSubmit] = useState();
  const navigate = useNavigate();

  const fetchCities = async () => {
    const resp = await axios.get(`${BE}users/city/loadCities`);
    setCities(resp.data.cities);
    // console.log(cities);
  };

  useEffect(() => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const patternP = /^(?=.*[A-Z]).+$/;
    if (email.length != 0 && !pattern.test(email)) {
      setErrE({ css: "text-red-500", message: "Invalid Email" });
    } else {
      setErrE({ css: "hidden" });
    }
    if (password.length != 0 && !patternP.test(password)) {
      setErrP({
        css: "text-red-500",
        message: "Password contain atleast one character",
      });
    } else {
      setErrP({ css: "hidden" });
    }
  }, [name, email, password, role]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    setE({ message: "Submitting", css: "text-green-500" });
    // const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // const patternP = /^(?=.*[A-Z]).+$/;
    // const patternN = /^[a-zA-Z]+$/;
    // if (!patternN.test(name)) {
    //   return;
    // }
    // if (!pattern.test(email)) {
    //   return;
    // }
    // if (!patternP.test(password)) {
    //   return;
    // }
    // if (role == undefined) {
    //   return;
    // }
    if (submit == false) {
      const resp = await axios.post(`${BE}auth/register`, {
        email,
        password,
        name,
        firstName,
        lastName,
        role,
        location: city,
      });
      if (resp.status == 201) {
        Cookies.set("id", resp.data.user._id);
        setErr({ css: "text-red-500 m-5", message: "Registered" });
        navigate("/otp");
      } else {
        setErr({ css: "text-red-500", message: resp.data.message });
      }
    }
    setSubmit(false);
    setE({ message: "", css: "hidden" });
  };

  return (
    <section className="bg-[#FFFFFF] mt-60 mb-36">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="post"
              onSubmit={handleSubmit}
              onFocus={fetchCities}
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={firstName}
                  onChange={(e) => {
                    const patternN = /^[A-Za-z]+$/;
                    patternN.test(e.target.value) &&
                      setFirstName(e.target.value);
                  }}
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={lastName}
                  onChange={(e) => {
                    const patternN = /^[A-Za-z]+$/;
                    patternN.test(e.target.value) &&
                      setLastName(e.target.value);
                  }}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
                <span className={errE.css}>{errE.message}</span>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  required
                />
                <span className={errN.css}>{errN.message}</span>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option
                    value="beneficiary"
                    selected
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    Beneficiary
                  </option>
                  <option
                    value="volunteer"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    Volunteer
                  </option>
                  <option
                    value="organization"
                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    Organization
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <span className={errP.css}>{errP.message}</span>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  City
                </label>
                <select
                  onChange={(e) => setCity(e.target.value)}
                  className=" border 
                  sm:text-sm rounded-lg focus:ring-primary-600
                  focus:border-primary-600 block w-full p-2.5 bg-gray-700
                  border-gray-600 placeholder-gray-400 text-white
                  focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {cities &&
                    cities.map((city) => (
                      <option
                        key={city._id}
                        value={city.name}
                        className=" border 
                  sm:text-sm rounded-lg focus:ring-primary-600
                  focus:border-primary-600 block w-full p-2.5 bg-gray-700
                  border-gray-600 placeholder-gray-400 text-white
                  focus:ring-blue-500 focus:border-blue-500"
                      >
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white  focus:ring-4 focus:outline-none bg-[#FDBA74]  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-orange-500 focus:ring-primary-800"
              >
                Sign Up
              </button>
              <span className={err.css}>{err.message}</span>
              <span className={e.css}>{e.message}</span>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600  hover:underline text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
