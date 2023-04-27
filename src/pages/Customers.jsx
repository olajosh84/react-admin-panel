import { useState } from "react";
import { Link } from "react-router-dom";
import customers from "../assets/js/customers"; 

const Customers = () => {
    const [searchItem, setSearchItem] = useState("");
    const [searchBtn, setSearchBtn] = useState({searchIcon: true, resetIcon: false});
    const filteredCustomers = customers.filter((customer) => {
        const { name, email, username } = customer;
        return  name.toLowerCase().includes(searchItem.toLowerCase()) ||
                email.toLowerCase().includes(searchItem.toLowerCase()) ||
                username.toLowerCase().includes(searchItem.toLowerCase())
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
        <section className="customers-section">
            <div className="heading">
                <h2>customers</h2>
            </div>
            <div className="customers">
                <div className="table-tools">
                    {/*<div className="add-customer-container">
                        <button className="add-customer">add new</button>
                    </div>*/}
                    <div className="table-search-container">
                        <input type="text" name="table-search" autoFocus value={searchItem} placeholder="Search..." onChange={handleInputChange} />
                        <button className="table-search-btn">
                            {searchBtn.searchIcon && <i className="fas fa-search"></i>}
                            {searchBtn.resetIcon && <i className="fas fa-times" onClick={clearSearchForm}></i>}
                        </button>
                    </div>
                </div>
                <table className="table responsive-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Action</th>      
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCustomers.map((item, index) => {
                                const { id, name, email, username } = item;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{username}</td>
                                        <td>
                                            <Link to={`/customers/${id}`}>
                                                <button className="view-customer">view</button>
                                            </Link>
                                            {/*<button className="delete-customer">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>*/}
                                        </td>
                                        
                                    </tr>
                                    
                                )
                            })
                        }
                        {filteredCustomers.length < 1 && <tr><td colspan="4">No item matches your search</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Customers;

