import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import sidebarMenu from "../assets/js/sidebar-menu.js";

const Sidebar = () => {
    //const [ sidebar, setSidebar ] = useState(sidebarMenu);
    return (
        <aside className="sidebar-menu">
            {
                sidebarMenu.map((item) => {
                    const { id, name, icon, link } = item;
                    return(
                        <div className="sidebar" key={id}>
                            <i className={`fas ${icon}`}></i>
                            <NavLink to={link}>{name}</NavLink>
                        </div>
                    )
                        
                })
            }
            
            
        </aside>
    )
}

export default Sidebar;