import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Alert = ({productTitle, productQty}) => {
    const {hideAlert} = useGlobalContext();
    
    return (
        <div className="cart-alert">
            <div className="alert-left">
                <span className="alert-icon"><i className="fa fa-check"></i></span>
                <div>
                    <span style={{marginRight:"0.5rem"}}> {productQty} {productTitle} added to cart.</span>
                    <span className="cart-link" onClick={hideAlert}><Link to='/shop/cart'>View cart</Link></span>
                </div>
            </div>
            <div className="alert-right" onClick={hideAlert}>
                <span className="alert-close">
                    <i className="fa fa-times"></i>
                </span>
            </div>
        </div>
    )
}

export default Alert;