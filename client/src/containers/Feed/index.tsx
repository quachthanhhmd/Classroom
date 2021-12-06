import {
    Button, Card, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Typography
} from "@material-ui/core";
import {
    CropFree, FileCopy, MoreHoriz, MoreVert, Settings
} from "@material-ui/icons";
import { convertToRaw, EditorState } from "draft-js";
import createImagePlugin from "draft-js-image-plugin";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { joinCourseByUrl } from "../../actions";
import { showErrorNotify, showSuccessNotify } from "../../actions/notification.action";
import commentApi from "../../api/comment.api";
import courseApi from "../../api/course.api";
import exerciseApi from "../../api/exercise.api";
import postApi from "../../api/feed.api";
import CourseInfo from "../../components/CourseInfo";
import ThumbnailExercise from "../../components/ExercisePost/thumbnail";
import CircularLoading from "../../components/Loading";
import Post from "../../components/Post";
import RichText from "../../components/RichText";
import { TYPEROLE } from "../../constants";
import { IComment, ICourseInfo, IDeadlineResponse, IExerciseThumbnail, isPostDetail } from "../../interfaces";
import { IPostDetail } from "../../interfaces/post.interface";
import { FORBIDDEN_MESSAGE, POST_NEW_FAIL, POST_NEW_SUCCESS } from "../../messages";
import { AppState } from "../../reducers";
import { getDateFormat, getDateTimeFormat, getDayFormat, getTimeFormat } from "../../utils/converter";
import "./index.scss";



const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];


interface ParamTypes {
    courseId: string
}

const Feed = () => {

    const { courseId } = useParams<ParamTypes>();
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('give');
    const history = useHistory();

    const courseState = useSelector((state: AppState) => state.course!);

    const role = useSelector((state: AppState) => state.member);
    const dispatch = useDispatch();
    const course: ICourseInfo = courseState.course as ICourseInfo;


    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [isShowInfor, setIsShowInfor] = useState(false);
    const [isShowShareCode, setIsShowShareCode] = useState(false);
    const [isWriteStatus, setIsWriteStatus] = useState(false);
    const [isChangeInfo, setIsChangeInfo] = useState(false);

    const [postList, setPostList] = useState<(IPostDetail | IExerciseThumbnail)[]>([]);
    const [deadlineList, setDeadlineList] = useState<IDeadlineResponse[]>([]);

    // Fetch API

    useEffect(() => {
        const getDeadlineList = async () => {
            const res = await exerciseApi.getDeadlineList(+courseId);

            if (!res || res.status !== 200) return;

            setDeadlineList(res.data.payload);
        }

        const postList = async () => {
            const res = await courseApi.getAllPost(+courseId);

            if (!res || res.status !== 200) return;
            console.log(res.data.payload);
            setPostList(res.data.payload);
        }
        postList();

        if (role && role.currentRole?.role === TYPEROLE.STUDENT) {
            getDeadlineList();
        }

    }, [])


    useEffect(() => {
        if (code) {
            dispatch(joinCourseByUrl(+courseId, code));
        }
    }, [])


    useEffect(() => {
        if (!courseState.isSuccess && courseState.message === FORBIDDEN_MESSAGE)
            history.push("/");
    }, [courseState, history])


    const createComment = async (data: IComment, id: number) => {

        try {
            const res = await commentApi.createNewComment(data);

            if (!res || res.status !== 200) throw new Error();

            // update feed

            const newPostList = postList.map((post) => {
                if (isPostDetail(post) && post.id === id) {
                    post.commentList.push(res.data.payload);
                }
                return post;
            });

            setPostList(newPostList);
        } catch (err) {

        }
    }

    const handlePostStatus = async () => {

        const res = await postApi.postNew(+courseId, { content: JSON.stringify(convertToRaw(editorState.getCurrentContent())) })

        if (!res || res.data.code !== 200) {
            dispatch(showErrorNotify(POST_NEW_FAIL));
            return;
        }
        dispatch(showSuccessNotify(POST_NEW_SUCCESS));

        // set post list
        let newPostList = [res.data.payload, ...postList];
        setPostList(newPostList);
    }

    const handleClose = () =>
        isShowInfor && setIsShowInfor(false);

    const handleCloseCode = () =>
        isShowShareCode && setIsShowShareCode(false);

    const handleChangeInfo = () =>
        isChangeInfo && setIsChangeInfo(false);


    return (

        <>
            {courseState && !courseState.isLoading ?
                <>
                    <Helmet>
                        <title>
                            Bảng tin khóa học | EClassroom
                        </title>
                    </Helmet>
                    <CourseInfo course={courseState.course as ICourseInfo | null} isOpenModal={isChangeInfo} setIsOpenModal={handleChangeInfo} />
                    <Dialog
                        fullWidth
                        keepMounted
                        open={isShowShareCode}
                        onClose={handleCloseCode}
                        maxWidth={"md"} >

                        <DialogTitle>Mã Lớp Học</DialogTitle>
                        <DialogContent>
                            <div className="feed-main___body___show-code___modal">

                                <div className="feed-main___body___show-code___modal--code">
                                    {course?.code}
                                </div>
                                <div className="feed-main___body___show-code___modal--copy">
                                    <div className="feed-main___body___show-code___modal--copy--course-name">
                                        {course?.name}
                                    </div>

                                    <div className="feed-main___body___show-code___modal--copy--copy-code">

                                        <IconButton style={{ borderRadius: "0%" }} onClick={() => {
                                            const urlJoinCourse = `${window.location.origin}/course/${course?.id || 1}?give=${course?.code ? course.code : "sfsfff"}`;
                                            navigator.clipboard.writeText(urlJoinCourse)
                                        }
                                        }>
                                            <FileCopy />
                                            <span>
                                                Sao chép đường liên kết
                                            </span>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        keepMounted
                        open={isShowInfor}
                        onClose={handleClose}>
                        <DialogTitle>Thông tin về lớp học</DialogTitle>
                        <DialogContent>
                            {role && role.currentRole && role.currentRole.role !== TYPEROLE.STUDENT &&
                                <div className="feed-main___show-infor___modal-detail">
                                    <span className="feed-main___show-infor___modal-detail--title">Mã Lớp: </span>
                                    <span className="feed-main___show-infor___modal-detail--info">{course?.code}</span>
                                    <IconButton onClick={() => {
                                        handleClose();
                                        setIsShowShareCode(true);
                                    }}>
                                        <CropFree />
                                    </IconButton>
                                </div>
                            }
                            <div className="feed-main___show-infor___modal-detail">
                                <span className="feed-main___show-infor___modal-detail--title">Tên lớp: </span>
                                <span className="feed-main___show-infor___modal-detail--info">{course?.name} </span>
                            </div>
                            <div className="feed-main___show-infor___modal-detail">
                                <span className="feed-main___show-infor___modal-detail--title">Chủ đề: </span>
                                <span className="feed-main___show-infor___modal-detail--info">{course?.topic} </span>
                            </div>
                            <div className="feed-main___show-infor___modal-detail">
                                <span className="feed-main___show-infor___modal-detail--title">Mô tả: </span>
                                <span className="feed-main___show-infor___modal-detail--info">{course?.description} </span>
                            </div>
                            <div className="feed-main___show-infor___modal-detail">
                                <span className="feed-main___show-infor___modal-detail--title">Số lượng sinh viên: </span>
                                <span className="feed-main___show-infor___modal-detail--info">{course?.studentLimit} </span>
                            </div>
                            <div className="feed-main___show-infor___modal-detail">
                                <span className="feed-main___show-infor___modal-detail--title">Số lượng sinh viên hiện tại: </span>
                                <span className="feed-main___show-infor___modal-detail--info">{course?.studentExist} </span>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                    <div className="feed-main">
                        <Paper elevation={4} className={`container-info feed-main___background${" feed-main___background--has-image"}`} style={{ backgroundImage: `url("/background-course.jpg")` }} >
                            <div className="feed-main___background___course-name">
                                <h1>{course?.name}</h1>
                                <div>{course?.topic}</div>
                            </div>
                            {role && role.currentRole && role.currentRole.role === TYPEROLE.TEACHER &&
                                <div className="feed-main___background___change-info">
                                    <IconButton onClick={(e) => { setIsChangeInfo(!isChangeInfo) }}>
                                        <Settings style={{ fontSize: "2rem", color: "white" }} />
                                    </IconButton>
                                </div>
                            }
                            <div className="feed-main___background___more-infor">
                                <IconButton onClick={(e) => setIsShowInfor(!isShowInfor)}>
                                    <MoreHoriz style={{ fontSize: "2rem", color: "white" }} />
                                </IconButton>
                            </div>
                        </Paper>

                        <Container className="feed-main___body">
                            <div className="feed-main___body___left">
                                {
                                    role.currentRole && role.currentRole.role !== TYPEROLE.STUDENT &&
                                    <Card className="feed-main___body___left--course-code">
                                        <CardHeader
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVert />
                                                </IconButton>
                                            }
                                            title={<p className="feed-main___body___left--card-header">Mã lớp</p>}
                                        />
                                        <CardContent className="feed-main___body___left--course-code___content">
                                            <span className="feed-main___body___left--course-code___content--code">{course?.code} </span>
                                            <IconButton style={{ marginTop: "-0.5rem" }} onClick={() => {
                                                handleClose();
                                                setIsShowShareCode(true);
                                            }}>
                                                <CropFree />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                }
                                <Card className="feed-main___body___left--grade-structure">
                                    <CardHeader
                                        title="Cấu trúc điểm"
                                    />
                                    <CardContent>
                                        {
                                            course && course.exerciseTypeList &&
                                            course.exerciseTypeList.map((type, index) => (
                                                <Typography>
                                                    {`${type.name}: ${type.grade}`}
                                                </Typography>
                                            ))


                                        }
                                    </CardContent>
                                </Card>
                                <Card className="feed-main___body___left--deadline" style={{ fontSize: "1rem", marginTop: "1rem" }}>
                                    <CardHeader
                                        title={<p className="feed-main___body___left--card-header">Sắp hết hạn</p>}
                                    >

                                    </CardHeader>
                                    <CardContent className="feed-main___body___left--deadline___content">
                                        {
                                            deadlineList.map(exam => (
                                                <div className="feed-main___body___left--deadline___content--item">
                                                    <div className="feed-main___body___left--deadline___content--item___time">
                                                        Đến hạn {getDayFormat(exam.deadline)} - {getTimeFormat(exam.deadline)}
                                                    </div>
                                                    <div className="feed-main___body___left--deadline___content--item___link">
                                                        <Link to={`/${exam.id}`} className="feed-main___body___left--deadline___content--item___link--name overflow-text">
                                                            {exam.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="feed-main___body___right">

                                <Card className="feed-main___body___right--write-status">
                                    {
                                        isWriteStatus ?
                                            <CardContent className="feed-main___body___right--write-status___expand">
                                                <div className="feed-main___body___right--write-status___expand--rich-text">
                                                    <RichText content={editorState} setContent={setEditorState} />
                                                </div>
                                                <div className="feed-main___body___right--write-status___expand--submit">
                                                    <Button

                                                        onClick={(e) => setIsWriteStatus(false)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={(e) => {
                                                            setIsWriteStatus(false)
                                                            handlePostStatus()
                                                        }}
                                                    >Đăng Bài</Button>
                                                </div>
                                            </CardContent>
                                            :
                                            <CardContent className="feed-main___body___right--write-status___brief">
                                                <Button
                                                    fullWidth
                                                    onClick={() => setIsWriteStatus(true)}>
                                                    <div className="feed-main___body___right--write-status___brief--avt" >
                                                        <img src="/none-avt.png" alt="avatar" />
                                                    </div>
                                                    <div className="feed-main___body___right--write-status___brief--content" >
                                                        Thông báo nội dung nào đó cho lớp học của bạn
                                                    </div>
                                                </Button>
                                            </CardContent>
                                    }


                                </Card>

                                {
                                    postList && postList.length !== 0 &&
                                    postList.map((feed) => {

                                        if (isPostDetail(feed))
                                            return <Post clickCreateComment={createComment} post={feed} />
                                        return <ThumbnailExercise feed={feed} />
                                    })
                                }

                                {/* <Card className="feed-main___body___right--exam">
                            <CardContent>

                            </CardContent>
                        </Card> */}
                            </div>
                        </Container>
                    </div>
                </> :
                (<CircularLoading />)
            }
        </>
    )
}

export default Feed;