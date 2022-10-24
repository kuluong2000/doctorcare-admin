import React from "react";
import "antd/dist/antd.css";
import { Space, Table } from "antd";

import classNames from "classnames/bind";
import styles from "./doctor.module.scss";
import Button from "../../common/Button/Button";

const cx = classNames.bind(styles);

export default function Doctor() {
  const showModal = (e) => {
    console.log(e);
  };
  const handleDelete = () => {};
  const columns = [
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
      fixed: "left",
    },
    {
      title: "lastName",
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "BirthDay",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (t, r) => <img src={`${r.image}`} alt="" />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 200,
      render: (text, record, index) => (
        <Space size="middle">
          <Button className={`btn-primary bg-primary`} handleClick={(e) => showModal("Edit", record)}>
            sửa
          </Button>
          <Button className={`btn-danger bg-danger`} handleClick={(e) => handleDelete(record.id)}>
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
        <Button btn_green> Thêm mới</Button>
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
