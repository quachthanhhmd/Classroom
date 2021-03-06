import { Card, Divider, TableBody, Table, TableContainer, Paper, TableHead, TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showErrorNotify, showSuccessNotify } from '../../../actions/notification.action';
import courseApi from '../../../api/course.api';
import submissionApi from '../../../api/submission.api';
import CircularLoading from '../../../components/Loading';
import { Socket } from '../../../configs/websocket';
import { TeacherReview, TeacherReviewUri } from '../../../constants';
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
                content: `${user?.firstName} ${user?.lastName} ???? y??u c???u ph??c kh???o ??i???m s???.`,
                isRead: false,
                createdAt: new Date(),
                uri: TeacherReviewUri(+courseId, selectSubmission.id, user?.id),
                info: {
                    avatarUrl: user?.avatarUrl,
                    name: `${user?.firstName} ${user?.lastName}`
                }
            }
            Socket.emit("notify-one-exercise", ({ data: socketData, userId: course.ownerId }));

            if (selectSubmission.submissionId === 0) throw new Error();
            setIsLoading(true);
            const res = await submissionApi.reviewGrade(+courseId, selectSubmission.submissionId, data);
            setIsLoading(false);
            if (!res || res.status !== 200) throw new Error();

            dispatch(showSuccessNotify("G???i ph???n h???i th??nh c??ng, ????n c???a b???n s??? ???????c xem x??t."))

        } catch (err) {
            dispatch(showErrorNotify
                ("C???p nh???t th???t b???i, vui l??ng th??? l???i sau."));
        }
    }

    return (
        <>
            {
                !isLoading ?
                    <Card className={styles.student}>
                        <ReviewGrade isOpenModal={isOpenModal} setIsOpenModal={() => setIsOpenModal(false)} onSubmitReviewGrade={onSubmitReviewGrade} />
                        <div className={styles.student___header}>
                            Th??ng tin ??i???m s???
                        </div>
                        <Divider />
                        <div className={styles.student___main}>
                            {scoreList ?
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>STT</TableCell>
                                                <TableCell align="left">T??n b??i t???p</TableCell>
                                                <TableCell align="left">Lo???i b??i t???p</TableCell>
                                                <TableCell align="left">??i???m s???</TableCell>
                                                <TableCell align="left">Ghi ch??</TableCell>
                                                <TableCell align="left">Ph??c kh???o</TableCell>
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
                                                                Ph??c kh???o
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }


                                            <TableRow
                                            >
                                                <TableCell style={{ fontWeight: "bold" }} align="left" colSpan={5}>
                                                    T???ng ??i???m
                                                </TableCell>

                                                <TableCell style={{ fontWeight: "bold" }} align="left">{`${scoreList.totalScore} / ${scoreList.totalMaxScore}`}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                :
                                <div style={{ textAlign: "center" }}>
                                    Gi??o vi??n ch??a tr??? b???t k?? b??i t???p n??o
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