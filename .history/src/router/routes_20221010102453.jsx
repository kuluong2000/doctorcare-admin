import React from "react";
const DefaultLayout = React.lazy(() => import("../components/Layout/defaultLayout/DefaultLayout"));
const Login = React.lazy(() => import("../components/Layout/Authen/Login"));
const Register = React.lazy(() => import("../components/Layout/Authen/Register"));
const Home = React.lazy(() => import("../components/Page/Home/Home"));
const Doctor = React.lazy(() => import("../components/Page/Doctor/Doctor"));

const ErrorPage = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../components/Page/ErrorPage/ErrorPage")), 300);
  });
});
const routerPublic = [
  {
    path: "/quan-tri",

    component: DefaultLayout,
    layout: "defaultLayout",
  },
  {
    path: "/home",
    component: Home,
    layout: null,
  },
  {
    path: "/quan-tri/quan-ly-bac-si",
    component: Doctor,
    layout: null,
  },

  {
    path: "/login",
    component: Login,
    layout: "onlyContent",
  },
  {
    path: "/register",
    component: Register,
    layout: "onlyContent",
  },
  {
    path: "/error",
    component: ErrorPage,
  },
];

export default routerPublic;