import { useState } from "react";
import products from "../assets/js/products";
import dummyImage from "../assets/images/dummy.jpeg";
import randomId from "../assets/js/randomid";
import { useGlobalContext } from "../context";

const Products = () => {
    const [allProducts, setAllProducts] = useState(products);
    const[productImage, setProductImage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [searchBtn, setSearchBtn] = useState({searchIcon: true, resetIcon: false});
    const [formData, setFormData] = useState({title: "", price: "", desc: ""});
    const { formatPrice } = useGlobalContext();
    
    let filteredProducts = allProducts.filter((product) => {
        const {status, title} = product;
        return  title.toLowerCase().includes(searchItem.toLowerCase()) || 
                status.toLowerCase().includes(searchItem.toLowerCase())

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
    const closeModal = () => {
        setProductImage(false)
        setShowModal(false);
        setFormData({title: "", price: "", desc: ""})
    }
    const productInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: randomId(),
            title: formData.title,
            category: "new category",
            price: formData.price,
            img: "dummy.jpeg",
            status: "in stock",
            desc: formData.desc,
        }
        setAllProducts(prevProducts => {
            return [
                ...prevProducts,
                newProduct
            ]
        })
        closeModal();
        
    }
    return (
        <section className="products-section">
            <div className="heading">
                <h2>products</h2>
            </div>
            <div className="products">
                <div className="table-tools">
                    <div className="add-product-container">
                        <button className="add-product" onClick={() => setShowModal(true)}>add new</button>
                    </div>
                    <div className="table-search-container">
                        <input type="text" value={searchItem} onChange={handleInputChange} placeholder="Search..." />
                        <button className="table-search-btn">
                            {searchBtn.searchIcon && <i className="fas fa-search"></i>}
                            {searchBtn.resetIcon && <i className="fas fa-times" onClick={clearSearchForm}></i>}
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>product</th>
                            <th>price</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredProducts.map((product, index) => {
                                const {id, title, price, status, img} = product;
                                
                                return <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td className="product">
                                                <img src={require(`../assets/images/products/${img}`)} alt="" />
                                                {title}
                                            </td>
                                            
                                            <td>{formatPrice(price)}</td>
                                            <td>
                                                <button className={`status-btn ${status === 'in stock' ? 'in-stock' : 'out-of-stock'}`}>{status}</button>
                                            </td>
                                        </tr>
                            })
                            
                        }
                        
                        {filteredProducts.length < 1 && <tr><td className="no-cap" colspan="3">No item matches your search</td></tr>}
                    </tbody>
                </table>
            </div>
            {showModal && <div className="product-modal-container">
                <div className="modal-content">
                    <div className="modal-title">
                        <h2>add new product</h2>
                        <button className="close-modal" onClick={closeModal}>close</button>
                    </div>
                    <div className="new-product-form">
                        <img src={productImage ? URL.createObjectURL(productImage) : dummyImage} alt="" />
                        <form className="form" onSubmit={handleFormSubmit}>
                            <div className="form-input">
                                <label className="image-label" htmlFor="file">upload photo <i className="fas fa-upload"></i></label>
                                <input id="file" type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} style={{display: "none"}} />
                            </div>
                            <div className="form-input">
                                <label>product title</label>
                                <input type="text" name="title" value={formData.title} placeholder="Title" onChange={productInputChange} autoComplete="off" required  />
                            </div>
                            <div className="form-input">
                                <label>product price</label>
                                <input type="number" name="price" value={formData.price} min="1" placeholder="Price" onChange={productInputChange} autoComplete="off" required  />
                            </div>
                            <div className="form-input">
                                <label>description</label>
                                <textarea name="desc" value={formData.desc} placeholder="Description" onChange={productInputChange} required  />
                            </div>
                            <button className="submit-btn">submit</button>
                        </form>
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default Products;