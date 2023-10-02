import React from "react";
import "./Links.css";
import { NavLink } from "react-router-dom";

const Links = ({ title, link, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_links" : "align_center"}
    >
      {title}
    </NavLink>
  );
};

export default Links;
