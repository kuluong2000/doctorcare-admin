import React from "react";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faHouseChimney, faPaw, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
export default function SideBar() {
  const toggleSidebar = useSelector((state) => state.sidebarToggle.classes);
  const data_user = JSON.parse(localStorage.getItem("data-user"));
  const sideBarMenu = [
    {
      icon: <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>,
      title: "Quản lý bác sĩ",
      to: "quan-ly-bac-si",
    },
    {
      icon: <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>,
      title: "Quản lý lịch khám",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
      title: "Quản lý người dùng",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
      title: "Quản lý khoa",
    },
  ];
  // logic
  const handleClick = (e) => {
    const parentNode = e.target.parentElement.parentNode;
    const parentElement = e.target.parentElement;
    console.log(parentNode);
    console.log(parentElement);
    parentElement.classList.toggle(cx("open"));
    for (let item of parentNode.children) {
      if (item.className.includes(cx("open"))) {
        item.classList.remove(cx("open"));
        parentElement.classList.add(cx("open"));
      }
    }
  };
  return (
    <div className={cx("sidebar", toggleSidebar)}>
      <div className={cx("sidebar-title")}>
        <span className={cx("sidebar-title-icon")}>
          <FontAwesomeIcon icon={faPaw}></FontAwesomeIcon>
        </span>
        <span className={cx("sidebar-title-name")}>Jio Health Admin</span>
      </div>
      <div className={cx("sidebar-profile")}>
        <div className={cx("sidebar-profile-pic")}>
          <img src={require("../../../assets/images/avatar.jpg")} alt="" />
        </div>
        <div className={cx("sidebar-profile-info")}>
          <span>Welcome,</span>
          <h2>Hữu Lương</h2>
        </div>
      </div>
      <div className={cx("sidebar-menu")}>
        <h3 className={cx("sidebar-general")}>Reneral</h3>
        <SideMenu data={sideBarMenu} onClick={handleClick}></SideMenu>
      </div>
    </div>
  );
}
