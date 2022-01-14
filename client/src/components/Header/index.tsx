import {
    Button,
    IconButton, Menu, MenuItem
} from "@material-ui/core";
import {
    Add, Menu as MenuIcon
} from "@material-ui/icons";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useScrollHook } from "../../customs";
import { AppState } from "../../reducers";
import AddCourse from "../CreateCourse";
import JoinCourse from '../JoinCourse';
import ThemeMode from '../ThemeMode';
import "./index.scss";
import InfoHeader from './infoHeader';





const TYPE_MODAL_COURSE = "TYPE_MODAL_COURSE";
const TYPE_MODAL_INFO = "TYPE_MODE_INFO";
const TYPE_MODAL_JOIN = "TYPE_MODAL_JOIN";

const Header = () => {
    const styleScroll = useScrollHook();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenCourse, setIsOpenCourse] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState<string>("");



    const handleClick = (e: any, type: string) => {
        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        //setIsOpenCourse(0);
    };



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
   
            <JoinCourse isOpenModal={typeOpen === TYPE_MODAL_COURSE && isOpenModal && isOpenCourse === 2} setIsOpenModal={handleCloseModal} />

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
                    <InfoHeader />

                </div>

            </div>
        </>
    );
};

export default Header;