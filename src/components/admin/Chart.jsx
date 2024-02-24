import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartCard = ({ heading, fields }) => {
  const [currentTime, setCurrentTime] = useState("");
  const data = {
    labels: [fields[0].name, fields[1].name, fields[2].name, fields[3].name],
    datasets: [
      {
        data: [
          fields[0].value,
          fields[1].value,
          fields[2].value,
          fields[3].value,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ECC71"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ECC71"],
      },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="w-full sm:w-1/2 p-2">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="text-lg font-bold">{heading}</div>
          <div className="text-sm text-gray-400">
            {date}&nbsp;&nbsp;
            {currentTime}
          </div>
        </div>
        <div className="flex flex-row w-full">
          <Pie data={data} />
        </div>
        <div className="w-full mt-4">
          <div className="flex justify-between">
            <div className="text-gray-500">{fields[0].name}</div>
            <div className="text-gray-500">{fields[0].value}</div>
          </div>
          <div className="h-2 bg-red-500 rounded-full mt-2" />
          <div className="flex justify-between mt-4">
            <div className="text-gray-500">{fields[1].name}</div>
            <div className="text-gray-500">{fields[1].value}</div>
          </div>
          <div className="h-2 bg-blue-500 rounded-full mt-2" />
          <div className="flex justify-between mt-4">
            <div className="text-gray-500">{fields[2].name}</div>
            <div className="text-gray-500">{fields[2].value}</div>
          </div>
          <div className="h-2 bg-yellow-500 rounded-full mt-2" />
          <div className="flex justify-between mt-4">
            <div className="text-gray-500">{fields[3].name}</div>
            <div className="text-gray-500">{fields[3].value}</div>
          </div>
          <div className="h-2 bg-green-500 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
