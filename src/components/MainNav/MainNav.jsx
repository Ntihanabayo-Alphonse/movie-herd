import { FaSearch } from 'react-icons/fa';
import { FaArrowTrendUp, FaFilm } from 'react-icons/fa6';
import { IoIosTv } from "react-icons/io";
import { IconContext } from 'react-icons';
import './MainNav.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MainNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    }

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    }

    return (
        <IconContext.Provider value={{ className: 'nav-icons' }}>
            <nav className="main-nav">
                <ul className='main-nav-list'>
                    <li className={`main-nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => handleNavigation('/')}>
                        <FaArrowTrendUp />
                        <span className='main-nav-item-text'>Trending</span>
                    </li>
                    <li className={`main-nav-item ${isActive('/movies') ? 'active' : ''}`} onClick={() => handleNavigation('/movies')}>
                        <FaFilm />
                        <span className='main-nav-item-text'>Movies</span>
                    </li>
                    <li className={`main-nav-item ${isActive('/series') ? 'active' : ''}`} onClick={() => handleNavigation('/series')}>
                        <IoIosTv />
                        <span className='main-nav-item-text'>TV Series</span>
                    </li>
                    <li className={`main-nav-item ${isActive('/search') ? 'active' : ''}`} onClick={() => handleNavigation('/search')}>
                        <FaSearch />
                        <span className='main-nav-item-text'>Search</span>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    );
};

export default MainNav;