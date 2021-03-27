/*
    Renders the title on the screen, and the navigational links on the side
*/

import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="banner">
            <h1>Joseph's Projects</h1>
            <div className="spacer"></div>
            <nav className="site-links">
                <Link to="/portfolio"><h2>Projects</h2></Link>
                <Link to="/posts"><h2>Blog</h2></Link>
                <a href="http://github.com/rakhyvel"><h2>GitHub</h2></a>
            </nav>
        </header>
    )
}

export default Header
