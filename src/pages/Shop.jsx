import { Link } from "react-router-dom";
import products from "../assets/js/products";
import { useGlobalContext } from "../context";
import Alert from "../components/Alert";
const Shop = () => {
    const { formatPrice, addToCart, showAlert, productTitle } = useGlobalContext();
    //const { customerCart, setCustomerCart } = useGlobalContext();
    /*const addToCart = (productId) => {
        
        const addedProduct = products.find(product => {
            return product.id === productId;
        })
        setCustomerCart((prevCartInfo) => {
            return [
                ...prevCartInfo,
                addedProduct
            ]
        })
    } */
    
    return (
        <section className="store-section">
            {showAlert && <Alert productTitle={productTitle} productQty={1} />}
            <div className="heading">
                <h2>shop</h2>
            </div>
            <div className="store-products">
                {
                    products.map((product) => {
                        const { id, title, price, img} = product;
                        return (
                            <div className="store-product" key={id}>
                                <div className="store-product-img">
                                    <Link to={id}><img src={require(`../assets/images/products/${img}`)} alt="" /></Link>
                                </div>
                                <h4><Link to={id}>{title}</Link></h4>
                                <p>{formatPrice(price)}</p>
                                <button className="addtocart-btn" onClick={() => addToCart(id, title, 1, price, img)}>add to cart</button>
                                {/*status && <div className="product-status">{status}</div>*/}
                            </div>
                        )
                    })
                }
                
            </div>
        </section>
    )
}

export default Shop;