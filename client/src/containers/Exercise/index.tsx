import { Card, Grid, CardContent, CardHeader, Divider, Button, IconButton, Typography } from '@material-ui/core';
import { Add, MoreVert, Assignment } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAllCourseInfo } from '../../actions';
import { showErrorNotify, showSuccessNotify } from '../../actions/notification.action';
import exerciseApi from '../../api/exercise.api';
import AddExercise from '../../components/AddExercise';
import CircularLoading from '../../components/Loading';
import { ICreateExercise, IExerciseThumbnail, IExerciseTypeDetail } from '../../interfaces';
import { AppState } from '../../reducers';
import { getDateFormat } from '../../utils/converter';



import "./index.scss";


interface IPropsExam {
    exercise: IExerciseThumbnail,

}

const ButtonExam = (props: IPropsExam) => {
    const { exercise } = props;

    return (
        <Button
            key={`${exercise.id}-exercise-thumbnail`}
            className="exercise-main___exam___button"
            fullWidth
        >

            <div className="exercise-main___exam___button--title">
                <Assignment className="exercise-main___exam___button--icon" style={{ fontSize: "2rem" }} />
                <span className="exercise-main___exam___button--display exercise-main___exam___button--name">{exercise.title}</span>
            </div>
            <div className="exercise-main___exam___button--info">
                <span className="exercise-main___exam___button--display exercise-main___exam___button--time" >{`Đã đăng vào ${getDateFormat(exercise.createdAt)}`}</span>
                <IconButton  >
                    <MoreVert className="exercise-main___exam___button--icon" style={{ fontSize: "1.5rem" }} />
                </IconButton>
            </div>
        </Button>
    )
}


const Exercise = () => {

    const { courseId } = useParams<{ courseId: string }>();

    const dispatch = useDispatch();
    const course = useSelector((state: AppState) => state.course);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [exerciseList, setExerciseList] = useState<IExerciseThumbnail[]>([])
    const [displayIndex, setDisplayIndex] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getAllExercise(courseId: number) {
            const result = await exerciseApi.getAllExercise(courseId);

            if (!result || result.status !== 200) {
                return;
            }

            setExerciseList(result.data.payload);
        }
        getAllExercise(+courseId);
    }, [])

    const createExercise = async (data: ICreateExercise) => {

        try {
            setIsLoading(true);
            const result = await exerciseApi.createExercise(+courseId, data);
            setIsLoading(false);
            if (!result || result.status !== 200) throw new Error();

            if (data.topic.id === -1) {
                dispatch(getAllCourseInfo(+courseId));
            }
            setExerciseList([result.data.payload, ...exerciseList]);

            dispatch(showSuccessNotify("Tạo mới bài tập thành công"));
        } catch (err) {
            dispatch(showErrorNotify("Tạo mới bài tập thất bại, vui lòng thử lại"))
        }
    }

    return (
        <>
            {
                isLoading ?
                    <CircularLoading />
                    :

                    <div className="exercise-main">
                        <AddExercise open={createModalOpen} handleClose={() => setCreateModalOpen(false)} clickCreate={createExercise} />
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <Card className="exercise-main___topic">
                                    <CardHeader
                                        title="Chủ đề"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Button
                                            fullWidth
                                            onClick={() => {
                                                setDisplayIndex(-1);
                                            }}
                                            className={-1 === displayIndex ? 'exercise-main___topic--click' : ''}
                                            style={{ textTransform: "none" }} >
                                            Tất cả chủ đề
                                        </Button>
                                        <Divider />
                                        {
                                            course && course.course && course.course.topicList && course.course.topicList.map((topic, index) => (
                                                <Button
                                                    fullWidth
                                                    style={{ textTransform: "none" }}
                                                    className={topic.id === displayIndex ? 'exercise-main___topic--click' : ''}
                                                    onClick={() => {
                                                        setDisplayIndex(topic.id);
                                                    }}
                                                    key={`topic-navbar-${index}`}>
                                                    {topic.topic}
                                                </Button>
                                            ))
                                        }
                                    </CardContent>

                                </Card>
                            </Grid>
                            <Grid item xs={8}>
                                <Card className="exercise-main___exam">
                                    <CardHeader
                                        title="Bài tập"
                                        action={
                                            <Button className="exercise-main___exam--create" variant="contained" startIcon={<Add />}
                                                onClick={() => setCreateModalOpen(true)}
                                            >
                                                Tạo
                                            </Button>
                                        }
                                    />
                                    <Divider />
                                    <CardContent>
                                        {course && course.course && course.course.topicList && course.course.topicList.map((topic, index) => {

                                            if (topic.id === displayIndex || displayIndex === -1)
                                                return (<>
                                                    <CardHeader
                                                        style={{ fontWeight: "bold", borderBottom: "1px solid", marginBottom: "0.2rem" }}
                                                        title={`${topic.topic}`}
                                                        action={
                                                            <IconButton aria-label="settings">
                                                                <MoreVert />
                                                            </IconButton>
                                                        }
                                                    />
                                                    {
                                                        exerciseList.map((exercise, indexExercise) => (
                                                            exercise.topicId === topic.id && <ButtonExam exercise={exercise} />
                                                        ))
                                                    }

                                                </>
                                                )
                                        })
                                        }



                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div >
            }
        </>
    )
}

export default Exercise;