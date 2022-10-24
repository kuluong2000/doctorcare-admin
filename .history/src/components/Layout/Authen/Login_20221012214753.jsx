import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import baseURL from "./../../../utils/configURL";
//import css
import styles from "./authen.module.scss";
import { useDispatch } from "react-redux";
import * as actions from "./../../../redux/action";

const cx = classNames.bind(styles);
export default function Login() {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hanleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseURL}/user/login`, formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(actions.dataUser(res.data));
          localStorage.setItem("data-user", JSON.stringify(res.data));
          console.log("success");
        }
      })
      .catch((res) => {
        alert(`${res.response.data.error}`);
        console.log(res.response.data.error);
      });
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
            <Link to={"/quan-tri/register"}>Create Account</Link>
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
