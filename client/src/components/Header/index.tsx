import React from 'react';
import {
    Menu,
    Event,
    Add
} from "@material-ui/icons";

import {
    Button
} from "@material-ui/core";

import "./index.scss";
import ThemeMode from '../ThemeMode';


const Header = () => {



    return (
        <div className="header-main">
            <div className="header-main___left">
                <div className="header-main___left--menu">
                    <Button variant="contained"
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#03A9F4",
                        }}>
                        <Menu />
                    </Button>
                </div>
                <div className="header-main___left--logo-name">
                    <p>EClassRoom</p>
                </div>
            </div>

            <div className="header-main___right">
                <div className="header-main___right--theme-mode">
                    <ThemeMode />
                </div>
                <div className="header-main___right--calendar">
                    <Button
                        style={{
                            color: "#ffffff"
                        }}
                    >
                        <Event />
                    </Button>
                </div>
                <div className="header-main___right--more-feature">
                    <Button
                        style={{
                            color: "#ffffff"
                        }}
                    >
                        <Add />
                    </Button>
                </div>
                <div className="header-main___right--avatar">
                    <Button>
                        <img className="header-main___right--avatar___img" src="/none-avt.png" alt="avt" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;