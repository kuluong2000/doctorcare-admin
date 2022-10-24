import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./defaultLayout.module.scss";
import SideBar from "../SideBar/SideBar";
import Header from "../../common/Header/Header";
import Loading from "../../Loading/Loading";
import Home from "../../Page/Home/Home";

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => {
      setShow(false);
    };
  }, []);
  const data = JSON.parse(localStorage.getItem("data-user"));
  useEffect(() => {
    if (!data || !data.token) return navigate("/quan-tri/login");
  }, [data]);

  return (
    <>
      {!show ? (
        <Loading classes={"circle-loading2"}></Loading>
      ) : (
        <div className={cx("wrapper")}>
          <SideBar></SideBar>
          <div className={cx("container")}>
            <Header data={data.user}></Header>
            <div className={cx("content")}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
