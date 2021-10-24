import React, { useEffect } from "react";
import "./index.scss";

import {
    Card,
    CardHeader,
    Button,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserCouseList } from "../../actions/course.action";
import { AppState } from "../../reducers";
import { ICourseSummary } from "../../interfaces";

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
                <img src={course.avatarUrl ? course.avatarUrl: "/none-avt.png"} alt="ownver" />
            </div>
        </div>
    )
}


const DashBoard = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const courseState = useSelector((state: AppState) => state.course);


    useEffect(() => {
        dispatch(getUserCouseList());
    }, []);

    return (
        <div className="dashboard-main">
            <div className="dashboard-main--title">
                Tất cả khóa học
            </div>
            <div className="dashboard-main___courses">
                {
                    courseState.data.map((course: ICourseSummary) => (

                        <Button>
                            <Card className="dashboard-main___courses___component">
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