import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    DialogTitle,
    TextField,
    Grid,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    CardContent
} from "@material-ui/core";


import { PhotoCamera  } from "@material-ui/icons";

import moment from "moment";

import "./index.scss"

interface IOpenModal {
    isOpenModal: boolean,
    setIsOpenModal: any,
}


const ProfileUser = (props: IOpenModal) => {
    const { isOpenModal, setIsOpenModal } = props;
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const handleClose = () => {
        setIsOpenModal(!isOpenModal);
    };

    function handleChangeGender(e: any) {

        if (["female", "male", "other"].includes(e.target.value)) {
            setGender(e.target.value);
        }
    }

    function handleChangeBirthDay(e: any) {
        console.log(e.target.value, moment(e.target.value).format("YYYY-MM-DD"));
        setBirthDay(moment(e.target.value).format("YYYY-MM-DD"));
    }
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
                             
                             style={{padding: 0, borderRadius: "100%", width: "inherit"}}
                             >
                                <img className="avt-profile--image" alt="avatar" src="/none-avt.png" />
                                <PhotoCamera className="avt-profile--icon-upload"/>
                            </IconButton>
                        </Grid>
                        <Grid xs={8}>
                            <CardContent>
                                <div>
                                    <div className="name-input">
                                        <TextField
                                            //error={state.isError}

                                            id="first-name"
                                            type="text"
                                            label="Họ"
                                            placeholder="Họ"
                                            margin="normal"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            InputLabelProps={{ shrink: true, required: true }}
                                            required
                                        />
                                        <TextField
                                            //error={state.isError}
                                            id="last-name"
                                            type="text"
                                            label="Tên"
                                            placeholder="Tên"
                                            margin="normal"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            InputLabelProps={{ shrink: true, required: true }}
                                            required
                                        />
                                    </div>
                                    <TextField
                                        //error={state.isError}
                                        fullWidth
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Mật khẩu"
                                        margin="normal"
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputLabelProps={{ shrink: true, required: true }}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Ngày Sinh"
                                        InputLabelProps={{ shrink: true, required: true }}
                                        inputProps={{ max: new Date() }}
                                        margin="normal"
                                        value={birthDay}
                                        //defaultValue="2000-06-11"
                                        onChange={handleChangeBirthDay}
                                        required
                                    />

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Giới Tính</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={handleChangeGender}>
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