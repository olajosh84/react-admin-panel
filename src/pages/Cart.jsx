import {useState, useRef} from "react";
import { useGlobalContext } from "../context";
const coupon = "olajeks";

const Cart = () => {
    const { cart, cartTotal, removeCartItem, increaseCartItem, decreaseCartItem, formatPrice } = useGlobalContext();
    const [hasCoupon,setHasCoupon] = useState(false);
    const couponRef = useRef(null);
    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if(!couponRef.current.value){
            alert("Please enter a coupon code");
            return;
        }
        if(couponRef.current.value === coupon){
            setHasCoupon(true);
        }else{
            alert("Please enter a valid coupon code");
        }
        couponRef.current.value = "";
    }

    return (
        <section className="cart-section">
            <div className="heading">
                <h2>cart</h2>
            </div>
            <div className="cart-container">
                <div className="cart-product-details">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>product</th>
                                <th>price</th>
                                <th>quantity</th>
                                <th>total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(items => {
                                    const {id, img, title, price, qty} = items;
                                    
                                    return <tr key={id}>
                                                <td>
                                                    <button className="remove-product-btn" onClick={() => removeCartItem(id)}><i className="fas fa-times"></i></button>
                                                </td>
                                                <td>
                                                    <img src={require(`../assets/images/products/${img}`)} alt=""  />
                                                </td>
                                                <td>{title}</td>
                                                <td>{formatPrice(price)}</td>
                                                <td>
                                                    <div className="qty">
                                                        <button><i className="fas fa-minus" onClick={() => decreaseCartItem(id)}></i></button>
                                                        <div className="cartQty">{qty}</div>
                                                        <button><i className="fas fa-plus" onClick={() => increaseCartItem(id)}></i></button>
                                                    </div>
                                                </td>
                                                <td>{formatPrice(qty * price)}</td>
                                            </tr>
                                })
                            }
                            {cart.length < 1 && <tr><td colSpan="6">Cart is empty</td></tr> }
                        </tbody>
                    </table>
                </div>
                {cart.length > 0 && <div className="cart-footer">
                    <div className="coupon">
                        <input type="text" placeholder="Coupon Code (e.g olajeks)" ref={couponRef} />
                        <button onClick={handleApplyCoupon}>apply coupon</button>
                    </div>
                    <button className="update-cart-btn">update cart</button>
                </div>}
                {cart.length > 0 && <div className="cart-totals-container">
                    <div style={{visibility: "hidden"}}>This is a dummy element</div>
                    <div className="cart-totals">
                        <h2>cart totals</h2>
                        <table>
                            <tbody>
                            <tr>
                                    <th>subtotal</th>
                                    <td>{formatPrice(cartTotal)}</td>
                                </tr>
                                {
                                    hasCoupon &&
                                    <tr>
                                        <th>Less Coupon</th>
                                        <td>{formatPrice(0.10 * cartTotal)}</td>
                                    </tr>  
                                }
                                
                                <tr>
                                    <th>total</th>
                                    <td>
                                        {
                                            hasCoupon ? formatPrice(cartTotal - (0.10 * cartTotal)) : formatPrice(cartTotal) 
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="cart-totals-btn">proceed to checkout</button>
                    </div>
                </div>}
            </div>
            
        </section>
    )
}

export default Cart;