
const reducer = (state, action) => {
    
    if(action.type === "ADD_TO_CART"){
        const {id, title, qty, price, img} = action.payload;
        //if qty is less than 1, maintain status quo
        if(qty < 1){
            return {...state};
        } 
        const newItem = {id, title, qty, price, img}
        let freshCart;
        if(state.cart.some(item => item.id === id)){
            freshCart = state.cart.map(items => {
                if(items.id === id){
                    return {...items, qty: items.qty + qty}
                }
                return items; 
            })
        }else{
            freshCart = [...state.cart, newItem];
        }
        return {...state, showAlert:true, productTitle: title, cart: freshCart}
    }

    if(action.type === "CLEAR_CART"){
        return {...state, cart: []};
    }

    if(action.type === "REMOVE_ITEM"){
        const newCart = state.cart.filter(item => item.id !== action.payload);
        return {...state, cart: newCart}
    }

    if(action.type === "INCREASE_ITEM"){
        const increasedCart = state.cart.map(item => {
            if(item.id === action.payload){
                return {...item, qty: item.qty + 1}
            }
            return item;
        });
        return {...state, cart: increasedCart}
    }

    if(action.type === "DECREASE_ITEM"){
        let decreasedCart = state.cart.map(item => {
            if(item.id === action.payload){
                return {...item, qty: item.qty - 1}
            }
            return item;
        }).filter(item => !item.qty < 1)
        return {...state, cart: decreasedCart}
    }

    if(action.type === "CART_TOTALS"){
        let {cartAmount, cartTotal} = state.cart.reduce((totals, items) => {
            const { qty, price } = items;
            const itemTotal = qty * price;
            totals.cartTotal += itemTotal;
            totals.cartAmount += qty;
            return totals;
        },
        {
            cartAmount: 0,
            cartTotal: 0,
        })

        return {...state, cartAmount, cartTotal}
    }

    if(action.type === "HIDE_ALERT"){
        return {...state, showAlert: false}
    }

    return state;
}


export default reducer;