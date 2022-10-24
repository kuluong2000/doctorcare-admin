import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";
import { Table } from "antd";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/Layout/defaultLayout/DefaultLayout";
import OnlyContent from "./components/Layout/OnlyContent/OnlyContent";
import routerPublic from "./router/routes";
import Loading from "./components/Loading/Loading";
import Home from "./components/Page/Home/Home";
// import lib bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
//import css antd

import "./assets/css/globalStyle.scss";
function App() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => {
      setShow(false);
    };
  }, []);

  const columns = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Age",
      width: 100,
      dataIndex: "age",
      key: "age",
      fixed: "left",
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
    },
    {
      title: "Column 6",
      dataIndex: "address",
      key: "6",
    },
    {
      title: "Column 7",
      dataIndex: "address",
      key: "7",
    },
    {
      title: "Column 8",
      dataIndex: "address",
      key: "8",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
  ];
  return (
    <div className="App">
      {/* <React.Suspense fallback={show && <Loading classes={"dashed-loading"} />}>
        <Routes>
          {routerPublic.map((route, idx) => {
            let Page;
            let Layout = DefaultLayout;
            if (route.layout === "defaultLayout") {
              Page = Home;
            }
            if (route.layout === null) {
              Page = route.component;
            }
            if (route.layout === "onlyContent") {
              Layout = OnlyContent;
              Page = route.component;
            }
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </React.Suspense> */}
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
}

export default App;
