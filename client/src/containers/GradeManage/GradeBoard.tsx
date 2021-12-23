import { Avatar } from '@material-ui/core';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showErrorNotify, showSuccessNotify } from '../../actions/notification.action';
import courseApi from '../../api/course.api';
import exerciseApi from '../../api/exercise.api';
import submissionApi from '../../api/submission.api';
import CircularLoading from '../../components/Loading';
import { uploadFile } from '../../configs/firebase';
import { SubmissionType } from '../../constants';
import { AppState } from '../../reducers';
import styles from './index.module.scss';
import PointStructureColOption from './PointStructureColOption';

export interface IPointStructure {
    name: string;
    point: number;
    code?: string;
    isFinalized?: boolean;
}

const data = [
    {
        name: "bai tap 1",
        point: 1,
        code: "as",
        isFinalized: true
    },
    {
        name: "bai tap 1",
        point: 1,
        code: "as",
        isFinalized: true
    },
    {
        name: "bai tap 1",
        point: 1,
        code: "as",
        isFinalized: true
    },
    {
        name: "bai tap 1",
        point: 1,
        code: "as",
        isFinalized: true
    },
    {
        name: "bai tap 1",
        point: 1,
        code: "as",
        isFinalized: true
    }
]

interface IExerciseSummary {
    id: number,
    title: string,
    state: string,
    typeId: number,
}


interface Props {
    // gradeBoard: any;
    // isClassCreator: boolean;
    // onUpdateGradeOnBoard: (submissionId: number, score: number) => void;
    // onExportGradingForPointStructure: (pointStructure: any) => void;
    // onToggleFinalForPointStructure: (pointStructure: any) => void;
}


const GradeBoard = (props: Props) => {
    const dispatch = useDispatch();
    const { courseId } = useParams<{ courseId: string }>();
    const [studentList, setStudentList] = useState<any[]>([]);
    const [exerciseList, setExerciseList] = useState<IExerciseSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const course = useSelector((state: AppState) => state!.course);

    const pointStructures = course.course?.exerciseTypeList;

    useEffect(() => {
        const getAuthStudent = async (courseId: number) => {
            try {
                const result = await courseApi.getStudentList(courseId);

                if (!result || result.status !== 200) throw new Error();
                console.log(result.data.payload);
                setStudentList(result.data.payload);

                if (result.data.payload.length > 0) {

                    setExerciseList(result.data.payload[0].exerciseList.map(data => {
                        return {
                            id: data.exerciseId,
                            title: data.title,
                            state: data.state,
                            typeId: data.typeId,
                        }
                    }))
                }
            } catch (err) { }
        }
        getAuthStudent(+courseId);
    }, [])

    const onUpdateGradeOnBoard = async (userId: number, exerciseId: number, score: number) => {

        try {
            setIsLoading(true);
            const res = await submissionApi.updateScore(+courseId, userId, exerciseId, { type: SubmissionType.SCORED, score });
            setIsLoading(false);
            if (!res || res.status !== 200) throw new Error();

            const newData = [...studentList].map((item) => {

                if (item.user.userId === res.data.payload.userId) {

                    item.exerciseList = item.exerciseList.map((exercise) => {
                        const exerciseSubmitList = exercise.submissionList.map((submission) => {
                            if (submission.id === res.data.payload.id) {
                                submission.score = score;
                            }
                            return submission;
                        });

                        exercise.submissionList = exerciseSubmitList;

                        return exercise;
                    });
                    return item;
                }
                return item;
            });
            setStudentList(newData);
            dispatch(showSuccessNotify("Cập nhật điểm thành công"));
        } catch (err) {
            console.log(err);
            dispatch(showErrorNotify("Cập nhật điểm thất bại, vui lòng thử lại sau"));
        }
    }
    // const onExportPointGrading = (pointStructure: any) => {
    //     onExportGradingForPointStructure(pointStructure);
    //   };

      const onToggleFinalizePoint = async (exerciseId: number) => {
     
            try {   
                const res = await exerciseApi.updateExercise(+courseId, exerciseId, {state: "completed"});
                if (!res || res.status !== 200) throw new Error();

                dispatch(showSuccessNotify("Trả bài thành công"));
            } catch(err) {
                dispatch(showErrorNotify("Cập nhật thất bại, vui lòng thử lại sau"));
            }
      };

    const pointOfStructure = (item: IExerciseSummary) => {
        if (!pointStructures || exerciseList.length === 0) return "";
        const exerciseStructure = pointStructures.filter((structure) => structure.id === item.typeId);

        if (!exerciseStructure || exerciseStructure.length === 0) return "Chưa được phân loại";
        return `${exerciseStructure[0].name}: ${exerciseStructure[0].grade} điểm`;
    }
    const markClick = (e: any) => {
        //if (!isClassCreator) return;
        e.target.classList.add(`${styles['mark--hide']}`);
        e.target.nextSibling.classList.remove(`${styles['input--hide']}`);
    };

    const markInputClose = (e: any, initialMark: number) => {
        e.target.previousSibling.previousSibling.value = initialMark;
        e.target.parentElement.previousSibling.classList.remove(
            `${styles['mark--hide']}`
        );
        e.target.parentElement.classList.add(`${styles['input--hide']}`);
    };


    const updateGrade = async (e: any, userId: number, exerciseId: number) => {

        const newMark = e.target.previousSibling.value;
        e.target.parentElement.previousSibling.classList.remove(
            `${styles['mark--hide']}`
        );
        e.target.parentElement.classList.add(`${styles['input--hide']}`);

        await onUpdateGradeOnBoard(userId, exerciseId, +newMark);
    }

    const onUploadExerciseGrade = async (file: any, exerciseId: number) => {

        try {
            const url = await uploadFile("excel-server-upload/import-exercise", file);
   
            const res = await exerciseApi.importExercise(+courseId, exerciseId, { url });
   
            if (!res || res.status !== 200) throw new Error()
            window.location.reload()
        } catch (err) {
            console.log(err);
            dispatch(showErrorNotify("Cập nhật điểm thất bại"))
        }
    }

    const onExportExerciseGrade = async ( exerciseId: number) => {
        try {
            const res = await exerciseApi.exportExercise(+courseId, exerciseId);
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
        } catch (err) {
            dispatch(showErrorNotify("Xuất bảng điểm thất bại"));
        }
    }

    const renderTable = () => {
        if (!studentList || studentList.length === 0 || !exerciseList) return <></>;

        const tableContent: ReactNode[] = [];

        tableContent.push(
            <colgroup>
                <col span={1} style={{ width: '20%' }} />
                {exerciseList.length > 0 ? (
                    exerciseList.map((_: any, index: number) => (
                        <col
                            key={`col-group-${index + 1}`}
                            span={1}
                            style={{ width: `${70 / exerciseList.length}%` }}
                        />
                    ))
                ) : (
                    <col span={1} style={{ width: '80%' }} />
                )}
                <col span={1} style={{ width: '10%' }} />
            </colgroup>
        );

        tableContent.push(
            <thead>
                <tr>
                    <th>Thông tin sinh viên</th>
                    {exerciseList.length > 0 ? (
                        exerciseList.map((item: IExerciseSummary, index: number) => (
                            <th key={`point-structure-${index + 1}`}>
                                {item.title}
                                <span className={styles['text-small']}>
                                    {pointOfStructure(item)}
                                </span>

                                <div className={styles.option}>
                                    <PointStructureColOption
                                        id={`point-structure-option-${index + 1}`}
                                        pointStructure={item}
                                        onExportPointGrading={onExportExerciseGrade}
                                        onToggleFinalizePoint={onToggleFinalizePoint}
                                        onUploadExerciseGrade={onUploadExerciseGrade}
                                    />
                                </div>
                                {/* {isClassCreator ? (
                                   
                                ) : (
                                    <></>
                                )} */}
                            </th>
                        ))
                    ) : (
                        <th>Lớp học không có cấu trúc điểm</th>
                    )}
                    <th>Tổng kết</th>
                </tr>
            </thead>
        );

        const rows: ReactNode[] = [];

        for (let i = 0; i < studentList.length; i++) {
            const student = studentList[i];



            rows.push(
                <tr>
                    <td>
                        {student.user ? (
                            <div className={styles.user}>
                                <div>
                                    <Avatar
                                        src={student.user?.avatarUrl ? student.user?.avatarUrl : "/none-avt.png"}
                                        // data-src={student.user?.avatarUrl}
                                        // data-srcset={student.user?.avatarUrl}
                                        alt="avatar"
                                    // width={40}
                                    // height={40}

                                    />
                                </div>
                                <div>
                                    {`${student.user.firstName} ${student.user.lastName}`}
                                    {student.studentId ? (
                                        <span className={styles['text-small']}>
                                            Id: {student.studentId}
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>  {`${student.user.firstName} ${student.user.lastName}`}</>
                        )}
                    </td>
                    {
                        student.exerciseList.map((item, index) => (
                            <td key={`student-${i + 1}-point-structure-${index + 1}`}>
                                <span
                                    className={`${styles.mark} ${styles['mark--cursor']}`}
                                    onClick={markClick}
                            >
                                    {item.submissionList.length === 0 ? 'Chưa chấm điểm' : item.submissionList[0].score}
                                </span>
                                <div className={`${styles.input} ${styles['input--hide']}`}>
                                    <input
                                        className={styles.input__input}
                                        defaultValue={item.submissionList.length === 0 ? 0 : item.submissionList[0].score}
                                        type="number"
                                    />
                                    <button
                                        className={`${styles.input__button} ${styles['input__button--green']}`}
                                        onClick={(e) =>
                                            updateGrade(e, student.user.userId, item.exerciseId)
                                        }
                                    >
                                        &#10003;
                                    </button>
                                    <button
                                        className={`${styles.input__button} ${styles['input__button--red']}`}
                                        onClick={(e: any) => markInputClose(e, item.mark)}
                                    >
                                        &#10006;
                                    </button>
                                </div>
                            </td>
                        ))
                    }

                    <td>{student.totalScore}</td>
                </tr>
            );
        }

        tableContent.push(<tbody>{rows}</tbody>);
        return <table>{tableContent}</table>;
    };


    return (
        <>
            {
                isLoading ?
                    <CircularLoading />
                    :
                    <div className={styles.board}>{renderTable()}</div>
            }</>

    )
}

export default GradeBoard;