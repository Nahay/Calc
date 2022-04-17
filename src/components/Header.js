// import { Link } from "react-router-dom";


const Header = () => {
    return(
        <div className="header">
            <div className="header__links">
                {/* <Link to="/">Addition</Link>
                <Link to="/soustraction">Soustraction</Link>
                <Link to="/multiplication">Multiplication</Link>
                <Link to="/division">Division</Link> */}
                <a href="/">Addition</a>
                <a href="/soustraction">Soustraction</a>
                <a href="/multiplication">Multiplication</a>
                <a href="/division">Division</a>
            </div>
        </div>
    );
}

export default Header;