import React from "react";
import { Table } from "antd";
import classNames from "classnames/bind";
import styles from "./doctor.module.scss";
import Button from "../../common/Button/Button";

const cx = classNames.bind(styles);

export default function Doctor() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <>
      <div className={cx("btn-create")}>
        <Button btn_green> Thêm mới</Button>
      </div>
      <div className="form">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 240,
          }}
        />
      </div>
    </>
  );
}
