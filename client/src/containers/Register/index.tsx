import React, { useState, useEffect } from 'react';

import moment from "moment";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Button,
    TextField,
    CardContent,
    CardActions,
    CardHeader,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';

import "./index.scss";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../reducers";
import { signUp } from "../../actions";
import { ISignUpInput } from "../../interfaces";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            // display: 'flex',
            // flexWrap: 'wrap',
            width: 600,
            margin: `0 auto`,
            height: "100%",
            // alignItems: 'center',
            // justifyContent: 'center'
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        inputName: {
            display: 'flex',
            justifyContent: 'space-between'
        },

    })
);


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [gender, setGender] = useState<string>("");

  
    const dispatch = useDispatch();
    

    const classes = useStyles();

    


    function handleChangeGender(e: any) {

        if (["female", "male", "other"].includes(e.target.value)) {
            setGender(e.target.value);
        }
    }

    async function registerAccount() {

        const body: ISignUpInput = {
            firstName,
            lastName,
            gender,
            birthDay: new Date(birthDay),
            email,
            password
        }
        dispatch(signUp(body));
    }

    function handleChangeBirthDay(e: any) {
        console.log(e.target.value, moment(e.target.value).format("YYYY-MM-DD"));
        setBirthDay(moment(e.target.value).format("YYYY-MM-DD"));
    }
    return (
        <>
            <CardHeader className={classes.header} title="Đăng Ký" />
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
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ shrink: true, required: true }}
                        required
                    />
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

            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                    onClick={registerAccount}
                // disabled={state.isButtonDisabled}
                >
                    Đăng Ký
                </Button>
            </CardActions>
        </>
    );
}

export default Register;