import React from 'react';
import {
    Menu as MenuIcon,
    Event,
    Add
} from "@material-ui/icons";

import {
    Button,
    IconButton,
    MenuItem,
    Menu
} from "@material-ui/core";

import "./index.scss";
import ThemeMode from '../ThemeMode';
import AddCourse from "../CreateCourse";

import { useDispatch } from "react-redux";
import { createCourseModal } from "../../actions";

const Header = () => {

    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AddCourse />
            <div className="header-main">

                <div className="header-main___left">
                    <div className="header-main___left--menu">
                        <Button variant="contained"
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#03A9F4",
                            }}>
                            <MenuIcon />
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
                        <IconButton
                            style={{
                                color: "#ffffff"
                            }}
                        >
                            <Event />
                        </IconButton>
                    </div>
                    <div className="header-main___right--more-features">
                        <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            style={{
                                color: "#ffffff"
                            }}
                        >
                            <Add />

                        </IconButton>
                        <Menu
                            id="simple-menu"
                            className="header-main___right--more-features___menu-add"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    dispatch(createCourseModal(true));
                                    handleClose();
                                }}
                            >
                                Tạo lớp học
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    //setJoinOpened(true);
                                    handleClose();
                                }}
                            >
                                Tham gia lớp học
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="header-main___right--avatar">
                        <Button>
                            <img className="header-main___right--avatar___img" src="/none-avt.png" alt="avt" />
                        </Button>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Header;