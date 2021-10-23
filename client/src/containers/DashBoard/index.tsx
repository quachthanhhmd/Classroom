import React from "react";
import "./index.scss";

import {
    Card,
    CardHeader,
    Button,
    CardContent
} from "@material-ui/core";


interface ICourseSummary {
    id: number,
    name: string,
    topic: string,
    avatarUrl: string,
    backgroundUrl: string,
}

const courseList: ICourseSummary[] = [
    {
        id: 1,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 2,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 3,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 2,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 3,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 2,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 3,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 2,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 3,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 2,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 3,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 2,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    },
    {
        id: 3,
        name: "Lap trinh ung dung web",
        topic: "web NC",
        avatarUrl: "/none-avt.png",
        backgroundUrl: "https://www.gstatic.com/classroom/themes/img_graduation.jpg"
    }
]


const CourseHeader = (course: ICourseSummary) => {
    
    return (
        <div className="dashboard-main___courses___component--course-info">
            <div className="dashboard-main___courses___component--name">
                {course.name}
            </div>
            <div className="dashboard-main___courses___component--topic">
                {course.topic}
            </div>
            <div className="dashboard-main___courses___component--avatar">
                <img src={course.avatarUrl} alt="ownver" />
            </div>
        </div>
    )
}

const DashBoard = () => {

    return (
        <div className="dashboard-main">
            <div className="dashboard-main--title">
                Tất cả khóa học
            </div>
            <div className="dashboard-main___courses">
                {
                    courseList.map((course: ICourseSummary) => (
                    
                        <Button>
                            <Card  className="dashboard-main___courses___component">
                                <CardHeader className="dashboard-main___courses___component--header" style={{ backgroundImage: `url("/background-course.jpg")` }} title={<CourseHeader {...course} />}>
                                </CardHeader>
                            </Card>
                        </Button>
                       
                    ))
                }
            </div>
        </div >
    )
}

export default DashBoard;