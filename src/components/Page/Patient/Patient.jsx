import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import Button from '../../common/Button/Button';
import { openModal, hideModal, getAllBooking } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Modals from '../../Layout/Popper/Modal';

import styles from './patient.module.scss';
const cx = classNames.bind(styles);
export default function Patient() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.modal.data.mode);
  const { booking, loading } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({});

  //################
  useEffect(() => {
    dispatch(getAllBooking());
  }, []);

  //#############
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const doctor = JSON.parse(localStorage.getItem('data-user')).data.doctor;
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
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 100,
      fixed: 'left',
      render: (text, record, index) => index,
    },
    {
      title: 'Họ Tên ',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (idx, data) =>
        `${data?.patient?.account?.people?.lastName} ${data?.patient?.account?.people?.firstName}`,
    },
    {
      title: 'Khoa khám',
      dataIndex: 'deoartment',
      key: 'department',
      render: (idx, data) => `${data?.department?.nameDepartment} `,
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
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
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
            Khám
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={cx('btn-create')}>
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
          loading={loading}
          dataSource={booking}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
