import MomentUtils from "@date-io/moment";
import { yupResolver } from '@hookform/resolvers/yup';
import {
    AppBar, Box, Button, Card, CardContent, CardHeader, Dialog, DialogContent, Divider, FormControl,
    Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Toolbar, Typography
} from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { convertToRaw, EditorState } from "draft-js";
import moment from "moment";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ICreateExercise } from "../../interfaces";
import { AppState } from '../../reducers';
import { CreateExerciseValidate } from "../../utils/validation";
import CircularLoading from '../Loading';
import RichText from '../RichText';
import "./index.scss";




interface IPropsType {
    open: boolean;
    handleClose: () => void;
    clickCreate: (data: ICreateExercise) => void;
}

interface ICreateExerciseValidate {
    title: string,
    topic: string,
    deadline: Date,
    typeId: string,
}

interface ITopicSend {
    id: number,
    topic: string,
}

const AddExercise = (props: IPropsType) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateExerciseValidate>({
        resolver: yupResolver(CreateExerciseValidate),
    })
    const [topic, setTopic] = useState<ITopicSend>({
        id: 0,
        topic: ""
    })
    const [inputValue, setInputValue] = useState<Date | null>(new Date());

    const course = useSelector((state: AppState) => state!.course);
    const [isCreateTopic, setIsCreateTopic] = useState<boolean>(false);
    const { open, handleClose, clickCreate } = props;

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onClose = () => {

        handleClose();
    }

    const handleCreateExercise = (data: any) => {
        onClose();
        let newData = { ...data, topic };
        if (editorState.getCurrentContent().hasText()) {
            newData = { ...newData, description: JSON.stringify(convertToRaw(editorState.getCurrentContent())) };
        }


        if (inputValue && inputValue > new Date()) {
            newData = { ...newData, deadline: inputValue };
        }


        console.log(newData);
        clickCreate(newData);
    }


    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
            >
                {/* <DialogTitle id="form-dialog-title">Th??m b??i t???p m???i</DialogTitle> */}
                {course ?
                    <>
                        <form onSubmit={handleSubmit(handleCreateExercise)}>
                            <AppBar style={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                    >
                                        <Close />
                                    </IconButton>
                                    <Typography style={{ marginLeft: 2, flex: 1 }} variant="h5" component="div">
                                        Th??m b??i t???p m???i
                                    </Typography>
                                    <Button style={{ marginRight: "1.5rem" }} type="submit" autoFocus color="inherit" >
                                        Giao b??i
                                    </Button>
                                </Toolbar>
                            </AppBar>

                            <DialogContent>
                                <Grid container spacing={2} style={{ padding: "1.5rem" }}>
                                    <Grid item xs={8}>
                                        <Card style={{ padding: "1rem" }}>
                                            <CardHeader
                                                title="N???i dung"
                                                style={{ fontWeight: "bold" }}
                                            />
                                            <TextField
                                                error={Boolean(errors.title)}
                                                fullWidth
                                                label="Ti??u ?????"
                                                {...register("title")}
                                            />
                                            <Box style={{ color: "red" }}>
                                                {errors.title && (
                                                    <span>* {errors.title.message}</span>
                                                )}
                                            </Box>
                                            <Card style={{ marginTop: "1rem" }} >
                                                <CardContent
                                                    style={{ fontSize: "1rem" }}
                                                >
                                                    H?????ng d???n (kh??ng b???t bu???c)
                                                </CardContent>
                                                <div className="exercise___rich-text">
                                                    <RichText content={editorState} setContent={setEditorState} />
                                                </div>
                                            </Card>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3} style={{ marginLeft: "2.5rem" }}>
                                        <Card style={{ padding: "1rem" }}>
                                            <CardHeader
                                                title="T??y ch???nh"
                                            />
                                            <Box className="exercise___option">
                                                {!isCreateTopic ?
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="uncontrolled-native-topic">Ch??? ?????</InputLabel>
                                                        <Select
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left"
                                                                },
                                                                transformOrigin: {
                                                                    vertical: "top",
                                                                    horizontal: "left"
                                                                },
                                            
                                                            }}
                                                            label="Ch??? ?????"
                                                            value={topic.id}
                                                            onChange={(e) => setTopic({ id: Number(e.target.value), topic: topic.topic })}

                                                            variant="standard" labelId="uncontrolled-native-topic">
                                                            {course.course && course.course.topicList && course.course.topicList.map((topic, index) => (
                                                                <MenuItem className="exercise___dropdown--option" key={`topic-${index}`} value={topic.id}>{topic.topic}</MenuItem >
                                                            ))}
                                                            <MenuItem className="exercise___dropdown--option" >
                                                                <Button
                                                                    fullWidth
                                                                    onClick={() => setIsCreateTopic(true)}>
                                                                    T???o ch??? ????? m???i
                                                                </Button>
                                                            </MenuItem>
                                                        </Select>

                                                    </FormControl>
                                                    :
                                                    <TextField
                                                        label={"T???o ch??? ????? m???i"}
                                                        value={topic.topic}
                                                        onChange={(e) => setTopic({ id: Number(-1), topic: e.target.value })}
                                                        fullWidth
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment

                                                                    onClick={() => setIsCreateTopic(false)}
                                                                    position="start">
                                                                    <Close />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                }
                                            </Box>
                                            <Divider />
                                            <Box className="exercise___option">
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel id="uncontrolled-native-grade-structure">Ph??n lo???i</InputLabel>
                                                    <Select
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            },
                                                            transformOrigin: {
                                                                vertical: "top",
                                                                horizontal: "left"
                                                            },
                                                            //getContentAnchorEl: null
                                                        }}
                                                        label="Ph??n lo???i"
                                                        {...register("typeId")}
                                                        variant="standard" labelId="uncontrolled-native-grade-structure"
                                                    >
                                                        {course.course && course.course.exerciseTypeList && course.course.exerciseTypeList.map((exercise, index) => (
                                                            <MenuItem className="exercise___dropdown--option" key={`exercise-type-${index}`} value={exercise.id}>{exercise.name}</MenuItem >
                                                        ))}

                                                    </Select>
                                                    <Box style={{ color: "red" }}>
                                                        {errors.typeId && (
                                                            <span>* {errors.typeId.message}</span>
                                                        )}
                                                    </Box>
                                                </FormControl>
                                            </Box>

                                            <Divider />
                                            <Box style={{ minWidth: 120 }} className="exercise___option">
                                                <FormControl fullWidth>

                                                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                                                        <KeyboardDateTimePicker
                                                            variant="inline"
                                                            ampm={false}
                                                            label="H???n n???p"
                                                            value={inputValue}

                                                            onChange={(newDate: any) => setInputValue(newDate)}
                                                            disablePast
                                                        //rifmFormatter={dateFormatter}
                                                        />
                                                    </MuiPickersUtilsProvider >

                                                </FormControl>
                                            </Box>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </form>
                    </>
                    :
                    <CircularLoading />
                }
            </Dialog>
        </>
    )
}

export default AddExercise;