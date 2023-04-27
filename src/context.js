import React, { useState, useContext, useRef } from "react";
import users from "./assets/js/users";
import products from "./assets/js//products";

const cartProducts = products.map(item => {
    return item;
}).slice(0, 2);

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [usersData, setUsersData] = useState(users);
    const [customerCart,setCustomerCart] = useState(cartProducts);
    const sidebarRef = useRef(null);
    //format price
    const formatPrice = (price) => {
        let dollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return dollar.format(price);
    }
    function hideSidebar(){
        sidebarRef.current.classList.remove("show-sidebar");
    }
    return  <AppContext.Provider value={{ usersData, setUsersData, customerCart, setCustomerCart, sidebarRef, formatPrice, hideSidebar }}>
                { children }
            </AppContext.Provider>
}

//custom hook
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {
    AppContext, AppProvider, useGlobalContext
}