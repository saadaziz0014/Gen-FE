import "./Explore-Services.css";
import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Select, Image } from "@chakra-ui/react";
import profileImage from "../../assets/profile.jpg";
import AboutModal from "../../components/AboutModal";
import BCategory from "../../components/BCategory";
import ReactStars from "react-rating-stars-component";
import { BE } from "../../constants/constants";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";

const ExploreServices = () => {
  const [orgLoc, setOrgLoc] = useState("");
  const [orgCat, setOrgCat] = useState("65bf50f63450b90b4ed5a608");
  const [cat, setCat] = useState();
  const [all, setAll] = useState();
  const fetchData = async () => {
    // const resp = await axios.get("http://localhost:3001/user/allVolunteersU");
    // setVol(resp.data.volunteers);
    // const res = await axios.get("http://localhost:3001/user/allOrganizationsU");
    // setOrg(res.data.organizations);
    const resCat = await axios.get(`${BE}category/all`);
    setCat(resCat.data.categories);
    // org && setAll(org.concat(vol));
    const resp = await axios.get(`${BE}user/allServices`);
    setAll(resp.data.all);
  };
  const handleRating = async (rate, id) => {
    const resp = await axios.post(`${BE}users/addRating/${id}`, {
      rating: rate,
      userId: Cookies.get("id"),
    });
    console.log(resp);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="bg-[url(/services-page-images/service-hero-bg.jpg)] bg-fixed bg-center bg-cover py-32">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomOut}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: 1200 }}
          className="flex gap-10 justify-between items-end max-md:items-center px-10 max-md:px-5 max-md:flex-col"
        >
          <div className="text-white flex flex-col gap-8 max-md:items-center max-md:text-center">
            <h1 className="text-5xl font-bold"> Explore Services</h1>
            <div className="flex items-center gap-24">
              <div>
                <Select
                  variant="flushed"
                  value={orgCat}
                  width={80}
                  onChange={(e) => setOrgCat(e.target.value)}
                >
                  <option
                    value="65bf50f63450b90b4ed5a608"
                    className="text-black"
                  >
                    <h3 className="p-3">All</h3>
                  </option>
                  {cat &&
                    cat.map((c) => (
                      <option value={c._id} key={c._id} className="text-black">
                        <h3 className="p-3">{c.name}</h3>
                      </option>
                    ))}
                </Select>
              </div>
              <div>
                <Input
                  variant="filled"
                  placeholder="Enter Location"
                  value={orgLoc}
                  width={80}
                  onChange={(e) => setOrgLoc(e.target.value)}
                />
              </div>
              <div>
                <BCategory />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-2 gap-2 ml-2">
              {all &&
                all.map((x) => (
                  <div key={x._id}>
                    {x.location.includes(orgLoc) &&
                    x.categories.includes(orgCat) ? (
                      <div className="w-80 rounded-lg shadow-inherit bg-slate-300 border-gray-700 border-2 shadow-lg text-black">
                        <div className="p-3">
                          <div className="flex justify-between">
                            <Image
                              borderRadius="full"
                              boxSize="40px"
                              src={profileImage}
                              alt="Profile"
                            />
                            <h5 className="text-2xl font-bold tracking-tight">
                              {x.firstName}
                            </h5>
                          </div>
                          <div className="flex gap-5 items-center my-3">
                            <h5 className="text-xl font-semibold">
                              {x.role.toUpperCase()}
                            </h5>
                          </div>
                          <div className="flex items-center justify-between">
                            <ReactStars
                              count={5}
                              value={x.ratings}
                              onChange={(newRating) =>
                                handleRating(newRating, x._id)
                              }
                              size={24}
                              activeColor="#ffd700"
                            />
                            <AboutModal user={x} />
                          </div>
                        </div>
                        {/* <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg> */}
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ExploreServices;
