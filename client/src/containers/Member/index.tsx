import {
    Button,
    Checkbox, IconButton, MenuItem, Menu,
} from "@material-ui/core";
import {
    Add,
    MoreVert
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getAllMemberInCourse, updateStateMember } from "../../actions";
import InviteMember from "../../components/InviteMember";
import { MEMBERSTATE, TYPEROLE } from "../../constants";
import { IMemberSummary } from "../../interfaces";
import { AppState } from "../../reducers";
import "./index.scss";


const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

interface IMemberDisplay {
    course: any,
    courseId: string,
    userId?: number,
    member: IMemberSummary,
    isChecked?: boolean,
    index?: number,
    setIsChecked?: any,
    ownerMember?: any
}
const MemberDisplay = (props: IMemberDisplay) => {
    const { course, courseId, userId, member, isChecked, index, setIsChecked, ownerMember } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();

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

    const handleDelete = () => {
        dispatch(updateStateMember(member.user.userId, +courseId, MEMBERSTATE.BLOCKED));
        handleClose();
    }

    return (
        <div className="member-main___student___content--member" >
            {/* <Link to={`/${member.id}`}> */}
            <Button
                fullWidth
                onClick={handleClick}
            >
                <div className="member-main___teacher___content--member___information">
                    {((ownerMember && ownerMember.role !== TYPEROLE.STUDENT) && (member.role === TYPEROLE.STUDENT)) &&
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
                    {
                        (member.user.userId !== Number(userId)) &&
                        <IconButton
                            aria-controls="more-menu"
                            aria-haspopup="true"
                            onClick={(e: any) => {
                                setAnchorEl(e.currentTarget);
                            }}>
                            <MoreVert />

                        </IconButton>
                    }
                    <Menu
                        id="more-menu"
                        className="member-main___teacher___content--member___util--more"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl != null)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => {
                                openInNewTab(`https://mail.google.com/mail/u/0/?fs=1&to=${member.user.email}&tf=cm`);
                                handleClose();
                            }}
                        >
                            Gửi Email
                        </MenuItem>
                        {
                            (course && course.ownerId !== userId) &&
                            <MenuItem
                                onClick={handleDelete}
                            >
                                Xóa
                            </MenuItem>
                        }
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

    const history = useHistory();
    const [checkedList, setCheckedList] = useState<boolean[]>([]);
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
    const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
    const [roleOpenModal, setRoleOpenModal] = useState<string>("");

    useEffect(() => {
        if (!course.isSuccess && course.errorMessage === "member")
            history.push("/");
    }, [course, history])

    useEffect(() => {
        dispatch(getAllMemberInCourse(+courseId));

    }, [auth.user]);

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

    const handleSendMailAll = () => {
        const memberSend = course.memberList.map((member) => {
            if (member.role === TYPEROLE.STUDENT) return member.user.email;
        })

        const url = `https://mail.google.com/mail/u/0/?fs=1&bcc=${memberSend.filter(member => {
            if (member) return member;
        }).join(',')
            }&tf=cm`;

        openInNewTab(url);
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
                        {member && (member.currentRole?.role === TYPEROLE.TEACHER) &&
                            <IconButton>
                                <Add onClick={() => {
                                    setRoleOpenModal(TYPEROLE.TEACHER);
                                    setIsOpenInviteModal(true);
                                }} />
                            </IconButton>
                        }
                    </div>
                </div>
                {course && course.memberList && course.memberList.map((memberInCourse: IMemberSummary) => (
                    memberInCourse.role === "teacher" && <MemberDisplay course={course.course} ownerMember={member?.currentRole} courseId={courseId} userId={auth.user?.id} member={memberInCourse} />
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
                {course && course.memberList && course.memberList.map((memberInCourse: IMemberSummary) => (
                    memberInCourse.role === "assistant" && <MemberDisplay course={course.course} ownerMember={member?.currentRole} courseId={courseId} userId={auth.user?.id} member={memberInCourse} />
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
                    {
                        member && member.currentRole && member.currentRole.role !== TYPEROLE.STUDENT &&
                        <div className="member-main___student___content--check-all">

                            <Checkbox className="member-main___student___content--check-all___check-box" onClick={handleCheckedAll} checked={isCheckedAll} />
                            <Button onClick={handleSendMailAll}>Gửi Email</Button>
                            {member.currentRole.role === TYPEROLE.TEACHER &&
                                <Button>Xóa</Button>
                            }
                        </div>
                    }
                </div>
                {course && course.memberList && course.memberList.map((memberInCourse: IMemberSummary, index: number) => (
                    memberInCourse.role === "student" && <MemberDisplay course={course.course} ownerMember={member?.currentRole} courseId={courseId} userId={auth.user?.id} member={memberInCourse} isChecked={checkedList[index]} index={index} setIsChecked={handleCheckedOne} />
                ))}
            </div>
        </div >
    )
}

export default Member;