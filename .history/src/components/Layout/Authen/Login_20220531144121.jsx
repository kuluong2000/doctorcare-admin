import React from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
//import css
import styles from "./authen.module.scss";
const cx = classNames.bind(styles);
export default function Login() {
  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")}>
        <h1 className={cx("form-title")}>Login Form</h1>
        <div>
          <input type="text" placeholder="UserName" className={cx("form-control")} />
        </div>

        <div>
          <input type="password" placeholder="Password" className={cx("form-control")} required />
        </div>
        <div className={cx("form-action")}>
          <Link to="/" className={cx("form-btn", "form-btn__signin")}>
            Login
          </Link>
          <p>Lost your password?</p>
        </div>
        <div className={cx("form-separator")}>
          <div className={cx("form-change-link")}>
            New to side?
            <Link to={"/register"}>Create Account</Link>
          </div>
        </div>
        <div className={cx("form-info")}>
          <h1 className={cx("form-branch")}>
            <FontAwesomeIcon icon={faPaw}></FontAwesomeIcon>
            Gentelella Alela!
          </h1>
          <p className={cx("form-desc")}>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
        </div>
      </form>
    </div>
  );
}
