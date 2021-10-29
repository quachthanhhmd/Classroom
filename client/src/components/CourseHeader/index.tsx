import {
    AppBar, Button,
    IconButton, Menu, MenuItem, Tab, Tabs, TabProps
} from "@material-ui/core";
import {
    Event, Menu as MenuIcon
} from "@material-ui/icons";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Switch, Route, Link, LinkProps } from "react-router-dom";
import { signOut } from "../../actions";
import { AppState } from "../../reducers";
import Profile from "../Profile";
import ThemeMode from '../ThemeMode';
import "./index.scss";

const LinkTab: React.ComponentType<TabProps & LinkProps> = Tab as React.ComponentType<TabProps & LinkProps>;

const TYPE_MODAL_INFO = "TYPE_MODE_INFO";
const TYPE_PILL_FEED = "TYPE_PILL_FEED";
const TYPE_PILL_EXAM = "TYPE_PILL_EXAM";
const TYPE_PILL_MEMBER = "TYPE_PILL_MEMBER";

const Header = () => {
    const [typePill, setTypePill] = useState<number>(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state: AppState) => state!.auth);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState("");



    const handleClick = (e: any, type: string) => {

        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(signOut());
        window.location.href = "/auth";
    }

    const handleCloseModal = (openModal: boolean) => {
        setTypeOpen("");
        setIsOpenModal(false);
    }
    const handleChangePill = (e: any, newPill: number) => {
        setTypePill(newPill);
    }
    return (
        <>
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
                        <p>LTUDW - Lap trinh ung dung web asdasjkhd kjahsjkasjdhaksjd ajkh jahsdkjashkjd</p>
                    </div>
                </div>
                <div className="header-main___middle">
                    <Tabs
                        value={typePill}
                        onChange={handleChangePill}
                        TabIndicatorProps={{ style: { background: 'white' } }}
                        textColor="inherit"

                        // textColor="secondary"
                        centered
                    // style={navStyle}
                    >
                        <LinkTab label="Bảng tin" component={Link}  className={`${typePill === 0 ? "header-main___middle--click-pill" : ""}`} to="/course/2" >

                        </LinkTab>
                        <LinkTab label="Bài tập" component={Link}  className={`${typePill === 1 ? "header-main___middle--click-pill" : ""}`} to="/auth" >
                            <Link to="/auth/2" />
                        </LinkTab>
                        <LinkTab label="Mọi người" component={Link}  className={`${typePill === 2 ? "header-main___middle--click-pill" : ""}`} to="/member/2" />
                    </Tabs>

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