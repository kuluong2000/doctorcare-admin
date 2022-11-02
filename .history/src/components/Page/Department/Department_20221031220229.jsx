import React, { useEffect, useLayoutEffect, useState } from "react";
import "antd/dist/antd.css";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./department.module.scss";
import Button from "../../common/Button/Button";
import Modals from "../../Layout/Popper/Modal";

import { openModal, hideModal, insertDepartment, getALLDepartment } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { modal } from "../../../redux/reducer/modal";

const cx = classNames.bind(styles);
export default function Department() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ nameDepartment: "", description: "", price: "", image: "", date: "" });

  const { data, loading } = useSelector((state) => state.admin);
  const mode = useSelector((state) => state.modal.data.mode);
  const dataRow = useSelector((state) => state.modal.data.data);

  console.log(mode);

  useEffect(() => {
    dispatch(getALLDepartment());
  }, []);

  const handleOnChage = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showModal = (mode, record) => {
    console.log({ record });
    // dispatch(openModal(mode, record));
    setFormData(...record);
  };
  const handleOk = () => {
    if (mode === "Add") {
      setFormData("");
      return Promise.all([dispatch(hideModal()), dispatch(insertDepartment(formData))]);
    }
    if (mode === "Edit") {
      // setDataTable(dataRow);
      console.log(dataRow);
    }
  };

  console.log({
    formData,
  });
  const onCancel = () => {
    return dispatch(hideModal());
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
      dataIndex: "nameDepartment",
      key: "nameDepartment",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (t, r) => <img src={`${r.image}`} alt="" />,
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

  return (
    <>
      <div className={cx("btn-create")}>
        <Button btn_green onClick={() => showModal("Add")}>
          Thêm mới
        </Button>
        <Modals onCancel={onCancel} handleOk={handleOk}>
          <form className={cx("form")}>
            <div className={cx("form-item")}>
              <label htmlFor="">Tên khoa</label>
              <input onChange={handleOnChage} type="text" placeholder="vui lòng nhập vào tên khoa" value={formData?.nameDepartment || ""} name="nameDepartment" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Mô tả</label>
              <input onChange={handleOnChage} type="text" placeholder="vui lòng nhập vào Mô tả" value={formData?.description || ""} name="description" />
            </div>

            <div className={cx("form-item")}>
              <label htmlFor="">Giá tiền</label>
              <input onChange={handleOnChage} type="number" placeholder="vui lòng nhập giá tiền" value={formData?.price || ""} name="price" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Hình ảnh</label>
              <input onChange={handleOnChage} type="file" value={formData?.image || ""} name="image" />
            </div>
            <div className={cx("form-item")}>
              <label htmlFor="">Ngày tạo</label>
              <input onChange={handleOnChage} type="date" placeholder="vui lòng nhập ngày tạo" value={formData?.date || ""} name="date" />
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx("table")}>
        <Table
          rowKey={(record) => record._id}
          columns={columns}
          loading={loading}
          dataSource={data}
          pagination={{ defaultPageSize: 10 }}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
