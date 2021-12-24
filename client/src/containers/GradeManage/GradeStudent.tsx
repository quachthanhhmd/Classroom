import { Card, Divider, TableBody, Table, TableContainer, Paper, TableHead, TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseApi from '../../api/course.api';
import CircularLoading from '../../components/Loading';
import { IGradeCourse } from '../../interfaces';
import styles from "./index.module.scss";

const GradeStudent = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [scoreList, setScoreList] = useState<IGradeCourse>();

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

    return (
        <>
            {
                !isLoading ?
                    <Card className={styles.student}>
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
                                                            <Button style={{ fontSize: "0.8rem" }}>
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