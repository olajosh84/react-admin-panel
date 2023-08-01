import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import languages from "../assets/js/languages";
import { useGlobalContext } from "../context";

const Navbar = ({ setShowSidebar }) => {
    const {
        cart,  
        cartAmount,
        cartTotal,
        clearCart,
        removeCartItem, 
        sidebarRef, 
        formatPrice, 
        hideSidebar} = useGlobalContext();
    const [language,setLanguage] = useState(languages[0].name);
    const [showModals, setShowModals] = useState(
        {
            languageModal: false,
            searchModal: false, 
            notificationModal: false,
            messageModal: false,
        }
    );
    const cartRef = useRef(null);
    
    const getLanguage = (e) => {
        const chosenLanguage = e.target.textContent;
        setLanguage(chosenLanguage);
        closeModal("languageModal");
    }
    const showCartModal = () => {
        setShowModals({ messageModal: false, languageModal: false, searchModal: false, notificationModal: false
        });
        cartRef.current.parentNode.classList.add("show-cart");
        cartRef.current.classList.toggle("show-cart");
        hideSidebar();
    }
    const closeCartModal = () => {
        cartRef.current.classList.remove("show-cart");
        cartRef.current.parentNode.classList.remove("show-cart");
    }
  
    const showModal = (e) => {
        //languageModalRef.current.classList.add("show-lang-modal");
        const modalId = e.currentTarget.dataset.id;
        //console.log(modalId)
        switch (modalId) {
            case "languageModal":
                setShowModals({languageModal: true, searchModal: false, notificationModal: false,
                    messageModal: false});
                    hideSidebar()
                break;
            case "searchModal":
                setShowModals({ searchModal: !showModals.searchModal, languageModal: false,  notificationModal: false,
                    messageModal: false});
                    hideSidebar()
                break;
            case "notificationModal":
                setShowModals({ notificationModal: !showModals.notificationModal, languageModal: false, searchModal: false, 
                    messageModal: false});
                    hideSidebar()
                break;
            case "messageModal":
                setShowModals({ messageModal: !showModals.messageModal, languageModal: false, searchModal: false, notificationModal: false
                    });
                    hideSidebar()
                break;
            default:
                setShowModals({ messageModal: false, languageModal: false, searchModal: false, notificationModal: false
                });
                hideSidebar()
                break;
        }
        
    }
    const closeModal = (modalType) => {
        //languageModalRef.current.classList.remove("show-lang-modal");
        setShowModals({modalType: false});
    }
    const showSidebar = (e) => {
        sidebarRef.current.parentElement.classList.add("show-sidebar");
        sidebarRef.current.classList.add("show-sidebar");
        setShowModals({ messageModal: false, languageModal: false, searchModal: false, notificationModal: false
        });
        closeCartModal();
    }
   
    useEffect(() => {
        const links = Array.from(document.querySelectorAll("a.link"));
        links.forEach(link => {
            link.addEventListener("click", () => {
                closeCartModal();
            })
        })
    })
    return (
        <>
            <nav className="navbar">
                <div className="leftside-navbar">
                    <div className="logo nav-logo">
                        <h2><Link to='/' className='link'>olajeks</Link></h2>
                    </div>
                    <div className="menu-icon" onClick={showSidebar}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
                
                <div className="nav-icons">
                    <div data-id="searchModal" className="icon-info search" onClick={showModal}>
                        <i className="icon fas fa-search"></i>
                    </div>
                    <div data-id="languageModal" className="icon-info language" onClick={showModal}>
                        <span className="chosen-lang">{language.slice(0,3)}</span>
                        <span>
                            <i className="fas fa-globe"></i>
                        </span>
                        <span>
                            <i className="fas fa-caret-down"></i>
                        </span>
                    </div>
                    {/*<div className="icon-info color-mode">
                        <i className="icon fas fa-toggle-on"></i>
                    </div>*/}
                    <div data-id="notificationModal" className="icon-info notifications" onClick={showModal}>
                        <span>
                            <i className="icon far fa-bell"></i>
                        </span>
                        <span className="count notify-count">6</span>
                    </div>
                    <div data-id="messageModal" className="icon-info messages" onClick={showModal}>
                        <span>
                            <i className="icon far fa-comments"></i>
                        </span>
                        <span className="count mssg-count">3</span>
                    </div>
                    <div data-id="cartModal" className="icon-info cart" onClick={showCartModal}>
                        {/*<i className="icon fas fa-cog"></i>*/}
                        <span>
                            <i className="icon fas fa-cart-plus"></i>
                        </span>
                        <span className="count cart-count">{cartAmount}</span>
                    </div>
                </div>
            </nav>
            {showModals.languageModal && <div className="lang-modal" onClick={(e) => e.target.classList.contains('lang-modal') ? closeModal("languageModal") : ''}>
                <div className="lang-modal-content">
                    <div className="lang-heading">
                        <h2>Select language</h2>
                    </div>
                    <div className="all-languages">
                        {
                           languages.map(item => {
                                const { id, name } = item;
                                return (
                                    <div className="lang-container" key={id}>
                                        <div className="lang" onClick={getLanguage}>
                                            {name}
                                        </div>
                                    </div>
                                )
                           }) 
                        }
                        
                    </div>
                    <div className="close-lang" onClick={() => closeModal("languageModal")}>
                        <h2>Close</h2>
                    </div>
                </div>
            </div>}
            {showModals.notificationModal && <div className="notification-container" onClick={(e) => e.target.classList.contains("notification-container") ? closeModal("notificationModal") : ""}>
                <div className="notification-popup">
                    <h4 className="title">6 notifications</h4>
                    <div className="notification-item">
                        <div className="item-count">
                            <span><i className="fas fa-envelope"></i></span>
                            <span>2 new messages</span>
                        </div>
                        <span>12 mins ago</span>
                    </div>
                    <div className="notification-item">
                        <div className="item-count">
                            <span><i className="fas fa-file-alt"></i></span>
                            <span>2 new orders</span>
                        </div>
                        <span>20 mins ago</span>
                    </div>
                    <div className="notification-item">
                        <div className="item-count">
                            <span><i className="fas fa-users"></i></span>
                            <span>2 new customers</span>
                        </div>
                        <span>55 mins ago</span>
                    </div>
                    <h4 className="title-bottom">See all notifications</h4>
                </div>
            </div>}
            {showModals.messageModal && <div className="messages-container" onClick={(e) => e.target.classList.contains("messages-container") ? closeModal("messageModal") : ""}>
                <div className="messages-popup">
                    <div className="message-info">
                        <img src={require(`../assets/images/users/user2.jpg`)} alt="user" />
                        <div className="message-hint">
                            <h4>john doe</h4>
                            <p>please call me. It is urgent</p>
                            <p>20 mins ago</p>
                        </div>
                    </div>
                    <div className="message-info">
                        <img src={require(`../assets/images/users/user4.jpg`)} alt="user" />
                        <div className="message-hint">
                            <h4>jane doe</h4>
                            <p>I missed your call</p>
                            <p>40 mins ago</p>
                        </div>
                    </div>
                    <div className="message-info">
                        <img src={require(`../assets/images/users/user7.jpg`)} alt="user" />
                        <div className="message-hint">
                            <h4>lagbaja</h4>
                            <p>I got your message</p>
                            <p>1 hour ago</p>
                        </div>
                    </div>
                    <h4 className="title-bottom">See all messages</h4>
                </div>
            </div>}
            {showModals.searchModal && <div className="search-container" onClick={(e) => e.target.classList.contains("search-container") ? closeModal("searchModal") : ""}>
                <div className="search-popup">
                    <input type="text" placeholder="Search..." />
                    <button><i className="fas fa-search"></i></button>
                </div>
            </div>}
            <div className="cart-modal-overlay" onClick={(e) => e.target.classList.contains("cart-modal-overlay") ? closeCartModal() : ""}>
                <div className="cart-modal-content" ref={cartRef}>
                    <div className="header">
                        <h2>your cart</h2>
                        <i className="fas fa-times close-cart-modal" onClick={closeCartModal}></i>
                    </div> 
                    <div className="cart-info">
                        {
                            cart.map(item => {
                                const {id, title, qty, price, img} = item;
                                
                                return  <div className="product-details" key={id}>
                                            <div className="product-img">
                                                <img src={require(`../assets/images/products/${img}`)} alt="" />
                                                <button onClick={() => removeCartItem(id)}>remove</button>
                                            </div>
                                            <div className="product-info">
                                                <h4>{title}</h4>
                                                <div className="amount">
                                                    <span className="qty">{qty}</span>
                                                    <span>x</span>
                                                    <span className="price">{formatPrice(price)}</span>
                                                    <span>=</span>
                                                    <span className="total">{formatPrice(price * qty)}</span>
                                                </div>
                                            </div>
                                        </div>
                            })
                        
                        }
                        {cart.length < 1 && <div className="product-details">Cart is empty</div>}
                        {cart.length > 0 && <div className="cart-info-footer">
                            <h4>subtotal: <span>{formatPrice(cartTotal)}</span></h4>
                            <p>To find out your shipping cost , Please proceed to checkout.</p>
                            <button>
                                <Link to="/shop/cart" className="link">view cart</Link>
                            </button>
                            <button onClick={clearCart}>clear cart</button>
                            <button>
                                <Link to='/shop' className="link">continue shopping </Link>
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;