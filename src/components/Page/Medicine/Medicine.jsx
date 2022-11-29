import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './medicine.module.scss';
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';
import {
  openModal,
  hideModal,
  getAllMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

export default function Medicine() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.modal.modal.mode);
  const { loading, medicine } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    nameMedicine: '',
    description: '',
    quantity: '',
  });
  useEffect(() => {
    dispatch(getAllMedicine());
  }, [dispatch]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
    setFormData(record);
  };
  const handleOk = () => {
    if (mode === 'Add') {
      Promise.all([dispatch(createMedicine(formData)), dispatch(hideModal())]);
    }
    if (mode === 'Edit') {
      Promise.all([
        dispatch(updateMedicine(formData?._id, formData)),
        dispatch(hideModal()),
      ]);
    }
  };
  const onCancel = () => {
    dispatch(hideModal());
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
        dispatch(deleteMedicine(id));
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
      title: 'Name',
      dataIndex: 'nameMedicine',
      key: 'nameMedicine',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity ',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: 'CreateAt',
      dataIndex: 'createAt',
      key: 'createAt',
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
              <label htmlFor="">Tên thuốc</label>
              <input
                type="text"
                onChange={handleOnChange}
                name="nameMedicine"
                value={formData?.nameMedicine || ''}
                placeholder="vui lòng nhập vào tên thuốc"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Mô tả</label>
              <input
                type="text"
                onChange={handleOnChange}
                name="description"
                value={formData?.description || ''}
                placeholder="vui lòng nhập vào Mô tả"
              />
            </div>

            <div className={cx('form-item')}>
              <label htmlFor="">Số Lượng</label>
              <input
                type="number"
                onChange={handleOnChange}
                name="quantity"
                value={formData?.quantity || ''}
                placeholder="vui lòng nhập số Lượng"
              />
            </div>
            <div className={cx('form-item')}>
              <label htmlFor="">Ngày tạo</label>
              <input type="date" placeholder="vui lòng nhập ngày tạo" />
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx('table')}>
        <Table
          rowKey={(r) => r._id}
          columns={columns}
          loading={loading}
          dataSource={medicine}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
