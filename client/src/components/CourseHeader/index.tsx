import {
    Button, Tab, TabProps, Tabs
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, LinkProps } from "react-router-dom";
import { getAllCourseInfo, getUserData, signOut } from "../../actions";
import { TYPEROLE } from "../../constants";
import { useScrollHook } from "../../customs";
import { AppState } from "../../reducers";
import InfoHeader from "../Header/infoHeader";
import Profile from "../Profile";
import ThemeMode from '../ThemeMode';
import "./index.scss";

const LinkTab: React.ComponentType<TabProps & LinkProps> = Tab as React.ComponentType<TabProps & LinkProps>;

const TYPE_MODAL_INFO = "TYPE_MODE_INFO";

interface ParamTypes {
    courseId: string,
}

const Header = () => {


    const { courseId } = useParams<ParamTypes>();
    const styleScroll = useScrollHook();
    const [typePill, setTypePill] = useState<number>(0);
    const dispatch = useDispatch();
    const member = useSelector((state: AppState) => state.member);
    const auth = useSelector((state: AppState) => state!.auth);

    const course = useSelector((state: AppState) => state!.course);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState("");



    useEffect(() => {
        window.location.pathname.includes("course") && setTypePill(0);

        window.location.pathname.includes("exercise") && setTypePill(1);
        window.location.pathname.includes("structure") && setTypePill(2);
        window.location.pathname.includes("member") && setTypePill(3);
        window.location.pathname.includes("grade") && setTypePill(4);

    }, [window.location.pathname])

    useEffect(() => {
        if (!auth.user) {
            dispatch(getUserData())
        }
    }, [])

    useEffect(() => {
        dispatch(getAllCourseInfo(Number(courseId)))
    }, [])

    console.log(typePill);
    const handleCloseModal = (openModal: boolean) => {
        setTypeOpen("");
        setIsOpenModal(false);
    }
    const handleChangePill = (e: any, newPill: number) => {
        console.log(newPill);
        setTypePill(newPill);
    }
    const handleGoHome = () => {
        window.location.href = "/";
    }

    return (
        <>

            <Profile isOpenModal={typeOpen === TYPE_MODAL_INFO && isOpenModal} setIsOpenModal={handleCloseModal} />
            <div className={`header-main`} style={styleScroll}>

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
                        {course.course?.name}
                    </div>
                </div>
                <div className="header-main___middle">
                    <Tabs
                        value={typePill}
                        onChange={handleChangePill}
                        TabIndicatorProps={{ style: { background: 'white' } }}
                        textColor="inherit"
                        //style={{ width: "80%" }}
                        centered
                    >
                        <LinkTab value={0} label="Bảng tin" component={Link} className={`${typePill === 0 ? "header-main___middle--click-pill" : ""}`} to={`/course/${courseId}`} >

                        </LinkTab>

                        {member && member.currentRole && member.currentRole.role !== TYPEROLE.STUDENT &&

                            <LinkTab value={1} label="Bài tập" component={Link} className={`${typePill === 1 ? "header-main___middle--click-pill" : ""}`} to={`/exercise/${courseId}`} />

                        }
                        {member && member.currentRole && member.currentRole.role !== TYPEROLE.STUDENT &&

                            <LinkTab value={2} label="Thang Điểm" component={Link} className={`${typePill === 2 ? "header-main___middle--click-pill" : ""}`} to={`/structure/${courseId}`} />

                        }
                        <LinkTab value={3} label="Mọi người" component={Link} className={`${typePill === 3 ? "header-main___middle--click-pill" : ""}`} to={`/member/${courseId}`} />
                        <LinkTab value={4} label="Số điểm" component={Link} className={`${typePill === 4 ? "header-main___middle--click-pill" : ""}`} to={`/grade/${courseId}`} />
                    </Tabs>

                </div>
                <div className="header-main___right">
                    <div className="header-main___right--theme-mode">
                        <ThemeMode />
                    </div>

                    <InfoHeader />

                </div>

            </div>
        </>
    );
};

export default Header;