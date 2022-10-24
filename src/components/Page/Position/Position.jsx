import "antd/dist/antd.css";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./position.module.scss";
import Button from "../../common/Button/Button";
import Modals from "../../Layout/Popper/Modal";

import { openModal, hideModal } from "../../../redux/action";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);
export default function Position() {
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
      name: "Tim mạch",
      desc: "Tim mạch",
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
