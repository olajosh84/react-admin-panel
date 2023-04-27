import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    
    return (
        <aside className="sidebar-menu">
            <div className="sidebar">
                <i className="fas fa-tachometer-alt"></i>
                <NavLink to="/">Dashboard</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-users"></i>
                <NavLink to="/customers">Customers</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-cart-plus"></i>
                <NavLink to="/products">Products</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-cart-plus"></i>
                <NavLink to="/shop">Shop</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-file-alt"></i>
                <NavLink to="/orders">Orders</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-chart-pie"></i>
                <NavLink to="/charts">Charts</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-users"></i>
                <NavLink to="/users">Users</NavLink>
            </div>
            <div className="sidebar">
                <i className="fas fa-file-alt"></i>
                <NavLink to="/modals">Modals</NavLink>
            </div>
        </aside>
    )
}

export default Sidebar;