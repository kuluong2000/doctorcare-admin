import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './diseases.module.scss';
import Button from '../../common/Button/Button';
import Modals from '../../Layout/Popper/Modal';
import {
  openModal,
  hideModal,
  getALLDepartment,
  getAllDiseases,
  insertDiseases,
  updateDiseases,
  deleteDisease,
} from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

export default function Diseases() {
  const dispatch = useDispatch();
  const {
    dataDepartment: department,
    loading,
    dataDiseases: diseases,
  } = useSelector((state) => state.admin);
  const mode = useSelector((state) => state.modal.data.mode);
  const [formData, setFormData] = useState({
    nameDiseases: '',
    description: '',
    department: '',
  });
  useEffect(() => {
    const getAPI = () => {
      Promise.all([dispatch(getAllDiseases()), dispatch(getALLDepartment())]);
    };
    getAPI();
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
        dispatch(insertDiseases(formData)),
        dispatch(hideModal()),
      ]);
    }
    if (mode === 'Edit') {
      return Promise.all([
        dispatch(updateDiseases(formData._id, formData)),
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
        dispatch(deleteDisease(id));
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
      title: 'Tên bệnh',
      dataIndex: 'nameDiseases',
      key: 'nameDiseases',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'Tên khoa',
      dataIndex: 'department',
      key: 'department',
      render: (text, record, index) => {
        return record.department?.nameDepartment;
      },
    },

    {
      title: 'Hành động',
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
  const handleOnChangeOption = (e) => {
    setFormData({ ...formData, department: e.target.value });
  };

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
              <label htmlFor="">Tên bệnh</label>
              <input
                type="text"
                onChange={handleOnChange}
                name="nameDiseases"
                value={formData?.nameDiseases || ''}
                placeholder="vui lòng nhập vào tên bệnh"
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
            <div className={cx('form-item')}>
              <label htmlFor="">Khoa</label>
              <select
                onChange={handleOnChangeOption}
                name="department"
                defaultValue={
                  formData?.department ? formData?.department._id : ''
                }
              >
                {department &&
                  department.map((el, idx) => (
                    <option key={idx} name="department" value={el._id || ' '}>
                      {el.nameDepartment}
                    </option>
                  ))}
              </select>
            </div>
          </form>
        </Modals>
      </div>
      <div className={cx('table')}>
        <Table
          rowKey={(record) => record._id}
          columns={columns}
          loading={loading}
          dataSource={diseases && diseases}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
}
