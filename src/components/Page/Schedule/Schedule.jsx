import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import { openModal, hideModal } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Modals from '../../Layout/Popper/Modal';

import styles from './schedule.module.scss';

const cx = classNames.bind(styles);

export default function Schedule() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.modal.data.mode);
  const [formData, setFormData] = useState({});
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
    setFormData(record);
  };
  const handleOk = () => {
    if (mode === 'Add') {
      dispatch(hideModal());
    }
    if (mode === 'Edit') {
      dispatch(hideModal());
    }
  };
  const onCancel = () => {
    dispatch(hideModal());
  };
  const handleDelete = (id) => {
    // Swal.fire({
    //   title: 'Bạn có muốn xóa?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Xóa',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire('Deleted!', 'Xóa thành công.', 'success');
    //   }
    // });
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 100,
      render: (text, record, index) => index,
    },
    {
      title: 'Họ Tên ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày Khám',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giờ Khám',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            className={`btn-primary bg-primary`}
            onClick={() => showModal('Edit', record)}
          >
            sửa
          </Button>
          <Button
            className={`btn-danger bg-danger`}
            onClick={() => handleDelete(record._id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className={cx('btn-create')}>
        <Button btn_green onClick={() => showModal('Add')}>
          Thêm mới
        </Button>
        <Modals onCancel={onCancel} handleOk={handleOk}>
          <form className={cx('form')}>
            <div className={cx('form-item')}>
              <label htmlFor="">Tên chức vụ</label>
              <input
                type="text"
                name="namePosition"
                onChange={handleOnChange}
                value={formData?.namePosition || ''}
                placeholder="vui lòng nhập vào tên chức vụ"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Mô tả</label>
              <input
                type="text"
                name="description"
                onChange={handleOnChange}
                value={formData?.description || ''}
                placeholder="vui lòng nhập vào Mô tả"
              />
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx('table')}>
        <Table
          rowKey={(record) => record._id}
          columns={columns}
          // loading={loading}
          // dataSource={position}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
