import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaArrowTrendUp, FaFilm } from 'react-icons/fa6';
import { IoIosTv } from "react-icons/io";
import { IconContext } from 'react-icons';
import './MainNav.css'; // Assuming you will create a CSS file for styling

const MainNav = () => {
    return (
        <IconContext.Provider value={{ className: 'nav-icons' }}>
            <nav className="main-nav">
                <ul className='main-nav-list'>
                    <li className="main-nav-item">
                        <FaArrowTrendUp />
                        <span className='main-nav-item-text'>Trending</span>
                    </li>
                    <li className="main-nav-item">
                        <FaFilm />
                        <span className='main-nav-item-text'>Movies</span>
                    </li>
                    <li className="main-nav-item">
                        <IoIosTv />
                        <span className='main-nav-item-text'>TV Series</span>
                    </li>
                    <li className="main-nav-item">
                        <FaSearch />
                        <span className='main-nav-item-text'>Search</span>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    );
};

export default MainNav;