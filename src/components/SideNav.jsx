import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { SideBarData } from "../utils/navbarData";
import { useState } from "react";
import classes from './SideNav.module.css';


function SideNav({sidebar}) {
    return (
        <div>
            <nav className={sidebar ? classes.navmenuactive : classes.navmenu}>
                <ul className={classes.navmenuitems}>
                    {
                        SideBarData.map((item, index) => {
                           return ( <li key={index} className={classes.navtext}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>)
                        })
                    }
                </ul>
            </nav>
        </div>

    );
}

export default SideNav;