import React, { useState } from 'react';
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
import Profile from "../Profile";

import { useDispatch } from "react-redux";
import { createCourseModal, signOut } from "../../actions";


const TYPE_MODAL_COURSE = "TYPE_MODAL_COURSE";
const TYPE_MODAL_INFO = "TYPE_MODE_INFO";

const Header = () => {

    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState("");

    const handleClick = (e: any, type: string) => {

        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        //setTypeOpen("");
    };

    const handleLogout = () => {
        dispatch(signOut());
    }

    const handleCloseModal = (openModal: boolean) => {
        console.log(openModal, typeOpen);

        // if (!openModal) {
        //     setTypeOpen("");
        // }
        setTypeOpen("");
        setIsOpenModal(false);
    }

    return (
        <>
            <AddCourse isOpenModal={typeOpen === TYPE_MODAL_COURSE && isOpenModal} setIsOpenModal={handleCloseModal} />
            <Profile isOpenModal={typeOpen === TYPE_MODAL_INFO && isOpenModal} setIsOpenModal={handleCloseModal} />

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
                            onClick={(e) => handleClick(e, TYPE_MODAL_COURSE)}
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
                            open={Boolean(typeOpen === TYPE_MODAL_COURSE && isOpenModal === false && anchorEl != null)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    setIsOpenModal(true);
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
                        <Button
                            aria-controls="info-menu"
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, TYPE_MODAL_INFO)}
                        >
                            <img className="header-main___right--avatar___img" src="/none-avt.png" alt="avt" />
                        </Button>

                        <Menu
                            id="info-menu"
                            className="header-main___right--more-features___menu-info"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(typeOpen === TYPE_MODAL_INFO && isOpenModal === false && anchorEl != null)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    setIsOpenModal(true);
                                    handleClose();
                                }}
                            >
                                Thông tin cá nhân
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    //setJoinOpened(true);
                                    handleClose();
                                    handleLogout();
                                }}
                            >
                                Đăng xuất
                            </MenuItem>
                        </Menu>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Header;