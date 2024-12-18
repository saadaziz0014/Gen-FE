import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BE } from "../constants/constants";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.post(`${BE}auth/login`, { email, password });
    if (resp.status == 201) {
      Cookies.set("role", resp.data.user.role);
      Cookies.set("id", resp.data.user._id);
      Cookies.set("name", resp.data.user.name);
      if (resp.data.user.role == "beneficiary") {
        toast({
          title: `${resp.data.user.role} Logged In`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        navigate("/beneficiary/beneficiary");
      } else if (resp.data.user.role == "volunteer") {
        toast({
          title: `${resp.data.user.role} Logged In`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        navigate("/volunteer/volunteer");
      } else if (resp.data.user.role == "organization") {
        toast({
          title: `${resp.data.user.role} Logged In`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        navigate("/organization/organization");
      } else if (resp.data.user.role == "admin") {
        Cookies.set("adminToken", "genserveadmin");
        toast({
          title: `${resp.data.user.role} Logged In`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        navigate("/admin/adminDashboard");
      } else if (resp.data.user.role == "superAdmin") {
        Cookies.set("adminToken", "genserveadmin");
        toast({
          title: `${resp.data.user.role} Logged In`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        navigate("/admin/adminDashboard");
      }
    } else {
      toast({
        title: `${resp.data.message}`,
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

  return (
    <section className="bg-[#FFFFFF] mt-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-black">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="post"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-start">
                <Link to="/forgetPassword">
                  <p className="text-slate-500 underline">Foget Password</p>
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FDBA74] hover:bg-orange-500 text-black   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/Register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
