import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const SharedLayout = () => {
    
    return (
        <>
            <Navbar />
            <main className="container">
                <Sidebar />
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default SharedLayout;