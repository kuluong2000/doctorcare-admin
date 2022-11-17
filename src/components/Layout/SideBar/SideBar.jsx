import React from 'react';
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faHouseChimney,
  faPaw,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import SideMenu from './SideMenu';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
export default function SideBar() {
  const toggleSidebar = useSelector((state) => state.sidebarToggle.classes);
  // const data_user = JSON.parse(localStorage.getItem('data-user')).data[0]
  //   .account.people;
  const data_user = JSON.parse(localStorage.getItem('data-user')).data
    ?.account[0];
  console.log(data_user);
  let sideBarMenu = [];
  if (data_user.role.nameRole === 'admin') {
    sideBarMenu = [
      {
        icon: <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>,
        title: 'Quản lý tài khoản',
        to: 'quan-ly-tai-khoan',
      },
      {
        icon: <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>,
        title: 'Quản lý bác sĩ',
        to: 'quan-ly-bac-si',
      },
      {
        icon: <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>,
        title: 'Danh sách bệnh nhân',
        to: 'benh-nhan',
      },
      {
        icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
        title: 'Quản lý người dùng',
      },
      {
        icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
        title: 'Quản lý khoa',
        to: 'quan-ly-khoa',
      },
      {
        icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
        title: 'Quản lý thuốc',
        to: 'quan-ly-thuoc',
      },
      {
        icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
        title: 'Quản lý Bệnh tật',
        to: 'quan-ly-benh-tat',
      },
      {
        icon: <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>,
        title: 'Quản lý Chức vụ',
        to: 'quan-ly-chuc-vu',
      },
    ];
  }
  if (data_user.role.nameRole === 'doctor') {
    sideBarMenu = [
      {
        icon: <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>,
        title: 'Quản lý tài khoản',
        to: 'quan-ly-tai-khoan',
      },

      {
        icon: <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>,
        title: 'Quản lý lịch khám',
        to: 'quan-ly-lich-kham',
      },
    ];
  }
  // logic
  const handleClick = (e) => {
    const parentNode = e.target.parentElement.parentNode;
    const parentElement = e.target.parentElement;
    parentElement.classList.toggle(cx('open'));
    for (let item of parentNode.children) {
      if (item.className.includes(cx('open'))) {
        item.classList.remove(cx('open'));
        parentElement.classList.add(cx('open'));
      }
    }
  };
  return (
    <div className={cx('sidebar', toggleSidebar)}>
      <div className={cx('sidebar-title')}>
        <span className={cx('sidebar-title-icon')}>
          <FontAwesomeIcon icon={faPaw}></FontAwesomeIcon>
        </span>
        <span className={cx('sidebar-title-name')}>Jio Health Admin</span>
      </div>
      <div className={cx('sidebar-profile')}>
        <div className={cx('sidebar-profile-pic')}>
          <img src={require('../../../assets/images/avatar.jpg')} alt="" />
        </div>
        <div className={cx('sidebar-profile-info')}>
          <span>Welcome,</span>
          <h2>
            {data_user
              ? `${data_user?.people?.firstName || ''} ${
                  data_user?.people?.lastName || ''
                }`
              : ''}
          </h2>
        </div>
      </div>
      <div className={cx('sidebar-menu')}>
        <h3 className={cx('sidebar-general')}>Reneral</h3>
        <SideMenu data={sideBarMenu} onClick={handleClick}></SideMenu>
      </div>
    </div>
  );
}
