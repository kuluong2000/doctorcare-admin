import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import Button from '../../common/Button/Button';
import { openModal, hideModal, getAllBooking } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Modals from '../../Layout/Popper/Modal';

import styles from './patient.module.scss';
import { formatPrice } from '../../../utils/numberFormat';
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
      defaultSortOrder: 'ascend',
      // sorter: (a, b) => a?.date.localeCompare(b.time),
      render: (idx, data) =>
        new Date(Date.parse(data?.date)).toLocaleDateString(),
      // sorter: (a, b) => a.date.localeCompare(b.date),
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (idx, data) => {
        if (data?.status === true) {
          return {
            props: {
              style: { color: 'blue' },
            },
            children: 'Đã khám',
          };
        } else {
          return {
            props: {
              style: { color: 'red' },
            },
            children: 'chưa khám',
          };
        }
      },
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
            Xem chi tiết
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
            <div className="d-flex w-100">
              <div className="col-md-4 me-3">
                <div className={cx('form-item')}>
                  <label htmlFor="">Họ và tên</label>
                  <input
                    type="text"
                    value={
                      `${formData?.patient?.account?.people?.lastName} ${formData?.patient?.account?.people?.firstName}` ||
                      ''
                    }
                    disabled
                  />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Số điện thoại</label>
                  <input
                    type="number"
                    value={formData?.patient?.account?.people?.phone || ''}
                    disabled
                  />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={formData?.patient?.account?.people?.email || ''}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4 me-3">
                <div className={cx('form-item')}>
                  <label htmlFor="">Họ tên bác sĩ</label>
                  <input
                    type="text"
                    value={
                      `${formData?.doctor?.account?.people?.lastName} ${formData?.doctor?.account?.people?.firstName}` ||
                      ''
                    }
                    disabled
                  />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Khoa khám</label>
                  <input
                    type="text"
                    value={formData?.department?.nameDepartment || ''}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className={cx('form-item')}>
                  <label htmlFor="">Ngày Đặt</label>
                  <input
                    type="text"
                    value={
                      new Date(
                        Date.parse(formData?.date)
                      ).toLocaleDateString() || ''
                    }
                    disabled
                  />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Thời gian Khám</label>
                  <input type="text" value={formData?.time || ''} disabled />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Giá tiền</label>
                  <input
                    type="text"
                    value={formatPrice(formData?.price) || ''}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="d-flex w-100">
              <div className="col-md-6 me-5 ">
                <textarea
                  name=""
                  id=""
                  className="w-100"
                  rows="5"
                  value={formData?.message || ''}
                  disabled
                ></textarea>
              </div>
              <div className="col-md-4">
                <div className={cx('form-item')}>
                  <label htmlFor="">Chuẩn đoán của bác sĩ</label>
                  <input
                    type="text"
                    placeholder="chuẩn đoán của bác sĩ"
                    name="diseases"
                    onChange={handleOnChange}
                    value={formData?.diseases || ''}
                    disabled
                  />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Ghi chú đính kèm</label>
                  <input
                    type="text"
                    placeholder="Lời dặn của bác sĩ"
                    name="note"
                    onChange={handleOnChange}
                    value={formData?.note || ''}
                    disabled
                  />
                </div>
                <div className={cx('form-item')}>
                  <label htmlFor="">Đơn thuốc</label>
                  <input
                    type="text"
                    placeholder="Đơn thuốc"
                    name="medicine"
                    onChange={handleOnChange}
                    value={formData?.medicine || ''}
                    disabled
                  />
                </div>
              </div>
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
