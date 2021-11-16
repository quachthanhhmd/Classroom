import React, { useState, useEffect } from 'react';
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
import { useHistory } from "react-router-dom";
import ThemeMode from '../ThemeMode';
import AddCourse from "../CreateCourse";
import JoinCourse from '../JoinCourse';
import Profile from "../Profile";


import { useDispatch, useSelector } from "react-redux";
import { signOut, getUserData } from "../../actions";
import { AppState } from "../../reducers";
import { useScrollHook } from "../../customs";

const TYPE_MODAL_COURSE = "TYPE_MODAL_COURSE";
const TYPE_MODAL_INFO = "TYPE_MODE_INFO";
const TYPE_MODAL_JOIN = "TYPE_MODAL_JOIN";

const Header = () => {
    const styleScroll = useScrollHook();

    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state: AppState) => state!.auth);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenCourse, setIsOpenCourse] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState<string>("");

    useEffect(() => {
        if (!auth.user) {
            dispatch(getUserData())
        }
    }, [])

    const handleClick = (e: any, type: string) => {
        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        //setIsOpenCourse(0);
    };

    const handleLogout = async () => {
        await dispatch(signOut());
        window.location.href = "/";
    }

    const handleCloseModal = (openModal: boolean) => {
        setTypeOpen("");
        setIsOpenModal(false);
    }
    const handleGoHome = () => {
        window.location.href = "/";
    }
    return (
        <>
            <AddCourse isOpenModal={typeOpen === TYPE_MODAL_COURSE && isOpenModal && isOpenCourse === 1} setIsOpenModal={handleCloseModal} />
            <Profile isOpenModal={typeOpen === TYPE_MODAL_INFO && isOpenModal }  setIsOpenModal={handleCloseModal} />
            <JoinCourse isOpenModal={typeOpen === TYPE_MODAL_COURSE && isOpenModal && isOpenCourse === 2} setIsOpenModal={handleCloseModal}/>
            <div className="header-main" style={styleScroll}>

                <div className="header-main___left">
                    <div className="header-main___left--menu">
                        <Button variant="contained"
                            onClick={handleGoHome}
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
                                    setIsOpenCourse(1);
                                    setIsOpenModal(true);
                                    handleClose();
                                }}
                            >
                                Tạo lớp học
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setIsOpenCourse(2);
                                    setIsOpenModal(true);
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
                            <img className="header-main___right--avatar___img" src={auth.user && auth.user.avatarUrl ? auth.user.avatarUrl : "/none-avt.png"} alt="avt" />
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
                                    handleLogout();
                                    handleClose();
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