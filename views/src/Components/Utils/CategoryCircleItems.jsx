import React from "react";

export default function CategoryCircleItems(props) {
  return (
    <ul className="cateImageList ">
    {props.items.map((item,index) =>(
      <>
        <li key={index} className="text-center">
          <a href={item.url} className="text-center">
            <div className="blockCatImage">
              <img src={item.image}className="catImage" alt="" />
            </div>
            <p className="pt-3">{item.name}</p>
          </a>
        </li>
      </>

    ))}

    </ul>
  );
}
