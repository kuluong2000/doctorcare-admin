import { DatePicker, Select, Space, Table } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import moment from 'moment';
import {
  openModal,
  hideModal,
  getAllBookingByDoctor,
  verifyBookingByDoctor,
  getAllMedicine,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Modals from '../../Layout/Popper/Modal';

import { formatPrice } from './../../../utils/numberFormat';

import styles from './schedule.module.scss';
const cx = classNames.bind(styles);

export default function Schedule() {
  const dispatch = useDispatch();
  //##########format DatePicker
  const dateFormat = 'DD/MM/YYYY';
  const mode = useSelector((state) => state.modal.data.mode);
  const { booking, medicine, loading } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const doctor = JSON.parse(localStorage.getItem('data-user')).data.doctor;
  useEffect(() => {
    Promise.all([
      dispatch(getAllMedicine()),
      dispatch(getAllBookingByDoctor(doctor, new Date().toISOString())),
    ]);
  }, []);

  useEffect(() => {
    const data = booking && booking.filter((item) => item.status === false);

    setData(data);
  }, [booking]);

  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
    setFormData(record);
  };
  const handleOk = () => {
    Promise.all([
      dispatch(verifyBookingByDoctor(formData?._id, formData, doctor)),
      dispatch(hideModal()),
    ]);
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
      title: 'Họ Tên Bệnh Nhân ',
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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.time.localeCompare(b.time),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (idx, data) => formatPrice(data?.price),
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
      <Modals
        title="Thông tin bệnh nhân"
        onCancel={onCancel}
        handleOk={handleOk}
      >
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
                <input type="text" value={formData?.date || ''} disabled />
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
                />
              </div>
              <div className={cx('form-item')}>
                <label htmlFor="">Đơn thuốc</label>
                <Select
                  mode="multiple"
                  placeholder="Nhập thuốc"
                  onChange={(value) => {
                    setFormData({ ...formData, medicine: value });
                  }}
                >
                  {medicine &&
                    medicine.map((item, idx) => (
                      <Select.Option key={idx} value={item.nameMedicine}>
                        {item.nameMedicine}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            </div>
          </div>
        </form>
      </Modals>
      <div className="d-flex align-items-center ms-3">
        <p className="me-2 fw-bold">Chọn ngày</p>
        <Space direction="vertical">
          <DatePicker
            defaultValue={moment()}
            onChange={(e, dateString) =>
              // console.log(e, 'debug', new Date(dateString).toISOString())
              dispatch(
                getAllBookingByDoctor(
                  doctor,
                  new Date(dateString).toISOString()
                )
              )
            }
            disabledDate={(current) => {
              let customDate = moment().format('DD-MM-YYYY');
              return current && current < moment(customDate, 'DD-MM-YYYY');
            }}
          />
        </Space>
      </div>
      <div className={cx('table')}>
        <Table
          rowKey={(record) => record._id}
          columns={columns}
          loading={loading}
          dataSource={data}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
