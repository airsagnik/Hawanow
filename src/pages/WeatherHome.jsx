
import SearchBox from '../components/SearchBox';

import classes from "../App.module.css";
import ProfileItems from '../components/ProfileItem';
import WeatherDisplay from '../components/WeatherDisplay';


import WeatherHighlight from '../components/WeatherHighLight';

import ChanceOfRain from '../components/ChanceOfRain';
import DailyForcast from '../components/DailyForecast';
import SideNav from '../components/SideNav';
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';


function WeatherHome() {

    const [showSideNav, toggleSideNavVisiblility] = useState(false);

    return (
        <div className={classes.layout}>
            <div className={classes.overlay}>
                <SideNav sidebar={showSideNav} />
            </div>
            <div>
                <header>
                    <nav className={classes.headernav}>
                        <div className={classes.search}>
                            <Link to="#" className={classes.menubars}>
                                <GiHamburgerMenu onClick={() => toggleSideNavVisiblility(!showSideNav)} />
                            </Link>
                            <SearchBox />
                        </div>

                        <ProfileItems />
                    </nav>
                </header>
                <main className={classes.grid1}>
                    <WeatherDisplay />
                    <ChanceOfRain />
                    <WeatherHighlight />
                    <DailyForcast />
                </main>
            </div>

        </div>
    );
}

export default WeatherHome;