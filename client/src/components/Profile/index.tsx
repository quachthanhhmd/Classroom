import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, CardContent, Dialog,
    DialogActions,
    DialogContent, DialogTitle, FormControl, Grid, InputLabel,
    Select, TextField
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updateUserHeader } from "../../actions";
import { storage } from "../../configs/firebase";
import { IProfileBody } from "../../interfaces";
import { AppState } from "../../reducers";
import { objectFieldChange } from "../../utils/object-solve";
import { ProfileValidate } from "../../utils/validation";
import PasswordManage from '../PasswordManage';
import "./index.scss";



interface IOpenModal {
    isOpenModal: boolean,
    setIsOpenModal: any,
}

const ProfileError = (err: { message: string }) => {
    return (
        <span style={{ color: "red" }}>* {err.message}</span>
    )
}


const ProfileUser = (props: IOpenModal) => {
    const { isOpenModal, setIsOpenModal } = props;
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string>("");
    const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);

    const auth = useSelector((state: AppState) => state.auth);
    const userProfile = auth.user;

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProfileBody>({
        resolver: yupResolver(ProfileValidate),
        defaultValues: useMemo(() => {
            return {
                firstName: userProfile?.firstName,
                lastName: userProfile?.lastName,
                birthDay: userProfile?.birthDay,
                gender: userProfile?.gender,
                //avatarUrl: userProfile?.avatarUrl
            }
        }, [userProfile])
    })
    useEffect(() => {
        setPreview(userProfile?.avatarUrl || "");
        reset({
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            birthDay: userProfile?.birthDay,
            gender: userProfile?.gender,
            //avatarUrl: userProfile?.avatarUrl
        });
    }, [auth]);

    const handleClose = () => {
        setIsOpenModal(!isOpenModal);
    };



    useEffect(() => {
        if (!selectedFile) {
            setPreview("")
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function changeImageUpload(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }
    function dispatchProfileAndUpdate(data: any) {
        data.birthDay = new Date(data.birthDay).setTime(0);

        const newData: any = objectFieldChange(userProfile, data);

        if (!Object.keys(newData)) return;

        dispatch(updateProfile(newData));

        //change header
        const newHeader = { ...userProfile, ...newData };
        dispatch(updateUserHeader(newHeader));
    }

    const handleUpload = async () => {
        const uploadTask = storage.ref(`images/${selectedFile!.name}`).put(selectedFile!);
        uploadTask.on(
            "state_changed",
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            },
            (error: any) => {
                console.log(error);
            },
            () => {

                storage
                    .ref("images")
                    .child(selectedFile!.name)
                    .getDownloadURL()
                    .then((url: string) => {
                        dispatchProfileAndUpdate({ avatarUrl: url })
                        setPreview(url);
                    });
            }
        );
    };

    const handleUpdateProfile = (data: IProfileBody) => {
        handleClose();
        if (typeof selectedFile !== "undefined") {
            handleUpload();
        }
        dispatchProfileAndUpdate(data);

    }

    return (
        <>
            <PasswordManage isOpenModal={isOpenPassword} setIsOpenModal={setIsOpenPassword} />
            <Dialog
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="form-profile-title"
            >

                <DialogTitle id="form-profile-title">Thông tin tin cá nhân</DialogTitle>
                <DialogContent>

                    <Grid container spacing={2}>
                        <Grid item={true} xs={4} className="avt-profile">
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                onChange={changeImageUpload}
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button
                                    component="span"
                                    style={{ padding: 0, borderRadius: "100%", width: "inherit" }}
                                >
                                    <div className="cicular">
                                        <img className="avt-profile--image" alt="avatar" src={`${preview || "/none-avt.png"}`} />
                                    </div>
                                    <PhotoCamera className="avt-profile--icon-upload" />
                                </Button>
                            </label>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <CardContent>
                                <div>
                                    <div className="name-input">
                                        <div>
                                            <TextField
                                                error={Boolean(errors.firstName)}
                                                id="first-name"
                                                type="text"
                                                label="Họ"
                                                placeholder="Họ"
                                                margin="normal"
                                                {...register("firstName")}
                                                InputLabelProps={{ shrink: true, required: true }}
                                                required
                                            />
                                            <Box>
                                                {errors.firstName && (<ProfileError message={errors!.firstName.message as string} />)}
                                            </Box>
                                        </div>
                                        <div>
                                            <TextField
                                                error={Boolean(errors.lastName)}
                                                id="last-name"
                                                type="text"
                                                label="Tên"
                                                placeholder="Tên"
                                                margin="normal"
                                                {...register("lastName")}
                                                InputLabelProps={{ shrink: true, required: true }}
                                                required
                                            />
                                            <Box>
                                                {errors.lastName && (<ProfileError message={errors!.lastName.message as string} />)}
                                            </Box>
                                        </div>
                                    </div>

                                    <TextField
                                        error={Boolean(errors.birthDay)}
                                        fullWidth
                                        type="date"
                                        label="Ngày Sinh"

                                        InputLabelProps={{ shrink: true, required: true }}
                                        inputProps={{ max: new Date() }}
                                        margin="normal"
                                        {...register("birthDay")}
                                        required
                                    />
                                    <div>
                                        <Button
                                            color="secondary"
                                            onClick={() => {setIsOpenPassword(true)}}
                                        >
                                            Đổi mật khẩu
                                        </Button>
                                    </div>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="signup_gender">
                                            Giới tính
                                        </InputLabel>
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
                                            getContentAnchorEl: null
                                          }}
                                            id="signup_gender"
                                            native

                                            defaultValue="male"
                                            {...register("gender")}
                                        >
                                            <option value="male" style={{ paddingLeft: "0.5rem" }}>Nam</option>
                                            <option value="female" style={{ paddingLeft: "0.5rem" }}>Nữ</option>
                                            <option value="other" style={{ paddingLeft: "0.5rem" }}>Khác</option>
                                        </Select>
                                    </FormControl>


                                    <Box>
                                        {errors.gender && (<ProfileError message={errors!.gender.message as string} />)}
                                    </Box>
                                </div>
                            </CardContent>

                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => handleClose()}>
                        Hủy bỏ
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSubmit(handleUpdateProfile)}>
                        Cập Nhật
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default ProfileUser;