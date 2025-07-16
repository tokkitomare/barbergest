import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./pages/utils/Layout";
import Home from "./pages/home/Home";
import NoPage from "./pages/utils/NoPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import BarberHome from "./pages/home/BarberHome";
import ClientHome from "./pages/home/ClientHome";
import Payment from "./pages/auth/Payment";

export default function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Layout /> }>
              <Route index element={ <Home /> }/>
              <Route path="/register" element={ <Register/>} />
              <Route path="/login" element={ <Login/>} />
              <Route path="/payment" element={ <Payment /> } />
              <Route path="/barber/dashboard" element={ <BarberHome /> } />
              <Route path="/client/dashboard" element={ <ClientHome /> } />
              <Route path="*" element={ <NoPage /> }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}
{/* <Route path="" element={ < /> } /> */}