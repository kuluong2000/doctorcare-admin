import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './account.module.scss';
import BASE_URL from '../../../utils/configURL';

//import comp
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';
//import redux
import { openModal, hideModal, getAllAccount } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(styles);
export default function Account() {
  const dispatch = useDispatch();
  const { accounts, loading } = useSelector((state) => state.account);
  const [formData, setFormData] = useState('');

  useEffect(() => {
    dispatch(getAllAccount());
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
  };
  const handleOk = async () => {
    const data = await axios.post(`${BASE_URL}/user/signUp`, formData);
    console.log(data);
    dispatch(hideModal());
  };
  const onCancel = () => {
    dispatch(hideModal());
  };
  const lockAccount = () => {};
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 100,
      render: (text, record, index) => index,
    },
    {
      title: 'Tài Khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Quyền',
      dataIndex: 'accountType',
      key: 'accountType',
      render: (text, record) => record?.role?.nameRole || 'user',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (idx, record) => {
        return {
          props: {
            style: { color: 'red' },
          },
          children: record?.status === false ? 'Đang hoạt động' : 'Đã khóa',
        };
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
            sửa
          </Button>
          <Button
            className={`btn-danger bg-danger`}
            onClick={() => lockAccount(record.id)}
          >
            Khóa
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
              <label htmlFor="">Tên</label>
              <input
                onChange={handleOnChange}
                type="text"
                placeholder="vui lòng nhập vào tên"
                value={formData?.lastName || ''}
                name="lastName"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Họ</label>
              <input
                onChange={handleOnChange}
                type="text"
                placeholder="vui lòng nhập vào Họ"
                value={formData?.firstName || ''}
                name="firstName"
              />
            </div>

            <div className={cx('form-item')}>
              <label htmlFor="">Tài Khoản</label>
              <input
                onChange={handleOnChange}
                type="text"
                placeholder="vui lòng nhập tên tài khoản"
                value={formData?.username || ''}
                name="username"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Mật Khẩu</label>
              <input
                onChange={handleOnChange}
                type="text"
                placeholder="vui lòng nhập mật khẩu"
                value={formData?.password || ''}
                name="password"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Quyền</label>
              <select name="accountType" id="" defaultValue={formData || ''}>
                <option value="Admin">Admin</option>
                <option value="Người dùng">Người dùng</option>
                <option value="bác sĩ">Bác sĩ</option>
              </select>
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx('table')}>
        <Table
          rowKey={(r) => r._id}
          columns={columns}
          loading={loading}
          dataSource={accounts}
          pagination={{ defaultPageSize: 5 }}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
