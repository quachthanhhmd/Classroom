import {
    Button, Card,
    CardHeader
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserCouseList } from "../../actions/course.action";
import CircularLoading from "../../components/Loading";
import { SnackBarRender } from "../../components/SnackBar";
import { ICourseSummary } from "../../interfaces";
import { AppState } from "../../reducers";
import "./index.scss";

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
                <img src={course.avatarUrl ? course.avatarUrl : "/none-avt.png"} alt="owner" />
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
    }, [JSON.stringify(courseState.data)]);

    return (
        <>
            <Helmet>
                <title>
                    Trang Chủ | EClassroom
                </title>
            </Helmet>
            {courseState && !courseState.isLoading ?
                <div className="dashboard-main">
                    {
                        courseState.message && <SnackBarRender message={courseState.message!} isSuccess={courseState.isSuccess} />
                    }
                    <div className="dashboard-main--title">
                        Tất cả khóa học
                    </div>
                    <div className="dashboard-main___courses">
                        {
                            courseState.data.map((course: ICourseSummary) => (
                                <Link to={`/course/${course.id}`}>
                                    <Button>
                                        <Card className="dashboard-main___courses___component">
                                            <CardHeader className="dashboard-main___courses___component--header" style={{ backgroundImage: `url("/background-course.jpg")` }} title={<CourseHeader {...course} />}>
                                            </CardHeader>
                                        </Card>
                                    </Button>
                                </Link>
                            ))
                        }
                    </div>
                </div >
                :
                <CircularLoading />
            }
        </>
    )
}

export default DashBoard;