import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import customers from "../assets/js/customers";
import orders from "../assets/js/orders";
import Navigation from "../components/Navigation";

const Customer = () => {
    const [searchItem, setSearchItem] = useState("");
    const [searchBtn, setSearchBtn] = useState({searchIcon: true, resetIcon: false});
    const page = "customers";
    //get customer info
    const { customerId } = useParams();
    const customerInfo = customers.find(customer => {
        return customer.id === customerId;
    });
    //redirect to error page 404 if info is not found
    if(!customerInfo){
        return <Navigate to='/error404'></Navigate>
    }
    const {email, name, phone, image, address, country} = customerInfo;
    
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
        <section className="customer-section">
            <div className="heading navigate">
                <h2>customer info</h2>
                <Navigation parentPage={page} />
            </div>
            <div className="customer-info">
                <img src={require(`../assets/images/users/${image}`)} alt="customer" />
                <div className="customer-details">
                    <h2>{name}</h2>
                    <p><strong>Email:</strong> <span>{email}</span></p>
                    <p><strong>Phone:</strong> <span>{phone}</span></p>
                    <p><strong>Address:</strong> <span>{address}</span></p>
                    <p><strong>Country:</strong> <span>{country}</span></p>
                </div>
            </div>
            <div className="orders">
                <div className="table-tools">
                    <div className="dummy-element">
                        <h3>transactions</h3>
                    </div>
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
                            <th>amount</th>
                            <th>payment method</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOrders.map((order) => {
                                const {id, trackingId, amount, status, paymentMethod} = order;
                                const {name, img} = order.product;
                                return <tr key={id}>
                                            <td>{trackingId}</td>
                                            <td className="product">
                                                <img src={require(`../assets/images/products/${img}`)} alt="" />
                                                {name}
                                            </td>
                                            <td>₦{amount}</td>
                                            <td>{paymentMethod}</td>
                                            <td>
                                                <button className={`status-btn ${status}`}>{status}</button>
                                            </td>
                                        </tr>
                            })
                            
                        }
                        
                        {filteredOrders.length < 1 && <tr><td className="no-cap" colSpan={4}>No item matches your search</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Customer;