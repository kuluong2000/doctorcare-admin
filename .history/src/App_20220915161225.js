import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/Layout/defaultLayout/DefaultLayout";
import OnlyContent from "./components/Layout/OnlyContent/OnlyContent";
import routerPublic from "./router/routes";
import Loading from "./components/Loading/Loading";
import Home from "./components/Page/Home/Home";
// import lib bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
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

  return (
    <div className="App">
      <React.Suspense fallback={show && <Loading classes={"dashed-loading"} />}>
        <p>1</p>
        {/* <Routes>
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
        </Routes> */}
      </React.Suspense>
    </div>
  );
}

export default App;
