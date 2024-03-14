import { useEffect, useState, useReducer } from "react"
import { BE } from "../../constants/constants";
import axios from "axios";
import Cookies from "js-cookie";

export default function BProfile() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [user, setUser] = useState();
    const [city, setCity] = useState();
    const [contact, setContact] = useState();
    const [name, setName] = useState();
    const [cities, setCities] = useState();
    const [options, setOptions] = useState([
        {
            text: "Account Settings",
            selected: true
        },
        {
            text: 'Application History',
            selected: false
        }
    ])
    const fetchData = async () => {
        console.log("hit")
        const resp = await axios.get(`${BE}users/my/${Cookies.get("id")}`);
        setUser(resp.data.user);
        setContact(resp.data.user.contact);
        setName(resp.data.user.name);
        setCity(resp.data.user.city);
    };
    const fetchCities = async () => {
        console.log("hit")
        const resp = await axios.get(`${BE}users/city/loadCities`);
        setCities(resp.data.cities);
        // console.log(cities);
    };
    const handleChangeCompo = (index) => {
        let stateY = options;
        if (index == 1) {
            stateY[1].selected = true
            stateY[0].selected = false
        }
        else {
            stateY[0].selected = true
            stateY[1].selected = false
        }
        // console.log(stateY)
        setOptions(stateY)
        // console.log(options)
        forceUpdate()
    }
    useEffect(() => {
        fetchData();
        fetchCities();
    }, [])
    return (
        <div className="bg-gray-100 mt-16 py-12">
            <div className="grid grid-cols-12 mx-8">
                <div className="col-span-4">
                    <h1 className="font-bold text-lg">Hi, Saad</h1>
                    <hr className="border-black mt-4" />
                    <h1 className="font-bold text-2xl mt-2">Personal Settings</h1>
                    <div className="flex flex-col mt-2 gap-2">
                        {options && options.map((opt, index) => (
                            <h1 className={`${opt.selected && `border-l border-blue-700`} pl-3 cursor-pointer`} onClick={() => handleChangeCompo(index)} key={index}>{opt.text}</h1>
                        ))}
                    </div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-7">
                    <div>
                        <h1 className="font-bold text-2xl mt-2">Account Settings</h1>
                        <hr className="border-black mt-5" />
                        <div className="flex gap-2">
                            <div className="mt-3">
                                <h3 className="text-md font-light inline">Jump To</h3>
                                <a href="#Personal" className="inline underline ml-5 text-sky-500">Personal Information</a>
                                <a href="" className="inline underline ml-2 text-sky-500">Password</a>
                                <a href="" className="inline underline ml-2 text-sky-500">Delete Account</a>
                            </div>
                        </div>
                        <div className="bg-white p-5 mt-5" name="Personal">
                            <h1 className="font-bold text-lg">Personal Information</h1>
                            <form action="" method="post">
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-1" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="location">Location</label>
                                        <select name="city" id="city" placeholder="Cities" className="border p-1" value={city} onChange={(e) => setCity(e.target.value)}>
                                            {cities && cities.map((city) => (
                                                <option value={city.name} key={city._id}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="contact">Contact</label>
                                        <input type="text" placeholder="Contact" className="border p-1" value={contact} onChange={(e) => setContact(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="about">About</label>
                                        <textarea name="" id="" cols="5" rows="10" className="border p-1"></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-blue-500 text-white p-1 rounded-lg mt-2">Update Information</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}