import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../.../../../../../redux/action";
export default function Modals({ children }) {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.modal.modal.show);

  const handleOk = () => {
    dispatch(hideModal());
  };
  const onCancel = () => {
    dispatch(hideModal());
  };
  return (
    <Modal title="Basic Modal" visible={isVisible} onOk={handleOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
}
