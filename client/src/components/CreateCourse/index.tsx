import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../actions/course.action";
import { AppState } from "../../reducers";
// import { createCourseModal } from "../../actions";
import { LENGTH_TEXT_CREATE_COURSE, STUDENT_IN_COURSE } from "../../constants";
import { ICreateCourse } from "../../interfaces";


interface IOpenModal {
    isOpenModal: boolean,
    setIsOpenModal: any,
}

function CreateCourse(props: IOpenModal) {
    const { isOpenModal, setIsOpenModal } = props;
    const course = useSelector((state: AppState) => state.course);

    const [numberInput, setNumberInput] = React.useState("");
    const [nameCourse, setNameCourse] = React.useState("");
    const [topicCourse, setTopicCourse] = React.useState("");
    const [description, setDescription] = React.useState("");

    const dispatch = useDispatch();
    const handleClose = () => {
        setIsOpenModal(!isOpenModal);
    };

    function handleNumberInput(e: any) {

        if ((Number(e.target.value) && Number(e.target.value) >= 1 && Number(e.target.value < STUDENT_IN_COURSE)) || e.target.value === "") {
            setNumberInput(e.target.value);
        }
        else return;
    }

    function handleNameInput(e: any) {
        if (typeof e.target.value === "string" && e.target.value.length < LENGTH_TEXT_CREATE_COURSE) {
            setNameCourse(e.target.value);
        }
    }

    function handleTopicInput(e: any) {
        if (typeof e.target.value === "string" && e.target.value.length < LENGTH_TEXT_CREATE_COURSE) {
            setTopicCourse(e.target.value);
        }
    }

    function handleDescriptionInput(e: any) {
        if (typeof e.target.value === "string" && e.target.value.length < LENGTH_TEXT_CREATE_COURSE) {
            setDescription(e.target.value);
        }
    }


    async function handleCreateCourse() {
        try {
            const body: ICreateCourse = {
                name: nameCourse,
                description: description,
                topic: topicCourse,
                studentLimit: Number(numberInput),
            }

            dispatch(createCourse(body));
            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Dialog
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Tạo lớp học mới</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập một vài thông tin để tạo lớp học
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên lớp học"
                        type="text"
                        fullWidth
                        value={nameCourse}
                        onChange={handleNameInput}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Chủ đề"
                        type="text"
                        fullWidth
                        value={topicCourse}
                        onChange={handleTopicInput}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Mô tả khóa học"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={handleDescriptionInput}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Số lượng học sinh"
                        type="text"
                        value={numberInput}
                        onChange={handleNumberInput}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => handleClose()}>
                        Hủy bỏ
                    </Button>
                    <Button color="primary" onClick={handleCreateCourse}>
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateCourse;