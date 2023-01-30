import React, { useEffect, useLayoutEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';
import styles from './department.module.scss';
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';

import {
  openModal,
  hideModal,
  getALLDepartment,
  insertDepartment,
  updateDepartment,
  deleteDepartment,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../../../redux/reducer/modal';
import axios from 'axios';

//URL
import BASE_URL from './../../../utils/configURL';

const cx = classNames.bind(styles);
export default function Department() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nameDepartment: '',
    description: '',
    price: '',
    image: '',
    date: '',
  });

  const { dataDepartment, loading } = useSelector((state) => state.admin);
  const mode = useSelector((state) => state.modal.data.mode);
  useEffect(() => {
    dispatch(getALLDepartment());
  }, []);

  const handleOnChage = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
    setFormData(record);
  };
  const handleOk = () => {
    if (mode === 'Add') {
      setFormData('');
      return Promise.all([
        dispatch(hideModal()),
        dispatch(insertDepartment(formData)),
      ]);
    }
    if (mode === 'Edit') {
      return Promise.all([
        dispatch(hideModal()),
        dispatch(updateDepartment(formData._id, formData)),
      ]);
    }
  };

  //upload image
  const hadnleOnChangeImage = async (e) => {
    const formDataImage = new FormData();
    const file = e.target.files[0];
    formDataImage.append('image', file);
    await axios
      .post(`${BASE_URL}/upload`, formDataImage)
      .then((res) =>
        setFormData({ ...formData, [e.target.name]: res.data.data })
      );
  };
  const onCancel = () => {
    return dispatch(hideModal());
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDepartment(id));
        Swal.fire('Deleted!', 'Xóa thành công.', 'success');
      }
    });
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
      title: 'Tên khoa',
      dataIndex: 'nameDepartment',
      key: 'nameDepartment',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 200,
      className: `${cx('image')}`,
      render: (t, r) => (
        <img src={r.image ? `http://127.0.0.1:3030/${r.image}` : ''} alt="" />
      ),
    },
    {
      title: 'Hành Động',
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
              <label htmlFor="">Tên khoa</label>
              <input
                onChange={handleOnChage}
                type="text"
                placeholder="vui lòng nhập vào tên khoa"
                value={formData?.nameDepartment || ''}
                name="nameDepartment"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Mô tả</label>
              <input
                onChange={handleOnChage}
                type="text"
                placeholder="vui lòng nhập vào Mô tả"
                value={formData?.description || ''}
                name="description"
              />
            </div>

            <div className={cx('form-item')}>
              <label htmlFor="">Giá tiền</label>
              <input
                onChange={handleOnChage}
                type="number"
                placeholder="vui lòng nhập giá tiền"
                value={formData?.price || ''}
                name="price"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Hình ảnh</label>
              <input
                onChange={hadnleOnChangeImage}
                type="file"
                value=""
                name="image"
                accept=".jpg, .jpeg, .png"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Ngày tạo</label>
              <input
                onChange={handleOnChage}
                type="date"
                placeholder="vui lòng nhập ngày tạo"
                value={formData?.date || ''}
                name="date"
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
          dataSource={dataDepartment}
          pagination={{ defaultPageSize: 5 }}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
