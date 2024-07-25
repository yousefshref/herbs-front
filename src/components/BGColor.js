import React from "react";

const BGColor = ({ padding, bgColor, top, left, className }) => {
  return (
    <div
      className={`${padding} blur-2xl ${bgColor} absolute ${top} ${left} ${className}`}
    ></div>
  );
};

export default BGColor;
