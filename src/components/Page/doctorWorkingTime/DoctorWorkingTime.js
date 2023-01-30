import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './doctorWorkingTime.module.scss';
import moment from 'moment';
//redux
import {
  openModal,
  hideModal,
  getAllDoctor,
  lockScheduleOfDoctor,
  unLockScheduleOfDoctor,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';
import { DatePicker, Select, Space, Table } from 'antd';
import Image from '../../common/Image/Image';
const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

export default function DoctorWorkingTime() {
  const dispatch = useDispatch();
  const { dataDoctor, loading } = useSelector((state) => state.admin);
  const mode = useSelector((state) => state.modal.data.mode);
  const [formData, setFormData] = useState();
  const [timeStamp, setTimeStamp] = useState();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const getAPI = () => {
      dispatch(getAllDoctor());
    };
    getAPI();
  }, [dispatch]);
  //#####################################################
  //##  HANDLE LOGIC
  //#####################################################
  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
    setFormData(record);
  };
  const handleOk = () => {
    console.log(typeof timeStamp);
    if (mode === 'Edit') {
      Promise.all([
        dispatch(
          lockScheduleOfDoctor(formData?._id, {
            timer: timeStamp,
            status: false,
          })
        ),
        dispatch(hideModal()),
      ]);

      // return dispatch(hideModal());
    }
  };
  const onCancel = () => {
    dispatch(hideModal());
  };
  const unLockSchedule = (id) => {
    dispatch(unLockScheduleOfDoctor(id));
  };
  const columns = [
    {
      title: 'Họ',
      width: 150,
      dataIndex: 'lastName',
      key: 'lastName',
      fixed: 'left',
      render: (text, record, index) => {
        return record.account.people?.lastName;
      },
    },
    {
      title: 'Tên',
      width: 100,
      dataIndex: 'firstName',
      key: 'firstName',
      fixed: 'left',
      render: (text, record, index) => {
        return record.account.people?.firstName;
      },
    },

    {
      title: 'Số điện thoại',
      width: 120,
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record, index) => {
        return record.account.people?.phone;
      },
    },
    {
      title: 'Email',
      width: 200,
      dataIndex: 'email',
      key: 'email',
      render: (text, record, index) => {
        return record.account.people?.email;
      },
    },
    {
      title: 'Giới tính',
      width: 100,
      dataIndex: 'gender',
      key: 'gender',
      render: (text, record, index) => {
        return record.account.people?.gender;
      },
    },
    {
      title: 'Ngày sinh',
      width: 110,
      dataIndex: 'date',
      key: 'date',
      render: (text, record, index) => {
        return record.account.people?.birthday;
      },
    },
    {
      title: 'Địa chỉ',
      width: 150,
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => {
        return record.account.people?.address;
      },
    },
    {
      title: 'Chức vụ',
      width: 150,
      dataIndex: 'position',
      key: 'position',
      render: (text, record, index) => {
        return record.position?.namePosition;
      },
    },
    {
      title: 'Phòng ban',
      width: 150,
      dataIndex: 'department',
      key: 'department',
      render: (text, record, index) => {
        return record.department?.nameDepartment;
      },
    },
    {
      title: 'Hình ảnh',
      width: 100,
      dataIndex: 'image',
      key: 'image',
      className: `${cx('image')}`,
      render: (t, r) => (
        <Image
          src={
            r?.account?.people?.image
              ? `http://127.0.0.1:3030/${r?.account?.people?.image}`
              : ''
          }
          alt=""
        />
      ),
    },
    {
      title: 'Trạng thái',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      render: (index, data) =>
        data?.status === true ? 'Đang hoạt động' : 'Đã khóa',
    },
    {
      title: 'Hành động',
      width: 250,
      key: 'action',
      fixed: 'right',
      render: (text, record, index) => (
        <Space size="middle">
          {record?.status === true ? (
            <Button
              className={`btn-primary bg-primary`}
              onClick={() => showModal('Edit', record)}
            >
              Đóng lịch làm việc
            </Button>
          ) : (
            <div>
              <strong>
                Lịch sẽ mở vào ngày
                {new Date(record?.timeStamp).toLocaleDateString()}
              </strong>
              <Button
                onClick={() => unLockSchedule(record._id)}
                className={`btn-primary bg-primary mt-2`}
              >
                Mở Khóa Ngay
              </Button>
            </div>
          )}
        </Space>
      ),
    },
  ];
  //#####################################################
  //##  JSX RENDER
  //#####################################################
  return (
    <>
      <h3 className="text-center">Thêm thời gian làm việc cho bác sĩ</h3>

      <div className={cx('btn-create')}>
        <Modals onCancel={onCancel} handleOk={handleOk}>
          <form className={cx('form')}>
            <div className={cx('form-item')}>
              <label htmlFor="">Danh sách bác sĩ</label>
              <input
                type="text"
                value={
                  `${formData?.account?.people?.lastName} ${formData?.account?.people?.firstName}` ||
                  ''
                }
                disabled
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Thời gian làm việc</label>
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(date, dateString) =>
                    setTimeStamp(new Date(dateString[1]).getTime())
                  }
                  disabledDate={(current) => {
                    let customDate = moment().format('DD-MM-YYYY');
                    return (
                      current && current < moment(customDate, 'DD-MM-YYYY')
                    );
                  }}
                />
              </Space>
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx('table')}>
        <Table
          rowKey={(record) => record._id}
          loading={loading}
          columns={columns}
          pagination={{ defaultPageSize: 5 }}
          dataSource={dataDoctor}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
