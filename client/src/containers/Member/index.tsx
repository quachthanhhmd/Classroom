import {
    Button,
    Checkbox, IconButton
} from "@material-ui/core";
import {
    Add,
    MoreVert
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../reducers";
import { getAllMemberInCourse } from "../../actions";

import "./index.scss";
import { IMemberSummary } from "../../interfaces";


const MemberDisplay = (props: { member: IMemberSummary, isChecked?: boolean, index?: number, setIsChecked?: any }) => {
    const { member, isChecked, index, setIsChecked } = props;

    function handleClick() {

    }
    const handleChecked = () => {
        setIsChecked(index);
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
                    <IconButton>
                        <MoreVert />
                    </IconButton>
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
    const [checkedList, setCheckedList] = useState<boolean[]>([]);
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllMemberInCourse(+courseId));

    }, []);
    useEffect(() => {
        console.log(2323);
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
    return (
        <div className="member-main">
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
                        <IconButton>
                            <Add />
                        </IconButton>
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
                        <IconButton>
                            <Add />
                        </IconButton>
                    </div>
                </div>
                {course && course.memberList && course.memberList.map((member: IMemberSummary) => (
                    member.role === "assist" && <MemberDisplay member={member} />
                ))}
            </div>
            <div className="member-main___student">
                <div className="member-main___student___header">
                    <div className="member-main___student___header--title">
                        Học Sinh
                    </div>
                    <div className="member-main___student___header--add-member">
                        <IconButton>
                            <Add />
                        </IconButton>
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
                    member.role === "student" && <MemberDisplay member={member} isChecked={checkedList[index]} index={index} setIsChecked={handleCheckedOne}/>
                ))}
            </div>
        </div >
    )
}

export default Member;