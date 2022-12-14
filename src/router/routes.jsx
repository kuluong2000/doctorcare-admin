import React from 'react';
const DefaultLayout = React.lazy(() =>
  import('../components/Layout/defaultLayout/DefaultLayout')
);
const Login = React.lazy(() => import('../components/Layout/Authen/Login'));
const Register = React.lazy(() =>
  import('../components/Layout/Authen/Register')
);
const Home = React.lazy(() => import('../components/Page/Home/Home'));
const Account = React.lazy(() => import('../components/Page/Account/Account'));
const Doctor = React.lazy(() => import('../components/Page/Doctor/Doctor'));
const Medicine = React.lazy(() =>
  import('../components/Page/Medicine/Medicine')
);
const Department = React.lazy(() =>
  import('../components/Page/Department/Department')
);
const Diseases = React.lazy(() =>
  import('../components/Page/Diseases/Diseases')
);
const Position = React.lazy(() =>
  import('../components/Page/Position/Position')
);
const Schedule = React.lazy(() =>
  import('../components/Page/Schedule/Schedule')
);
const Patient = React.lazy(() => import('../components/Page/Patient/Patient'));
const Statistic = React.lazy(() =>
  import('../components/Page/Statistic/Statistic')
);
const DoctorWorkingTime = React.lazy(() =>
  import('../components/Page/doctorWorkingTime/DoctorWorkingTime')
);

const ErrorPage = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import('../components/Page/ErrorPage/ErrorPage')),
      300
    );
  });
});
const routerPublic = [
  {
    path: '/quan-tri',

    component: DefaultLayout,
    layout: 'defaultLayout',
  },
  {
    path: '/home',
    component: Home,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-tai-khoan',
    component: Account,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-bac-si',
    component: Doctor,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-thoi-gian-lam-viec',
    component: DoctorWorkingTime,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-khoa',
    component: Department,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-thuoc',
    component: Medicine,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-benh-tat',
    component: Diseases,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-chuc-vu',
    component: Position,
    layout: null,
  },
  {
    path: '/quan-tri/quan-ly-lich-kham',
    component: Schedule,
    layout: null,
  },
  {
    path: '/quan-tri/benh-nhan',
    component: Patient,
    layout: null,
  },
  {
    path: '/quan-tri/thong-ke',
    component: Statistic,
    layout: null,
  },

  {
    path: '/quan-tri/login',
    component: Login,
    layout: 'onlyContent',
  },
  {
    path: '/quan-tri/register',
    component: Register,
    layout: 'onlyContent',
  },
  {
    path: '*',
    component: ErrorPage,
    layout: null,
  },
];

export default routerPublic;
