import React from "react";

export default function FooterLinkList({ head, links }) {
  return (
    <ul className="footer-list">
      <span className="icon-child">{head}</span>
      {links.map((item, index) => (
        <li key={index}>
          <a href={item.url}>{item.name}</a>
        </li>
      ))}
    </ul>
  );
}
