import axios from "axios";
import { BE } from "../constants/constants";
import { useEffect, useState } from "react";

export default function CategoryRequest() {
  const [all, setAll] = useState();
  const allRequests = async () => {
    const resp = await axios.get(`${BE}categoryRequest/all`);
    setAll(resp.data.catReq);
  };
  useEffect(() => {
    allRequests();
  }, []);
  return (
    <div className="bg-gray-200">
      <div className="py-16 mt-20">
        <div className="flex justify-center">
          <h1>All Categories Requests</h1>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {all &&
            all.map((x) => (
              <div className="bg-white rounded-lg p-3 mx-5 mt-10" key={x._id}>
                <div className="flex justify-between">
                  <h3>{x.beneficiary.email}</h3>
                  <h3>{x.beneficiary.contact}</h3>
                </div>
                <div className="flex justify-center items-center">
                  <p>
                    <strong>Category:</strong> {x.category}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
