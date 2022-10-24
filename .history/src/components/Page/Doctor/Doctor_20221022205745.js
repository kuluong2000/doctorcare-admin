import React from "react";
import "antd/dist/antd.css";
import { Space, Table } from "antd";

import classNames from "classnames/bind";
import styles from "./doctor.module.scss";
import Button from "../../common/Button/Button";

const cx = classNames.bind(styles);

export default function Doctor() {
  const showModal = () => {};
  const handleDelete = () => {};
  const columns = [
    {
      title: "FirstName",
      dataIndex: "fistName",
      key: "name",
      fixed: "left",
    },
    {
      title: "lastName",

      dataIndex: "lastName",
      key: "name",
      fixed: "left",
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
    },
    {
      title: "Column 6",
      dataIndex: "address",
      key: "6",
    },
    {
      title: "Column 7",
      dataIndex: "address",
      key: "7",
    },
    {
      title: "Column 8",
      dataIndex: "address",
      key: "8",
    },
    {
      title: "Action",
      key: "action",
      fixed: right,
      render: (text, record, index) => (
        <Space size="middle">
          <Button className={`btn-primary bg-primary`} handleClick={() => showModal("Edit", record)}>
            sửa
          </Button>
          <Button className={`btn-danger bg-danger`} handleClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park",
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
