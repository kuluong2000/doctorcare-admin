import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './doctor.module.scss';
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';

import {
  openModal,
  hideModal,
  getAllDoctor,
  createDoctor,
  updateDoctor,
  lockOrUnlockAccountDoctor,
  getALLDepartment,
  getAllPosition,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../common/Image/Image';
import axios from 'axios';
import BASE_URL from '../../../utils/configURL';

const cx = classNames.bind(styles);

export default function Doctor() {
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
    image: '',
    username: '',
    password: '',
    department: '',
    position: '',
    description: '',
  });
  const { loading, dataDoctor, dataDepartment, dataPosition } = useSelector(
    (state) => state.admin
  );
  const mode = useSelector((state) => state.modal.data.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      dispatch(getAllDoctor()),
      dispatch(getALLDepartment()),
      dispatch(getAllPosition()),
    ]);
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnChangeOption = (e) => {
    setFormData({ ...formData, department: e.target.value });
  };

  const showModal = (mode, record) => {
    setFormData({
      id: record?._id,
      firstName: record?.account?.people?.firstName,
      lastName: record?.account?.people?.lastName,
      email: record?.account?.people?.email,
      phone: record?.account?.people?.phone,
      address: record?.account?.people?.address,
      birthday: record?.account?.people?.birthday,
      gender: record?.account?.people?.gender,
      image: record?.account?.people?.image,
      username: record?.account?.username,
      password: record?.account?.password,
      department: record?.department?._id,
      position: record?.position?._id,
      description: record?.description,
    });
    dispatch(openModal(mode, record));
  };
  const handleOk = async () => {
    if (mode === 'Add') {
      if (file) {
        const formDataFile = new FormData();
        formDataFile.append('image', file);
        try {
          const fileImage = await axios.post(
            `${BASE_URL}/upload`,
            formDataFile
          );
          return Promise.all([
            dispatch(createDoctor({ ...formData, image: fileImage.data.data })),
            dispatch(hideModal()),
          ]);
        } catch (error) {
          return alert('tạo khong thành công');
        }
      }

      return Promise.all([
        dispatch(createDoctor(formData)),
        dispatch(hideModal()),
      ]);
    }
    if (mode === 'Edit') {
      console.log(formData.id);
      if (file) {
        const formDataFile = new FormData();
        formDataFile.append('image', file);
        try {
          const fileImage = await axios.post(
            `${BASE_URL}/upload`,
            formDataFile
          );
          return Promise.all([
            dispatch(
              updateDoctor(formData.id, {
                ...formData,
                image: fileImage.data.data,
              })
            ),
            dispatch(hideModal()),
          ]);
        } catch (error) {
          return alert('tạo khong thành công');
        }
      }

      return Promise.all([
        dispatch(updateDoctor(formData.id, formData)),
        dispatch(hideModal()),
      ]);
    }
    // dispatch(UpdateMe(id, formData));

    // dispatch(
    //   Promise.all([dispatch(createDoctor(formData)), dispatch(hideModal())])
    // );
  };
  // dispatch(hideModal());

  const onCancel = () => {
    dispatch(hideModal());
  };
  const handleLockAccountDoctor = (id) => {
    dispatch(lockOrUnlockAccountDoctor(id, { status: true }));
  };
  const handleUnLockAccountDoctor = (id) => {
    dispatch(lockOrUnlockAccountDoctor(id, { status: false }));
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
      title: 'Status',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      render: (index, data) =>
        data?.account?.status === false ? 'Đang hoạt động' : 'Đã khóa',
    },
    {
      title: 'Action',
      width: 250,
      key: 'action',
      fixed: 'right',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            className={`btn-primary bg-primary`}
            onClick={() => showModal('Edit', record)}
          >
            sửa
          </Button>
          {record?.account?.status === false ? (
            <Button
              className={`btn-danger bg-danger`}
              onClick={() => handleLockAccountDoctor(record._id)}
            >
              khóa
            </Button>
          ) : (
            <Button
              className={`btn-danger bg-danger`}
              onClick={() => handleUnLockAccountDoctor(record._id)}
            >
              Mở khóa
            </Button>
          )}
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
              <label htmlFor="">Họ</label>
              <input
                type="text"
                placeholder="vui lòng nhập vào Họ"
                name="lastName"
                onChange={handleOnChange}
                value={formData?.lastName || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Tên</label>
              <input
                type="text"
                placeholder="vui lòng nhập vào Tên"
                name="firstName"
                onChange={handleOnChange}
                value={formData?.firstName || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="vui lòng nhập vào email "
                name="email"
                onChange={handleOnChange}
                value={formData?.email || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Số điện thoại</label>
              <input
                type="Number"
                placeholder="vui lòng nhập vào phone"
                name="phone"
                onChange={handleOnChange}
                value={formData?.phone || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Address</label>
              <input
                type="text"
                placeholder="vui lòng nhập vào Address"
                name="address"
                onChange={handleOnChange}
                value={formData?.address || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Ngày sinh</label>
              <input
                type="date"
                name="birthday"
                onChange={handleOnChange}
                value={formData?.birthday || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="vui lòng nhập vào tài khoản"
                name="username"
                onChange={handleOnChange}
                value={formData?.username || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">password</label>
              <input
                type="password"
                placeholder="vui lòng nhập vào mật khẩu"
                name="password"
                onChange={handleOnChange}
                value={formData?.password || ''}
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Giới tính</label>
              <select
                onChange={handleOnChange}
                name="gender"
                value={formData?.gender || ''}
              >
                <option>Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className={cx('form-item')}>
              <label htmlFor="">chức vụ</label>
              <select
                onChange={handleOnChange}
                name="position"
                defaultValue={formData?.position ? formData?.position._id : ''}
              >
                {dataPosition &&
                  dataPosition.map((el, idx) => (
                    <option key={idx} name="position" value={el._id || ' '}>
                      {el.namePosition}
                    </option>
                  ))}
              </select>
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Phòng ban</label>
              <select
                onChange={handleOnChangeOption}
                name="department"
                defaultValue={
                  formData?.department ? formData?.department._id : ''
                }
              >
                {dataDepartment &&
                  dataDepartment.map((el, idx) => (
                    <option key={idx} name="department" value={el._id || ' '}>
                      {el.nameDepartment}
                    </option>
                  ))}
              </select>
            </div>

            <div className={cx('form-item')}>
              <label htmlFor="">Mô tả</label>
              <input
                type="text"
                placeholder="vui lòng nhập vào mô tả"
                name="description"
                onChange={handleOnChange}
                value={formData?.description || ''}
              />
            </div>

            <div className={cx('form-photo-upload')}>
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : formData?.image &&
                      `http://127.0.0.1:3030/${formData?.image}`
                }
                className={cx('form-user-photo')}
              ></Image>
              <input
                className={cx('form-upload')}
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                accept="image/*"
              />
              <label htmlFor="photo">Chọn hình ảnh</label>
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
