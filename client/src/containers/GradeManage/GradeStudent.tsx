import { Card, Divider, TableBody, Table, TableContainer, Paper, TableHead, TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from "./index.module.scss";

const GradeStudent = () => {

    useEffect(() => {
        const getGradeStudent = async () => {
            try {
                
            } catch(err) {

            }
        }

    }, [])

    return (
        <Card className={styles.student}>
            <div className={styles.student___header}>
                Thông tin điểm số
            </div>
            <Divider />
            <div className={styles.student___main}>
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

                            <TableRow
                            >
                                <TableCell component="th" scope="row">
                                    1
                                </TableCell>
                                <TableCell align="left">hạkdhfkahsdkf</TableCell>
                                <TableCell align="left">123</TableCell>
                                <TableCell align="left">123</TableCell>
                                <TableCell align="left">123</TableCell>
                                <TableCell align="left">
                                    <Button style={{fontSize: "0.8rem"}}>
                                        Phúc khảo
                                    </Button>
                                </TableCell>
                            </TableRow>

                            <TableRow
                            >
                                <TableCell style={{ fontWeight: "bold" }} align="left" colSpan={5}>
                                    Tổng điểm
                                </TableCell>

                                <TableCell style={{ fontWeight: "bold" }} align="left">123</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Card>
    )
}

export default GradeStudent;