import { useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import products from "../assets/js/products";
import "../assets/css/ratings.css";
import { useGlobalContext } from "../context";
import Navigation from "../components/Navigation";
import Alert from "../components/Alert";

const Product = () => {
    const [showActiveTab, setShowActiveTab] = useState({description: true, reviews: false});
    const { formatPrice, addToCart, showAlert, productTitle } = useGlobalContext();
    const inputRef = useRef(null);
    const page = 'shop';
    const handleTabSwitch = (e) => {
        let activeId = e.currentTarget.id;
        switch (activeId) {
            case "description":
                setShowActiveTab({description: true, reviews: false});
                break;
            case "reviews":
                setShowActiveTab({description: false, reviews: true});
                break;
            default:
                break;
        }
    }
    const handleQty = (e) => {
        const id = e.currentTarget.dataset.id;
        
        if(id === 'minus'){
            e.currentTarget.nextElementSibling.value--;
            if(e.currentTarget.nextElementSibling.value < 1){
                e.currentTarget.nextElementSibling.value = 1;
                return;
            }
        }else{
            e.currentTarget.previousElementSibling.value++;
        }
    }
    
    const { productId } = useParams();
    const productInfo = products.find((item) => {
        return item.id === productId;
    })
    //redirect to error 404 page if resource is not found
    if(!productInfo){
        return <Navigate to='/error404'></Navigate>
    }
    const {id, img, title, desc, price} = productInfo;
    return (
        <section className="product-section">
            {showAlert && <Alert productTitle={productTitle} productQty={inputRef.current.value} />}
            <div className="heading navigate">
                <h2>product</h2>
                <Navigation parentPage={page} />
            </div>
            <div className="product-info">
                <div className="product-details">
                    <div className="product-img-container">
                        <img src={require(`../assets/images/products/${img}`)} alt="" />
                    </div>
                    <div className="product-specific-info">
                        <h2>{title}</h2>
                        <p>{formatPrice(price)}</p>
                        <div className="product-qty">
                            <div className="input-details">
                                <button data-id="minus" onClick={handleQty}>
                                    <i className="fas fa-minus"></i>
                                </button>
                                <input type="number" min="1" defaultValue={1} ref={inputRef} />
                                <button data-id="plus" onClick={handleQty}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <button onClick={() => addToCart(id, title, Number(inputRef.current.value), price, img)}>add to cart</button>
                        </div>
                    </div>
                </div>
                <div className="product-about">
                    <div className="product-tabs">
                        <button id="description" className={`product-tab ${showActiveTab.description ? 'active' : ''}`} onClick={handleTabSwitch}>description</button>
                        <button id="reviews" className={`product-tab ${showActiveTab.reviews ? 'active' : ''}`} onClick={handleTabSwitch}>reviews</button>
                    </div>
                    {showActiveTab.description && <div className="product-about-content">
                        <div className="heading">
                            <h2>description</h2>
                        </div>
                        <p>{desc}</p>
                        <p>{desc}</p>
                        <p>{desc}</p>
                    </div>}
                    {showActiveTab.reviews && <div className="product-about-content">
                        <div className="heading">
                            <h2>reviews</h2>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <p>Your Rating</p>
                            <div className="star-rating__stars">
                                <input className="star-rating__input" type="radio" name="rating" value="1" id="rating-1" />
                                <label className="star-rating__label" htmlFor="rating-1" aria-label="One"></label>
                                <input className="star-rating__input" type="radio" name="rating" value="2" id="rating-2" />
                                <label className="star-rating__label" htmlFor="rating-2" aria-label="Two"></label>
                                <input className="star-rating__input" type="radio" name="rating" value="3" id="rating-3" />
                                <label className="star-rating__label" htmlFor="rating-3" aria-label="Three"></label>
                                <input className="star-rating__input" type="radio" name="rating" value="4" id="rating-4" />
                                <label className="star-rating__label" htmlFor="rating-4" aria-label="Four"></label>
                                <input className="star-rating__input" type="radio" name="rating" value="5" id="rating-5" />
                                <label className="star-rating__label" htmlFor="rating-5" aria-label="Five"></label>
                            </div>
                            
                            <div className="form-input">
                                <label>name</label>
                                <input type="text" placeholder="Name" required  />
                            </div>
                            <div className="form-input">
                                <label>email</label>
                                <input type="email" placeholder="Email"  required  />
                            </div>
                            <div className="form-input">
                                <label>your review</label>
                                <textarea name="desc"  placeholder="Review" required  />
                            </div>
                            <button className="submit-btn">submit</button>
                        </form>
                    </div>}
                </div>
            </div>
            <div className="other-product-info">
                <div className="product-categories">
                    <div className="category-title">
                        <h2>product categories</h2>
                    </div>
                    <div className="product-category-list">
                        <ul>
                            <li>shoes<span>(34)</span></li>
                            <li>electronics<span>(12)</span></li>
                            <li>shoes<span>(9)</span></li>
                            <li>furniture<span>(5)</span></li>
                            <li>wrist watches<span>(3)</span></li>
                            <li>laptops<span>(10)</span></li>
                            <li>Fashion<span>(15)</span></li>
                            <li>Phones<span>(50)</span></li>
                        </ul>
                    </div>
                </div>
                <div className="latest-products">
                    <div className="latest-products-title">
                        <h2>latest products</h2>
                    </div>
                    <div className="latest">
                        {
                            products.map(item => {
                                const {id, title, price, img} = item;
                                return  <div className="latest-product" key={id}>
                                            <img src={require(`../assets/images/products/${img}`)} alt="product" />
                                            <div className="latest-product-info">
                                                <h4>{title}</h4>
                                                <p>{formatPrice(price)}</p>
                                            </div>
                                        </div>
                            }).slice(0,5)
                             
                        }
                        
                    </div>
                </div>
                <div className="product-tags">
                    <div className="tags-title">
                        <h2>product tags</h2>
                    </div>
                    <div className="tag-btns">
                        <button className="tag">wrist watches</button>
                        <button className="tag">foot wears</button>
                        <button className="tag">bracelets</button>
                        <button className="tag">shoes</button>
                        <button className="tag">kitchen utensils</button>
                        <button className="tag">clothes</button>
                        <button className="tag">phones</button>
                        <button className="tag">laptops</button>
                        <button className="tag">furniture</button>
                        <button className="tag">bags</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product;