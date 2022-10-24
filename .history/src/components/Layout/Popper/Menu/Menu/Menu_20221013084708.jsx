import React from "react";
import classNames from "classnames/bind";
import styles from "../menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import BASE_URL from "./../../../../../utils/configURL";
import axios from "axios";
import actions from "./../../../../../redux/action";
const cx = classNames.bind(styles);
export default function Menu() {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    await axios
      .get(`${BASE_URL}/user/logout`)
      .then((res) => {
        console.log(res.status);
      })
      .catch((res) => {
        console.log(res);
      });
    localStorage.removeItem("data-user");
  };

  return (
    <ul className={cx("menu-list")}>
      <li className={cx("menu-item")}>
        <Link to="/quan-tri/login" onClick={handleLogout} className={cx("menu-item-link")}>
          <span>Log out</span>
          <span className={cx("back")}>
            <FontAwesomeIcon icon={faArrowRightToBracket}></FontAwesomeIcon>
          </span>
        </Link>
      </li>
    </ul>
  );
}
