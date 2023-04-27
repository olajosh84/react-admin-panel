import { useGlobalContext } from "../context";
const Cart = () => {
    const { customerCart, setCustomerCart, formatPrice } = useGlobalContext();
    let total = 0;

    const deleteItem = (id) => {
        setCustomerCart(prevItems => prevItems.filter(item => item.id !== id));
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
                                customerCart.map(items => {
                                    const {id, img, title, price} = items;
                                    let productQty = 2, amount = productQty * price;
                                    total += amount ;
                                    return <tr key={id}>
                                                <td>
                                                    <button className="remove-product-btn" onClick={() => deleteItem(id)}><i className="fas fa-times"></i></button>
                                                </td>
                                                <td>
                                                    <img src={require(`../assets/images/products/${img}`)} alt=""  />
                                                </td>
                                                <td>{title}</td>
                                                <td>{formatPrice(price)}</td>
                                                <td>
                                                    <div className="qty">
                                                        <button><i className="fas fa-minus"></i></button>
                                                        <input type="number" min="1" defaultValue="2"  />
                                                        <button><i className="fas fa-plus"></i></button>
                                                    </div>
                                                </td>
                                                <td>{formatPrice(amount)}</td>
                                            </tr>
                                })
                            }
                            {customerCart.length < 1 && <tr><td colSpan="6">Cart is empty</td></tr> }
                        </tbody>
                    </table>
                </div>
                <div className="cart-footer">
                    <div className="coupon">
                        <input type="text" placeholder="Coupon Code"/>
                        <button>apply coupon</button>
                    </div>
                    <button className="update-cart-btn">update cart</button>
                </div>
                <div className="cart-totals-container">
                    <div style={{visibility: "hidden"}}>This is a dummy element</div>
                    <div className="cart-totals">
                        <h2>cart totals</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <th>subtotal</th>
                                    <td>{formatPrice(total)}</td>
                                </tr>
                                <tr>
                                    <th>total</th>
                                    <td>{formatPrice(total)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="cart-totals-btn">procedd to checkout</button>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Cart;