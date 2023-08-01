import React, { useState,useEffect, useContext, useRef, useReducer } from "react";
import users from "./assets/js/users";
import reducer from "./reducer";

const initialState = {
    cart: [],
    cartAmount: 0,
    cartTotal: 0,
    showAlert: false,
    productTitle: "",
}

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    //setting up the reducer state
    const [state, dispatch] = useReducer(reducer, initialState);
    const [usersData, setUsersData] = useState(users);
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
        sidebarRef.current.parentElement.classList.remove("show-sidebar");
    }
    /**Reducer functions */
    const addToCart = (id, title, qty=1, price, img) => {
        dispatch({type: "ADD_TO_CART", payload: {id, title, qty, price, img}});
    }
    const clearCart = () => {
        dispatch({type: "CLEAR_CART"});
    }
    const removeCartItem = (id) => {
        dispatch({type: "REMOVE_ITEM", payload: id});
    }
    const increaseCartItem = (id) => {
        dispatch({type: "INCREASE_ITEM", payload: id});
    }
    const decreaseCartItem = (id) => {
        dispatch({type: "DECREASE_ITEM", payload: id});
    }
    const hideAlert = () => {
        dispatch({type: "HIDE_ALERT"})
    }
    useEffect(() => {
        dispatch({type: "CART_TOTALS"});
    },[state.cart])
    //hide alert after 10 sec
    useEffect(() => {
        const dismissAlert = setTimeout(() => {
            dispatch({type: "HIDE_ALERT"})
        }, 10000);
        return () => {
            clearTimeout(dismissAlert)
        }
    },[state.showAlert])
    return  <AppContext.Provider value={
                { 
                    usersData, 
                    setUsersData, 
                    sidebarRef, 
                    formatPrice,
                    hideSidebar,
                    ...state,
                    addToCart,
                    clearCart,
                    removeCartItem,
                    increaseCartItem,
                    decreaseCartItem,
                    hideAlert, 
                }
            }>
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