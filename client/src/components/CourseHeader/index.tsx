import {
    Button,
    IconButton, Menu, MenuItem, Tab, TabProps, Tabs
} from "@material-ui/core";
import {
    Event, Menu as MenuIcon
} from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, LinkProps, useHistory } from "react-router-dom";
import { getAllCourseInfo, getUserData, signOut } from "../../actions";
import { useScrollHook } from "../../customs";
import { AppState } from "../../reducers";
import Profile from "../Profile";
import { SnackBarRender } from "../SnackBar";
import ThemeMode from '../ThemeMode';
import "./index.scss";

const LinkTab: React.ComponentType<TabProps & LinkProps> = Tab as React.ComponentType<TabProps & LinkProps>;

const TYPE_MODAL_INFO = "TYPE_MODE_INFO";
const TYPE_PILL_FEED = "TYPE_PILL_FEED";
const TYPE_PILL_EXAM = "TYPE_PILL_EXAM";
const TYPE_PILL_MEMBER = "TYPE_PILL_MEMBER";

interface ParamTypes {
    courseId: string,
}
const Header = () => {
    const { courseId } = useParams<ParamTypes>();
    const styleScroll = useScrollHook();

    const [typePill, setTypePill] = useState<number>(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state: AppState) => state!.auth);
    const user = useSelector((state: AppState) => state!.user);
    const course = useSelector((state: AppState) => state!.course);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState("");

    useEffect(() => {
        window.location.pathname.includes("course") && setTypePill(0);
        //window.location.pathname.includes("exam") && setTypePill(1);
        window.location.pathname.includes("structure") && setTypePill(2);
        window.location.pathname.includes("member") && setTypePill(3);
    }, [window.location.pathname])

    useEffect(() => {
        if (!auth.user) {
            dispatch(getUserData())
        }
    }, [])

    useEffect(() => {
        console.log(course.course);
        dispatch(getAllCourseInfo(Number(courseId)))
    }, [])

    const handleClick = (e: any, type: string) => {

        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(signOut());
        window.location.href = "/";
    }

    const handleCloseModal = (openModal: boolean) => {
        setTypeOpen("");
        setIsOpenModal(false);
    }
    const handleChangePill = (e: any, newPill: number) => {
        setTypePill(newPill);
    }
    const handleGoHome = () => {
        window.location.href = "/";
    }
    return (
        <>
            {
                auth.message && <SnackBarRender message={auth.message!} isSuccess={auth.isSuccess} />
            }
            {
                user.message && <SnackBarRender message={user.message!} isSuccess={user.isSuccess} />
            }
            <Profile isOpenModal={typeOpen === TYPE_MODAL_INFO && isOpenModal} setIsOpenModal={handleCloseModal} />
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
                        <p>{course.course?.name}</p>
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
                        <LinkTab label="Bảng tin" component={Link} className={`${typePill === 0 ? "header-main___middle--click-pill" : ""}`} to={`/course/${courseId}`} >

                        </LinkTab>
                        <LinkTab label="Bài tập" component={Link} className={`${typePill === 1 ? "header-main___middle--click-pill" : ""}`} to="/auth" >
                            <Link to="/auth/2" />
                        </LinkTab>
                        <LinkTab label="Thang Điểm" component={Link} className={`${typePill === 2 ? "header-main___middle--click-pill" : ""}`} to={`/structure/${courseId}`} />
                        <LinkTab label="Mọi người" component={Link} className={`${typePill === 3 ? "header-main___middle--click-pill" : ""}`} to={`/member/${courseId}`} />
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