import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/action";
import Modals from "../../Layout/Popper/Modal/index";
const cx = classNames.bind(styles);
export default function Home() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.modal.show);

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  return (
    <>
      <h1>welcome to my dashboard</h1>
    </>
  );
}
