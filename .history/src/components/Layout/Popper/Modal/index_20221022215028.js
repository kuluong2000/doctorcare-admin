import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../.../../../../../redux/action";
export default function Modals({ visible, children }) {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.modal.modal.show);
  console.log(isVisible);

  const handleOk = () => {
    dispatch(hideModal());
  };
  const onCancel = () => {
    dispatch(hideModal());
  };
  return (
    <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
}