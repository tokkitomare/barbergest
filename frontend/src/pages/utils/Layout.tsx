import { Outlet } from "react-router-dom";
import NavBar from "../../components/Nav";

export default function Layout() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <NavBar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
}