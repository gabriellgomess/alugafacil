import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyContextProvider, { MyContext } from "./contexts/MyContext";
import { NextUIProvider } from "@nextui-org/react";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Imoveis from "./pages/Imoveis"

function WithAuthentication({ children }) {
  const { rootState } = useContext(MyContext);
  const { isAuth } = rootState;
  return isAuth ? (
    children
  ) : (
    <Navigate to={`${import.meta.env.VITE_REACT_APP_PATH}`} replace />
  );
}


const App = () => {
  return (
    <MyContextProvider>
      <NextUIProvider>
        <WithAuthentication>
          <Header />
        </WithAuthentication>
        <div style={{ width: '90%', maxWidth: '1600px', margin: '0 auto' }}>
          <Routes>
            <Route path={`${import.meta.env.VITE_REACT_APP_PATH}`} element={<Home />} />
            <Route
              path={`${import.meta.env.VITE_REACT_APP_PATH}dashboard`}
              element={
                <WithAuthentication>
                  <Dashboard />
                </WithAuthentication>
              }
            />
            <Route
              path={`${import.meta.env.VITE_REACT_APP_PATH}imoveis`}
              element={
                <WithAuthentication>
                  <Imoveis />
                </WithAuthentication>
              }
            />
          </Routes>
        </div>

      </NextUIProvider>
    </MyContextProvider>
  );
};

export default App;
