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
export default function Department() {
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
