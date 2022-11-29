import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './statistic.module.scss';
import { Line } from '@ant-design/charts';
import { getAllStatisticByMonthOfYear } from './../../../redux/action';
import { DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

export default function Statistic() {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const data = useSelector((state) => state.admin.statistic);
  useEffect(() => {
    dispatch(
      getAllStatisticByMonthOfYear(
        new Date().getMonth() + 1,
        new Date().getFullYear()
      )
    );
  }, []);
  const onChange = (date, dateString) => {
    setMonth(dateString.split('-')[1] * 1);
    dispatch(
      getAllStatisticByMonthOfYear(
        dateString.split('-')[1] * 1,
        dateString.split('-')[0] * 1
      )
    );
  };

  const config = {
    data,
    xField: '_id',
    yField: 'total',
    label: {},
    point: {
      size: 2,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  return (
    <>
      <h1 className={cx('title')}>
        Thống kê số lượng bệnh nhân theo từng tháng
      </h1>
      <div className={cx('date')}>
        <span>Chọn tháng </span>
        <Space direction="vertical">
          <DatePicker onChange={onChange} picker="month" />
        </Space>
      </div>
      {data ? <Line {...config} /> : ''}
      <p className="w-100 text-center mt-3">
        Biểu đồ hiển thị số lượng đặt lịch khám của tháng {month}
      </p>
    </>
  );
}
