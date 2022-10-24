import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
export default function Modals({ handleOk, onCancel, children }) {
  const isVisible = useSelector((state) => state.modal.modal.show);

  return (
    <Modal title="Basic Modal" visible={isVisible} onOk={handleOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
}
