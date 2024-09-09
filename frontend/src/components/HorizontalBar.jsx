import React from "react";
import BodyPart from "./BodyPart";

const HorizontalBar = ({ data, bodyPart, setBodyPart }) => {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-4 px-2">
        {data.map((item) => (
          <BodyPart
            key={item}
            item={item}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalBar;
