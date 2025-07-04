import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Layout /> }>
              <Route index element={ <Home /> }/>
              <Route path="*" element={ <NoPage /> }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}