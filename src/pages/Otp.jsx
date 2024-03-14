import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BE } from "../constants/constants";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
export default function Otp() {
    const toast = useToast();
    const [otp, setOtp] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.post(`${BE}auth/otp`, {
            id: Cookies.get('id'),
            otp
        });
        if (resp.status == 201) {
            toast({
                title: `${resp.data.message}`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    zIndex: 9999,
                },
            });
            navigate("/login")
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
        <section className="bg-[#FFFFFF] mt-12">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Enter OTP
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            method="post"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    placeholder="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-400 hover:bg-blue-600 text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}