import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context.js";

const Sidebar = () => {
    const[showDropdown, setShowDropdown] = useState(false);
    const { sidebarRef, hideSidebar } = useGlobalContext();
    //show/hide drop downmenu
    const showSubmenu = (e) => {
        setShowDropdown(!showDropdown);
        const submenuContainer = e.currentTarget.firstElementChild.nextElementSibling;
        const submenu = e.currentTarget.firstElementChild.nextElementSibling.firstElementChild;
        let submenuHeight = submenu.getBoundingClientRect().height;
        submenuContainer.classList.toggle("show-dropdown");
        if(submenuContainer.classList.contains("show-dropdown")){
            submenuContainer.style.height = `${submenuHeight}px`;
        }else{
            submenuContainer.style.height = "0px";
        }
            
    }

    useEffect(() => {
        const links = Array.from(document.querySelectorAll('a.link'));
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                hideSidebar()
            })
        })
    })
    
    
    return (
        <aside className="sidebar-menu" ref={sidebarRef}>
            <div className="sidebar">
                <div className="logo sidebar-logo">
                    <h2><NavLink to="/" className='link'>olajeks</NavLink></h2>
                </div>
                <div className="close-sidebar" onClick={(e) => e.currentTarget.parentElement.parentElement.classList.remove("show-sidebar") }>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="sidebar" >
                <NavLink to="/" className='link'>
                    <i className="fas fa-tachometer-alt"></i> 
                    Dashboard
                </NavLink>
            </div>
            <div className="sidebar">
                <NavLink to="/customers" className='link'>
                    <i className="fas fa-users"></i>
                    Customers
                </NavLink>
            </div>
            <div className="sidebar">
                <NavLink to="/products" className='link'>
                    <i className="fas fa-cart-plus"></i>
                    Products
                </NavLink>
            </div>
            <div className="sidebar">
                <NavLink to="/shop" className='link'>
                    <i className="fas fa-cart-plus"></i>
                    Shop
                </NavLink>
            </div>
            <div className="sidebar">
                <NavLink to="/orders" className='link'>
                    <i className="fas fa-file-alt"></i>
                    Orders
                </NavLink>
            </div>
            <div className="sidebar">
                <NavLink to="/charts" className='link'>
                    <i className="fas fa-chart-pie"></i>
                    Charts
                </NavLink>
            </div>
            <div className="sidebar">
                <NavLink to="/users" className='link'>
                <i className="fas fa-users"></i>
                    Users
                </NavLink>
            </div>
            <div className="sidebar dropdown" onClick={showSubmenu}>
                <div className="main-menu-container">
                   <span>
                        <i className="fas fa-file-alt"></i>
                        Utilities
                    </span>
                    <span>
                        <i className={`fas ${showDropdown ? 'fas fa-angle-up' : 'fas fa-angle-down'}`}></i>
                    </span> 
                </div>
                <div className="submenu-container">
                    <div className="submenu">
                        <div className="sublink">
                            <NavLink to="/accordion" className='link'>
                                <i className="fas fa-file-alt"></i>
                                accordion
                            </NavLink>
                        </div>
                        <div className="sublink">
                            <NavLink to="/modals" className='link'>
                                <i className="fas fa-file-alt"></i>
                                Modals
                            </NavLink>
                        </div>
                        <div className="sublink">
                            <NavLink to="/error404" className='link'>
                                <i className="fas fa-ban"></i>
                                Error 404
                            </NavLink>
                        </div>
                        <div className="sublink">
                            <NavLink to="/error500" className='link'>
                                <i className="fas fa-exclamation-triangle"></i>
                                error 500
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            
        </aside>
    )
}

export default Sidebar;