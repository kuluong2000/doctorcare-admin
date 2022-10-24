import React, { useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function SidebarItem({ className, icon, title, to, pathChildren, onClick }) {
  return (
    <li className={cx("sidebar-item", className)} onClick={onClick}>
      <Link to={to} className={cx("sidebar-item__parent")}>
        <span>{icon}</span>
        <p>{title}</p>
      </Link>
    </li>
  );
}
export default forwardRef(SidebarItem);