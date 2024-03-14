const WhatWeDoCard = ({ iconSrc, iconAlt, title, desc }) => {
  return (
    <div className="bg-white rounded-lg w-80 h-auto p-3 pt-1 flex flex-col gap-4">
      <div className="bg-orange-400 w-fit p-4 rounded-lg ">
        <img src={iconSrc} alt={iconAlt} />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg text-left">{desc}</p>
    </div>
  );
};

export default WhatWeDoCard;
