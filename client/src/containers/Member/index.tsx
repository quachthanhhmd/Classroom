import {
    Button,
    Checkbox, IconButton, MenuItem, Menu
} from "@material-ui/core";
import {
    Add,
    MoreVert
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllMemberInCourse } from "../../actions";
import InviteMember from "../../components/InviteMember";
import { TYPEROLE } from "../../constants";
import { IMemberSummary } from "../../interfaces";
import { AppState } from "../../reducers";
import "./index.scss";




const MemberDisplay = (props: { member: IMemberSummary, isChecked?: boolean, index?: number, setIsChecked?: any }) => {
    const { member, isChecked, index, setIsChecked } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    function handleClick() {

    }
    const handleChecked = () => {
        setIsChecked(index);
    }
    const handleShowMore = () => {

    }
    const handleClose = () => {
        setAnchorEl(null);
        //setIsOpenCourse(0);
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

    return (
        <div className="member-main___student___content--member" >
            {/* <Link to={`/${member.id}`}> */}
            <Button
                fullWidth
                onClick={handleClick}
            >
                <div className="member-main___teacher___content--member___information">
                    {member.role === "student" &&
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={isChecked || false}
                            onClick={handleChecked}
                        />
                    }
                    <div className="member-main___teacher___content--member___information--avt">
                        <img src={`${member.user.avatarUrl ? member.user.avatarUrl : "/none-avt.png"}`} alt="avatar" />
                    </div>
                    <div className="member-main___teacher___content--member___information--name overflow-text">
                        {`${member.user.firstName} ${member.user.lastName}`}
                    </div>
                </div>
                <div className="member-main___teacher___content--member___util">
                    <IconButton
                        aria-controls="more-menu"
                        aria-haspopup="true"
                        onClick={(e: any) => {
                            setAnchorEl(e.currentTarget);
                        }}>
                        <MoreVert />

                    </IconButton>
                    <Menu
                        id="more-menu"
                        className="member-main___teacher___content--member___util--more"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl != null)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => {openInNewTab(`https://mail.google.com/mail/u/0/?fs=1&to=${member.user.email}&tf=cm`)}}
                        >
                            Gửi Email
                        </MenuItem>
                        <MenuItem

                        >
                            Xóa
                        </MenuItem>
                    </Menu>


                </div>
            </Button>
            {/* </Link> */}
        </div >
    )
}

interface ParamTypes {
    courseId: string;
}




const Member = () => {
    const { courseId } = useParams<ParamTypes>();
    const dispatch = useDispatch();
    const course = useSelector((state: AppState) => state.course);
    const member = useSelector((state: AppState) => state.member);
    const auth = useSelector((state: AppState) => state.auth);

    const [checkedList, setCheckedList] = useState<boolean[]>([]);
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
    const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
    const [roleOpenModal, setRoleOpenModal] = useState<string>("");

    useEffect(() => {
        dispatch(getAllMemberInCourse(+courseId));

    }, []);

    useEffect(() => {
        setCheckedList(new Array(course.memberList.length).fill(false));
    }, [course.memberList])


    const handleCheckedAll = () => {
        setCheckedList([...checkedList.fill(!isCheckedAll)]);
        setIsCheckedAll(!isCheckedAll);
    }
    const handleCheckedOne = (idChecked: number) => {

        setCheckedList(checkedList.map((checked: boolean, index: number) => {
            return index === idChecked ? !checked : checked;
        }))
    }

    const handleCloseInviteModal = () => {
        setIsOpenInviteModal(false);
    }
    return (
        <div className="member-main">
            <InviteMember role={roleOpenModal} isOpenModal={isOpenInviteModal} setIsOpenModal={handleCloseInviteModal} />
            <Helmet>
                <title>
                    Thành viên | EClassroom
                </title>
            </Helmet>
            <div className="member-main___teacher">
                <div className="member-main___teacher___header">
                    <div className="member-main___teacher___header--title">
                        Giáo viên
                    </div>
                    <div className="member-main___teacher___header--add-member">
                        {member && (member.currentRole?.role === TYPEROLE.ASSISTANT || member.currentRole?.role === TYPEROLE.TEACHER) &&
                            <IconButton>
                                <Add onClick={() => {
                                    setRoleOpenModal(TYPEROLE.TEACHER);
                                    setIsOpenInviteModal(true);
                                }} />
                            </IconButton>
                        }
                    </div>
                </div>
                {course && course.memberList && course.memberList.map((member: IMemberSummary) => (
                    member.role === "teacher" && <MemberDisplay member={member} />
                ))}
            </div>
            <div className="member-main___assist">
                <div className="member-main___assist___header">
                    <div className="member-main___assist___header--title">
                        Trợ Giảng
                    </div>
                    <div className="member-main___assist___header--add-member">
                        {member && (member.currentRole?.role === TYPEROLE.ASSISTANT || member.currentRole?.role === TYPEROLE.TEACHER) &&
                            <IconButton>
                                <Add onClick={() => {
                                    setRoleOpenModal(TYPEROLE.ASSISTANT);
                                    setIsOpenInviteModal(true);
                                }} />
                            </IconButton>
                        }
                    </div>
                </div>
                {course && course.memberList && course.memberList.map((member: IMemberSummary) => (
                    member.role === "assistant" && <MemberDisplay member={member} />
                ))}
            </div>
            <div className="member-main___student">
                <div className="member-main___student___header">
                    <div className="member-main___student___header--title">
                        Học Sinh
                    </div>
                    <div className="member-main___student___header--add-member">
                        {member && (member.currentRole?.role === TYPEROLE.ASSISTANT || member.currentRole?.role === TYPEROLE.TEACHER) &&
                            <IconButton>
                                <Add onClick={() => {
                                    setRoleOpenModal(TYPEROLE.STUDENT);
                                    setIsOpenInviteModal(true);
                                }} />
                            </IconButton>
                        }
                    </div>
                </div>
                <div className="member-main___student___content">
                    <div className="member-main___student___content--check-all">

                        <Checkbox className="member-main___student___content--check-all___check-box" onClick={handleCheckedAll} checked={isCheckedAll} />
                        <Button>Gửi Email</Button>
                        <Button>Xóa</Button>

                    </div>

                </div>
                {course && course.memberList && course.memberList.map((member: IMemberSummary, index: number) => (
                    member.role === "student" && <MemberDisplay member={member} isChecked={checkedList[index]} index={index} setIsChecked={handleCheckedOne} />
                ))}
            </div>
        </div >
    )
}

export default Member;