import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BarberHome from "./pages/BarberHome";
import ClientHome from "./pages/ClientHome";

export default function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Layout /> }>
              <Route index element={ <Home /> }/>
              <Route path="/register" element={ <Register/>} />
              <Route path="/login" element={ <Login/>} />
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