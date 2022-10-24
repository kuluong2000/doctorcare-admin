import React from "react";
import "antd/dist/antd.css";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./position.module.scss";
import Button from "../../common/Button/Button";
import Modals from "../../Layout/Popper/Modal";

import { openModal, hideModal } from "../../../redux/action";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

export default function position() {
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
      render: (text, record, index) => index,
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
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
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
      name: "panadol extra",
      desc: "Thuốc được khuyến cáo để điều trị hầu hết các triệu chứng đau từ nhẹ đến vừa và hạ sốt, ví dụ như: Đau đầu, đau nửa đầu, đau lưng, đau răng, đau khớp, đau bụng kinh, giảm các triệu chứng cảm lạnh, cảm cúm và đau họng.",
      quantity: 100,
      createAt: "23/10/2022",
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
              <label htmlFor="">Tên thuốc</label>
              <input type="text" placeholder="vui lòng nhập vào tên thuốc" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Mô tả</label>
              <input type="text" placeholder="vui lòng nhập vào Mô tả" />
            </div>

            <div className={cx("form-item")}>
              <label htmlFor="">Số Lượng</label>
              <input type="number" placeholder="vui lòng nhập số Lượng" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Ngày tạo</label>
              <input type="date" placeholder="vui lòng nhập ngày tạo" />
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
