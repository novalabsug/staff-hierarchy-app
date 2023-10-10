import React from "react";
import PersonelCard from "./PersonelCard";
import randomColor from "randomcolor";

const Section = ({ data }) => {
  const ThemeColor = randomColor();

  return (
    <div
      className={`pt-8 pb-10 mb-4 border-b-2 border-b-[${ThemeColor.toString()}] border-dashed`}
    >
      <div className="flex justify-center gap-6 flex-wrap">
        {data.map((personnel, index) => (
          <PersonelCard
            key={index}
            personnel={{ ...personnel }}
            color={ThemeColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
