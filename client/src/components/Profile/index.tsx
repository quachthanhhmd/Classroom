import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, CardContent, Dialog,
    DialogActions,
    DialogContent, DialogTitle, FormControl, Grid, InputLabel,
    Select, TextField
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../../configs/firebase";
import { IProfileBody } from "../../interfaces";
import { ProfileValidate } from "../../utils/validation";
import "./index.scss";
import { AppState } from "../../reducers";
import { updateProfile } from "../../actions";
import { useDispatch, useSelector } from "react-redux";


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

    const userProfile = useSelector((state: AppState) => state.auth.user);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<IProfileBody>({
        resolver: yupResolver(ProfileValidate),
        defaultValues: {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            birthDay: userProfile?.birthDay,
            gender: userProfile?.gender,
        }
    })

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
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0])
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${selectedFile!.name}`).put(selectedFile!);
        uploadTask.on(
            "state_changed",
            (error: any) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(selectedFile!.name)
                    .getDownloadURL()
                    .then((url: string) => {

                        setPreview(url);
                    });
            }
        );
    };

    const handleUpdateProfile = async (data: IProfileBody) => {

        if (typeof selectedFile !== "undefined") {
            await handleUpload();
        }
        data.avatarUrl = preview;
        dispatch(updateProfile(data));
    }

    return (

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
                                    <img className="avt-profile--image" alt="avatar" src={`${selectedFile ? preview : "/none-avt.png"}`} />
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
                                {/* <TextField
                                        error={Boolean(errors.password)}
                                        fullWidth
                                        id="password"
                                        type="password"
                                        label="Mật khẩu"
                                        placeholder="Mật khẩu"
                                        margin="normal"
                                        {...register("password")}
                                        InputLabelProps={{ shrink: true, required: true }}
                                        required
                                    />
                                    <Box>
                                        {errors.password && (<ProfileError message={errors!.password.message as string} />)}
                                    </Box> */}
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

                                <FormControl fullWidth>
                                    <InputLabel htmlFor="signup_gender">
                                        Giới tính
                                    </InputLabel>
                                    <Select
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
                    Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit(handleUpdateProfile)}>
                    Update
                </Button>

            </DialogActions>

        </Dialog>

    )
}

export default ProfileUser;