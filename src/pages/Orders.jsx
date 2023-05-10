import { useState } from "react";
import orders from "../assets/js/orders";

const Orders = () => {
    const [searchItem, setSearchItem] = useState("");
    const [searchBtn, setSearchBtn] = useState({searchIcon: true, resetIcon: false});
    let filteredOrders = orders.filter((order) => {
        const {trackingId, status, paymentMethod, customer} = order;
        const {name} = order.product;
        return  trackingId.includes(searchItem) || 
                status.toLowerCase().includes(searchItem.toLowerCase()) ||
                paymentMethod.toLowerCase().includes(searchItem.toLowerCase()) ||
                customer.toLowerCase().includes(searchItem.toLowerCase()) ||
                name.toLowerCase().includes(searchItem.toLowerCase());

    })
    const handleInputChange = (e) => {
        let value = e.target.value;
        if(value){
            setSearchBtn(prevState => {
                return {
                    searchIcon: false,
                    resetIcon: true
                }
            })
        }else{
            setSearchBtn(prevState => {
                return {
                    searchIcon: true,
                    resetIcon: false
                }
            })
        }
        setSearchItem(value);
    }
    const clearSearchForm = (e) => {
        e.preventDefault();
        setSearchItem("");
        setSearchBtn(prevState => {
            return {
                searchIcon: true,
                resetIcon: false
            }
        })
    }
    return (
        <section className="orders-section">
            <div className="heading">
                <h2>orders</h2>
            </div>
            <div className="orders">
                <div className="table-tools">
                    {/*<div className="dummy-element"></div>*/}
                    <div className="table-search-container">
                        <input type="text" name="table-search" value={searchItem} onChange={handleInputChange} placeholder="Search..." />
                        <button className="table-search-btn">
                            {searchBtn.searchIcon && <i className="fas fa-search"></i>}
                            {searchBtn.resetIcon && <i className="fas fa-times" onClick={clearSearchForm}></i>}
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>tracking ID</th>
                            <th>product</th>
                            <th>customer</th>
                            <th>amount</th>
                            <th>payment method</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOrders.map((order) => {
                                const {id, trackingId, customer, amount, status, paymentMethod} = order;
                                const {name, img} = order.product;
                                return <tr key={id}>
                                            <td>{trackingId}</td>
                                            <td className="product">
                                                <img src={require(`../assets/images/products/${img}`)} alt="product" />
                                                {name}
                                            </td>
                                            <td>{customer}</td>
                                            <td>₦{amount}</td>
                                            <td>{paymentMethod}</td>
                                            <td>
                                                <button className={`status-btn ${status}`}>{status}</button>
                                            </td>
                                        </tr>
                            })
                            
                        }
                        
                        {filteredOrders.length < 1 && <tr><td className="no-cap" colspan="5">No item matches your search</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Orders;