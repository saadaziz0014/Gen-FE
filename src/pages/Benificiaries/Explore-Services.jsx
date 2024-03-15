import "./Explore-Services.css";
import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Select, Image } from "@chakra-ui/react";
import profileImage from '../../assets/profile.jpg'

import AboutModal from "../../components/AboutModal";
import BCategory from "../../components/BCategory";
const ExploreServices = () => {
  const [org, setOrg] = useState();
  const [vol, setVol] = useState();
  const [orgLoc, setOrgLoc] = useState("");
  const [orgCat, setOrgCat] = useState("65bf50f63450b90b4ed5a608");
  const [cat, setCat] = useState();
  const [volCat, setVolCat] = useState("65bf50f63450b90b4ed5a608");
  const [volLoc, setVolLoc] = useState("");
  const [all, setAll] = useState();
  const fetchData = async () => {
    const resp = await axios.get("http://localhost:3001/user/allVolunteersU");
    setVol(resp.data.volunteers);
    const res = await axios.get("http://localhost:3001/user/allOrganizationsU");
    setOrg(res.data.organizations);
    const resCat = await axios.get("http://localhost:3001/category/all");
    setCat(resCat.data.categories);
    setAll(org.concat(vol))
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
            <div className="flex items-center gap-32">
              <div>
                <Select
                  variant="flushed"
                  value={orgCat}
                  width={80}
                  onChange={(e) => setOrgCat(e.target.value)}
                >
                  <option value="65bf50f63450b90b4ed5a608" className="text-black">
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
            <div className="">
              <div className="flex flex-col gap-4">
                {all &&
                  all.map((x) => (
                    <>
                      {x.location.includes(orgLoc) &&
                        x.categories.includes(orgCat) ? (
                        <div
                          className="w-[100%] p-2 rounded-lg shadow-inherit bg-slate-300 border-gray-700 text-black"
                          key={x._id}
                        >
                          <div className="flex justify-between items-center mx-2 my-2">
                            <div className="flex gap-3">
                              <Image
                                borderRadius='full'
                                boxSize='40px'
                                src={profileImage}
                                alt='Profile'
                              />
                              <h5 className="mb-2 text-2xl font-bold tracking-tight">
                                {x.name}
                              </h5>
                            </div>
                            <h5 className="mb-2 text-xl font-semibold">
                              {x.role.toUpperCase()}
                            </h5>
                            <AboutModal user={x} />
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
                    </>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ExploreServices;
