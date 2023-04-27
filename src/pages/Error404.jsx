import { Link } from "react-router-dom";
const Error404 = () => {
    return (
        <section className="error-section">
            <div className="error-container">
                <h2 className="error-title error404">404</h2>
                <div className="error-details">
                    <h2>
                        <span><i className="fas fa-ban"></i></span>
                        Oops! Page not found.
                    </h2>
                    <p>
                        We could not find the page you were looking for. Meanwhile, you may return to <Link to="/">dashboard</Link> or try using the search form.
                    </p>
                    <div className="error-search">
                        <input type="text" placeholder="Search..." /> 
                        <button className="error-search-btn">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        
        
    )
}

export default Error404;