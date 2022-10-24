import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./modal.module.scss";
const cx = classNames.bind(styles);
export default function Modals({ handleOk, onCancel, children }) {
  const isVisible = useSelector((state) => state.modal.modal.show);

  return (
    <div className={cx("wrapper")}>
      <Modal style={{ width: "900px", resize: "none" }} open={isVisible} onOk={handleOk} onCancel={onCancel}>
        {children}
      </Modal>
    </div>
  );
}
