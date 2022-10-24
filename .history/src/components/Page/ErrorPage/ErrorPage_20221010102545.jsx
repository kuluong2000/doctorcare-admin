import React from "react";
import classNames from "classnames/bind";
import styles from "./error.module.scss";
import Button from "../../common/Button/Button";
const cx = classNames.bind(styles);
export default function ErrorPage() {
  return (
    <div className={cx("error-page")}>
      <section className={cx("wrapper")}>
        <div className={cx("container")}>
          <div id="scene" className={cx("scene")} data-hover-only="false">
            <div className={cx("circle")} data-depth="1.2" />
            <div className={cx("one")} data-depth="0.9">
              <div className={cx("content")}>
                <span className={cx("piece")} />
                <span className={cx("piece")} />
                <span className={cx("piece")} />
              </div>
            </div>
            <div className={cx('"two"')} data-depth="0.60">
              <div className={cx("content")}>
                <span className={cx("piece")} />
                <span className={cx("piece")} />
                <span className={cx("piece")} />
              </div>
            </div>
            <div className={cx("three")} data-depth="0.40">
              <div className={cx("content")}>
                <span className={cx("piece")} />
                <span className={cx("piece")} />
                <span className={cx("piece")} />
              </div>
            </div>
            <p className={cx("p404")} data-depth="0.50">
              404
            </p>
            <p className={cx("p404")} data-depth="0.10">
              404
            </p>
          </div>
          <div className={cx("text")}>
            <article>
              <p>
                Có vẻ trang bạn tìm không có. <br />
                Quay lại trang chủ!
              </p>
              {/* <Button to="/quan-tri" btn_green>
                Trang chủ
              </Button> */}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
