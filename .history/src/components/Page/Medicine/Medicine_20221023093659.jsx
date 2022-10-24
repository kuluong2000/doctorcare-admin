import React from "react";
import "antd/dist/antd.css";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./medicine.module.scss";
import Button from "../../common/Button/Button";
import Modals from "../../Layout/Popper/Modal";

import { openModal, hideModal } from "../../../redux/action";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

export default function Medicine() {
  const dispatch = useDispatch();
  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
  };
  const handleOk = () => {
    console.log("success");
    dispatch(hideModal());
  };
  const onCancel = () => {
    dispatch(hideModal());
  };
  const handleDelete = () => {};
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Quantity ",
      dataIndex: "quantity ",
      key: "quantity ",
    },
    {
      title: "CreateAt",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 200,
      render: (text, record, index) => (
        <Space size="middle">
          <Button className={`btn-primary bg-primary`} onClick={() => showModal("Edit", record)}>
            sửa
          </Button>
          <Button className={`btn-danger bg-danger`} onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      firstName: "Lương",
      lastName: "Trần Hữu",
      phone: "0836423314",
      email: "tranhuuluong156200@gmail.com",
      gender: "Nam",
      date: "15/06/2000",
      address: "Quảng Nam",
      image: "Noimage",
      status: "hoạt động",
    },
  ];

  return (
    <>
      <div className={cx("btn-create")}>
        <Button btn_green onClick={() => showModal("Add")}>
          Thêm mới
        </Button>
        <Modals onCancel={onCancel} handleOk={handleOk}>
          <form className={cx("form")}>
            <div className={cx("form-item")}>
              <label htmlFor="">Họ</label>
              <input type="text" placeholder="vui lòng nhập vào Họ" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Tên</label>
              <input type="text" placeholder="vui lòng nhập vào Tên" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Username</label>
              <input type="text" placeholder="vui lòng nhập vào tài khoản" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">password</label>
              <input type="password" placeholder="vui lòng nhập vào mật khẩu" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Số điện thoại</label>
              <input type="number" placeholder="vui lòng nhập số điện thoại" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Email</label>
              <input type="email" placeholder="vui lòng nhập email" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Giới tính</label>
              <div className={cx("gender")}>
                <div className={cx("gender-item")}>
                  <label htmlFor="">Nam</label>
                  <input type="radio" name="gender" value="Nam"></input>
                </div>
                <div className={cx("gender-item")}>
                  <label htmlFor="">Nữ</label>
                  <input type="radio" name="gender" value="Nữ"></input>
                </div>
              </div>
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Quyền</label>
              <select name="" id="">
                <option value="Admin">Admin</option>
                <option value="Người dùng">Người dùng</option>
                <option value="bác sĩ">Bác sĩ</option>
              </select>
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx("table")}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}