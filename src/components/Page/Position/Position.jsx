import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './position.module.scss';
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';

import {
  openModal,
  hideModal,
  getAllPosition,
  insertPosition,
  updatePosition,
  deletePosition,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
export default function Position() {
  const dispatch = useDispatch();
  const { loading, dataPosition: position } = useSelector(
    (state) => state.admin
  );
  const mode = useSelector((state) => state.modal.data.mode);
  const [formData, setFormData] = useState({
    namePosition: '',
    description: '',
  });
  useEffect(() => {
    dispatch(getAllPosition());
  }, [dispatch]);

  //#####################################################
  //##  HANDLE LOGIC
  //#####################################################
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (mode, record) => {
    dispatch(openModal(mode, record));
    setFormData(record);
  };
  const handleOk = () => {
    if (mode === 'Add') {
      return Promise.all([
        dispatch(insertPosition(formData)),
        dispatch(hideModal()),
      ]);
    }
    if (mode === 'Edit') {
      return Promise.all([
        dispatch(updatePosition(formData._id, formData)),
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
        dispatch(deletePosition(id));
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
      dataIndex: 'namePosition',
      key: 'namePosition',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

  //#####################################################
  //##  JSX RENDER
  //#####################################################
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
          loading={loading}
          dataSource={position}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
