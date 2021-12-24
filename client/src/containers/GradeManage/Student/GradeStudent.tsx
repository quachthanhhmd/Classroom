import { Card, Divider, TableBody, Table, TableContainer, Paper, TableHead, TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showErrorNotify, showSuccessNotify } from '../../../actions/notification.action';
import courseApi from '../../../api/course.api';
import submissionApi from '../../../api/submission.api';
import CircularLoading from '../../../components/Loading';
import { Socket } from '../../../configs/websocket';
import { ICourseInfo, IGradeCourse, IReviewGrade, IUserSummary } from '../../../interfaces';
import { AppState } from '../../../reducers';
import styles from "../index.module.scss";
import ReviewGrade from './ReviewGrade';

interface IProps {
    course: ICourseInfo,
    user: IUserSummary,
}

const GradeStudent = (props: IProps) => {
    const { course, user } = props;
    const { courseId } = useParams<{ courseId: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [scoreList, setScoreList] = useState<IGradeCourse>();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectSubmission, setSelectSubmission] = useState<any>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const getGradeStudent = async () => {
            try {
                setIsLoading(true);
                const res = await courseApi.getStudentGrade(+courseId);
                setIsLoading(false);
                if (!res || res.status !== 200) throw new Error();
                setScoreList(res.data.payload);

            } catch (err) {

            }
        }
        getGradeStudent();
    }, [])

    const onSubmitReviewGrade = async (data: IReviewGrade) => {

        try {

            const socketData = {
                id: 0,
                content: `${user?.firstName} ${user?.lastName} đã yêu cầu phúc khảo điểm số.`,
                isRead: false,
                createdAt: new Date(),
                uri: `/course/${courseId}/post/${selectSubmission.id}/marking?userId=${user?.id}`,
                info: {
                    avatarUrl: user?.avatarUrl,
                    name: `${user?.firstName} ${user?.lastName}`
                }
            }
            Socket.emit("notify-one-exercise", ({data: socketData, userId: course.ownerId}));

            if (selectSubmission.submissionId === 0) throw new Error();
            setIsLoading(true);
            const res = await submissionApi.reviewGrade(+courseId, selectSubmission.submissionId, data);
            setIsLoading(false);
            if (!res || res.status !== 200) throw new Error();

            dispatch(showSuccessNotify("Gửi phản hồi thành công, đơn của bạn sẽ được xem xét."))

        } catch (err) {
            dispatch(showErrorNotify
                ("Cập nhật thất bại, vui lòng thử lại sau."));
        }
    }

    return (
        <>
            {
                !isLoading ?
                    <Card className={styles.student}>
                        <ReviewGrade isOpenModal={isOpenModal} setIsOpenModal={() => setIsOpenModal(false)} onSubmitReviewGrade={onSubmitReviewGrade} />
                        <div className={styles.student___header}>
                            Thông tin điểm số
                        </div>
                        <Divider />
                        <div className={styles.student___main}>
                            {scoreList ?
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>STT</TableCell>
                                                <TableCell align="left">Tên bài tập</TableCell>
                                                <TableCell align="left">Loại bài tập</TableCell>
                                                <TableCell align="left">Điểm số</TableCell>
                                                <TableCell align="left">Ghi chú</TableCell>
                                                <TableCell align="left">Phúc khảo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                scoreList.scoreList.map((submission) => (
                                                    <TableRow
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            1
                                                        </TableCell>
                                                        <TableCell align="left">{submission.title}</TableCell>
                                                        <TableCell align="left">{submission.typeName}</TableCell>
                                                        <TableCell align="left">{submission.score}</TableCell>
                                                        <TableCell align="left"></TableCell>
                                                        <TableCell align="left">
                                                            <Button style={{ fontSize: "0.8rem" }} onClick={() => {
                                                                setSelectSubmission(submission);
                                                                setIsOpenModal(true);
                                                            }}>
                                                                Phúc khảo
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }


                                            <TableRow
                                            >
                                                <TableCell style={{ fontWeight: "bold" }} align="left" colSpan={5}>
                                                    Tổng điểm
                                                </TableCell>

                                                <TableCell style={{ fontWeight: "bold" }} align="left">{`${scoreList.totalScore} / ${scoreList.totalMaxScore}`}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                :
                                <div style={{ textAlign: "center" }}>
                                    Giáo viên chưa trả bất kì bài tập nào
                                </div>

                            }
                        </div>
                    </Card>
                    :
                    <CircularLoading />
            }
        </>
    )
}

export default GradeStudent;