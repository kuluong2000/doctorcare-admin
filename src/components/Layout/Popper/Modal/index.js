import React from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';
import './modal.scss';

export default function Modals({ title, handleOk, onCancel, children }) {
  const isVisible = useSelector((state) => state.modal.modal.show);

  return (
    <Modal
      title={title}
      className="modal-wrapper"
      open={isVisible}
      destroyOnClose
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div className="modal-wrapper">{children}</div>
    </Modal>
  );
}
