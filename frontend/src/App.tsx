import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/utils/Layout";
import Home from "./pages/home/Home";
import NoPage from "./pages/utils/NoPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import BarberHome from "./pages/home/BarberHome";
import ClientHome from "./pages/home/ClientHome";
import Payment from "./pages/auth/Payment";
import { useEffect, useState } from "react";

export default function App() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/barber/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setAuth(true);
        } else if (response.status === 403) {
          setAuth(false);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

      } catch (e) {
        console.error(e);
        setAuth(false);
      }
    }

    checkAuth();
  }, []);

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Layout /> }>
              <Route index element={ <Home /> }/>
              <Route path="/register" element={ <Register/>} />
              <Route path="/login" element={ <Login/>} />
              <Route path="/payment" element={ <Payment /> } />
              <Route path="/barber/dashboard" element={ 
                auth ?
                <BarberHome /> : <Navigate to="/"/>
                
                } />
              <Route path="/client/dashboard" element={ 
                auth ?
                <ClientHome /> : <Navigate to="/"/>
                } />
              <Route path="*" element={ <NoPage /> }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}
{/* <Route path="" element={ < /> } /> */}