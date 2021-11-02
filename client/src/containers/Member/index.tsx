import {
    Button,
    Checkbox, IconButton
} from "@material-ui/core";
import {
    Add,
    MoreVert
} from "@material-ui/icons";
import React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";

interface IMember {
    name: string,
    avatarUrl: string,
    id: number,
    role: string,
}

const memberList: IMember[] = [
    {
        name: "Quach Hai Thanh",
        avatarUrl: "/none-avt.png",
        id: 1,
        role: "student",
    },
    {
        name: "Quach Hai Thanh",
        avatarUrl: "/none-avt.png",
        id: 2,
        role: "teacher",
    },
    {
        name: "Quach Hai Thanh",
        avatarUrl: "/none-avt.png",
        id: 3,
        role: "assist",
    },
    {
        name: "Quach Hai Thanh",
        avatarUrl: "/none-avt.png",
        id: 4,
        role: "assist",
    },
    {
        name: "Quach Hai Thanh",
        avatarUrl: "/none-avt.png",
        id: 7,
        role: "student",
    },
]


const MemberDisplay = (props: { member: IMember }) => {
    const { member } = props;
    function handleClick() {

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

                        />
                    }
                    <div className="member-main___teacher___content--member___information--avt">
                        <img src={`${member.avatarUrl ? member.avatarUrl : "/none-avt.png"}`} alt="avatar" />
                    </div>
                    <div className="member-main___teacher___content--member___information--name overflow-text">
                        {member.name}
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

const Member = () => {

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
                {memberList.map((member: IMember) => (
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
                {memberList.map((member: IMember) => (
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

                        <Checkbox className="member-main___student___content--check-all___check-box" />
                        <Button>Gửi Email</Button>
                        <Button>Xóa</Button>

                    </div>

                </div>
                {memberList.map((member: IMember) => (
                    member.role === "student" && <MemberDisplay member={member} />
                ))}
            </div>


        </div >
    )
}

export default Member;