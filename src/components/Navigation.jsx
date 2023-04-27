import { Link } from "react-router-dom";

const Navigation = ({parentPage}) => {
    return (
        <div className="navigation">
            <span>
                <Link to='/'>home</Link>
            </span>
            <span>/</span> 
            <span>
                <Link to={`/${parentPage}`}>{parentPage}</Link>
            </span>
        </div>
    )
}

export default Navigation;