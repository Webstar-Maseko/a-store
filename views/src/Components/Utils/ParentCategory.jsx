import React from "react";

export default function ParentCategory({ imageLink }) {
  return (
    <div
      className="bgh text-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Category/images/${imageLink}`,
      }}
    ></div>
  );
}
