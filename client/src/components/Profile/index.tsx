import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    DialogTitle,
    TextField,
    Grid,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    CardContent,
    Box
} from "@material-ui/core";


import { PhotoCamera } from "@material-ui/icons";

import "./index.scss"

import { ProfileValidate } from "../../utils/validation";
import { IProfileBody } from "../../interfaces";

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
    const { register, handleSubmit, formState: { errors } } = useForm<IProfileBody>({
        resolver: yupResolver(ProfileValidate),
    })

    const handleClose = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <>
            <Dialog
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="form-profile-title"
            >
                <DialogTitle id="form-profile-title">Thông tin tin cá nhân</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid xs={4} className="avt-profile">
                            <IconButton

                                style={{ padding: 0, borderRadius: "100%", width: "inherit" }}
                            >
                                <img className="avt-profile--image" alt="avatar" src="/none-avt.png" />
                                <PhotoCamera className="avt-profile--icon-upload" />
                            </IconButton>
                        </Grid>
                        <Grid xs={8}>
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
                                    <TextField
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
                                    </Box>
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

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Giới Tính</FormLabel>
                                        <RadioGroup row aria-label="gender" {...register("gender")}>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>

                                </div>
                            </CardContent>

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ProfileUser;