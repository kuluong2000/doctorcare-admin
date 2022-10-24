import React from "react";
import classNames from "classnames/bind";
import styles from "./doctor.module.scss";
import Button from "../../common/Button/Button";

const cx = classNames.bind(styles);

export default function Doctor() {
  return (
    <>
      <div className={cx("btn-create")}>
        <Button btn_green> Thêm mới</Button>
      </div>
    </>
  );
}
