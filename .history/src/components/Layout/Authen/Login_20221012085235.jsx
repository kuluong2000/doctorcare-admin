import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "./../../../utils/configURL";
//import css
import styles from "./authen.module.scss";

const cx = classNames.bind(styles);
export default function Login() {
  const [formData, setFormData] = useState();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hanleSubmit = async (e) => {
    e.preventDefault();

    const data = await axios
      .post(`${baseURL}/user/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
    console.log(data);
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")}>
        <h1 className={cx("form-title")}>Login Form</h1>
        <div>
          <input type="text" placeholder="UserName" className={cx("form-control")} name="username" onChange={handleOnChange} />
        </div>
        <div>
          <input type="password" placeholder="Password" className={cx("form-control")} name="password" required onChange={handleOnChange} />
        </div>
        <div className={cx("form-action")}>
          <Link onClick={hanleSubmit} to="/" className={cx("form-btn", "form-btn__signin")}>
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
            <img src={require("./../../../assets/images/logo.svg").default} alt="logo" />
          </h1>
          <p className={cx("form-desc")}>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
        </div>
      </form>
    </div>
  );
}
