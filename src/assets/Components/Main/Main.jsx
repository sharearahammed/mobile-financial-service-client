import { Outlet } from "react-router-dom";
import Navbar from "../Sheared/Navbar";
import Footer from "../Sheared/Footer";

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;