
import React from 'react';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { showErrorNotify, showInfoNotify } from "../../actions/notification.action";
import courseApi from "../../api/course.api";
import memberApi from '../../api/member.api';
import { downloadFile, uploadFile } from "../../configs/firebase";
import { TYPEROLE } from '../../constants';
import { AppState } from '../../reducers';
import GradeBoard from "./Teacher/GradeBoard";
import GradeStudent from './Student/GradeStudent';
import GradingOption from "./Teacher/GradingOption";
import styles from "./index.module.scss";


const GradeManage = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useDispatch();
    const member = useSelector((state: AppState) => state.member);
    const course = useSelector((state: AppState) => state.course);
    const auth = useSelector((state: AppState) => state.auth);

    const onDownloadGradingBoard = async () => {
        try {
            dispatch(showInfoNotify('Xuất bảng điểm ...'));

            const res = await courseApi.exportGradeBoard(+courseId);
            if (!res || res.status !== 200) throw new Error();

            const fileUrl = res.data.payload;
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                let blob = new Blob([xhr.response]);
                let href = URL.createObjectURL(blob);
                let a = document.createElement('a') as HTMLAnchorElement;
                a.href = href;
                a.setAttribute('download', `Grading.xlsx`);
                a.click();
                URL.revokeObjectURL(href);
            };
            xhr.open('GET', fileUrl);
            xhr.responseType = 'blob';
            xhr.send();
            ;
        } catch (error: any) {
            dispatch(
                showErrorNotify(
                    "Xuất file thất bại, vui lòng thử lại sau"
                )
            );
            console.log(error.message);
        }
    };
    const onDownloadStudentListTemplate = async () => {
        await downloadFile('Student-list-import.xlsx', 'templates');
    };

    const onUploadStudentList = async (file: any) => {
        dispatch(showInfoNotify('Đang xử lý...'));

        try {
            const url = await uploadFile("excel-server-upload", file);
            const res = await memberApi.importMemberList(+courseId, { url });

            if (!res || res.status !== 200) throw new Error();

            window.location.reload();
        } catch (err) {
            dispatch(showErrorNotify("Upload danh sách học sinh thất bại"))
        }
    }

    return (
        <>
            <Helmet>
                <title>Điểm số | EClassroom</title>
            </Helmet>


            <main>
                {member && member.currentRole ? member.currentRole.role === TYPEROLE.TEACHER ?
                    <>
                        {course && course.course && course.course.ownerId === auth!.user?.id &&
                            <div className={styles.top}>
                                <span> Chỉnh sửa thông tin người quản trị</span>

                                <GradingOption
                                    onDownloadStudentListTemplate={onDownloadStudentListTemplate}
                                    onUploadStudentList={onUploadStudentList}

                                    onDownLoadGradeBoard={onDownloadGradingBoard}
                                />

                            </div>
                        }
                        <GradeBoard
                        />
                    </>
                    :
                        course.course && auth.user &&
                        <GradeStudent course={course.course} user={auth.user} />
                    :
                    <></>
                }

            </main>

        </>
    );
}

export default GradeManage;