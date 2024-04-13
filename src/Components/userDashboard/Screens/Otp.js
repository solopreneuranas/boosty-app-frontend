import * as React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Grid, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData, serverURL } from '../../../Services/FetchNodeServices';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function Otp() {

    const otpBox = {
        width: '50px',
        height: '60px',
        background: 'transparent',
        padding: '2.5% 4%',
        borderRadius: '6px',
        border: '1px solid rgb(193, 193, 193)',
        display: 'flex',
        alignItems: 'center'
    }

    let location = useLocation()
    var navigate = useNavigate()
    const classes = useStyles();

    let user = location?.state?.userData
    let status = location?.state?.status
    let orgOtp = location?.state?.otp

    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState(false)

    const [getErrors, setErrors] = useState('')
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [loading, setLoading] = useState(false)


    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (otp.length === 0) {
            error = true
            setOtpError(true)
            handleError('Please enter otp', 'otp')
        }
        return error
    }

    const loginFormGrid = {
        backgroundColor: '#F4F5FF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        padding: '3% 0'
    };

    const loginForm = {
        width: matches_md ? '90%' : '30%',
        margin: 'auto',
        padding: '2%',
        borderRadius: '15px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        border: '4px solid #DBDFFF'
    }

    const handleEnter = (event) => {
        if (event.key == 'Enter') {
            handleCreateAccount()
        }
    }

    var otpArray = []
    otpArray.fill('')

    const handleOtp0 = () => {
        if (document.getElementById('zero').value.length == 1) {
            otpArray[0] = document.getElementById('zero').value
            document.getElementById('one').focus()
        }
    }
    const handleOtp1 = () => {
        if (document.getElementById('one').value.length == 1) {
            otpArray[1] = document.getElementById('one').value
            document.getElementById('two').focus()
        }
    }
    const handleOtp2 = () => {
        if (document.getElementById('two').value.length == 1) {
            otpArray[2] = document.getElementById('two').value
            document.getElementById('three').focus()
        }
    }
    const handleOtp3 = () => {
        if (document.getElementById('three').value.length == 1) {
            otpArray[3] = document.getElementById('three').value
        }
        handleCheckOtp()
    }

    const handleChangeOtp = () => {
        setOtpError(false)
    }

    console.log({ orgOtp });

    const handleCheckOtp = async () => {
        let stringOtp = otpArray.join('')
        if (orgOtp === parseInt(stringOtp)) {
            handleCreateAccount()
        }
    }

    const handleCreateAccount = async () => {
        let response = await postData('user/create-account', user)
        if (response?.status) {
            localStorage.setItem('User', JSON.stringify([user]))
            setLoading(false)
            toast.success('Your account has been created!', {
                onClose: () => {
                    navigate('/login', { state: { status: true } })
                }
            });
        }
        else {
            setLoading(false)
            toast.error('Account not created!')
        }
        // navigate('/login', { state: { status: true } })
    }

    const otpForm = () => {
        return (
            <>
                <Grid item sm={12} style={{ width: '100%' }}>
                    <div style={{ margin: '5% 0', display: 'flex', flexDirection: 'row', gap: '3%', flexWrap: 'wrap', alignContent: 'flex-start', width: '100%', justifyContent: 'center' }}>
                        <div style={otpBox}>
                            <TextField
                                onKeyUp={(e) => {
                                    handleOtp0(e);
                                    handleChangeOtp();
                                }}
                                id="zero"
                                sx={{ input: { color: 'black', fontSize: 30, textAlign: 'center' } }}
                                variant="standard"
                                hiddenLabel
                                placeholder=" "
                                InputProps={{
                                    disableUnderline: true,
                                    inputProps: { maxLength: 1 }
                                }} />
                        </div>
                        <div style={otpBox}>
                            <TextField
                                onKeyUp={(e) => {
                                    handleOtp1(e);
                                    handleChangeOtp();
                                }}
                                id="one"
                                sx={{ input: { color: 'black', fontSize: 30, textAlign: 'center' } }}
                                variant="standard"
                                hiddenLabel
                                placeholder=" "
                                InputProps={{
                                    disableUnderline: true,
                                    inputProps: { maxLength: 1 }
                                }} />
                        </div>
                        <div style={otpBox}>
                            <TextField
                                onKeyUp={(e) => {
                                    handleOtp2(e);
                                    handleChangeOtp();
                                }}
                                id="two"
                                sx={{ input: { color: 'black', fontSize: 30, textAlign: 'center' } }}
                                variant="standard"
                                hiddenLabel
                                placeholder=" "
                                InputProps={{
                                    disableUnderline: true,
                                    inputProps: { maxLength: 1 }
                                }} />
                        </div>
                        <div style={otpBox}>
                            <TextField
                                onKeyUp={(e) => {
                                    handleOtp3(e);
                                    handleChangeOtp();
                                }}
                                id="three"
                                sx={{ input: { color: 'black', fontSize: 30, textAlign: 'center' } }}
                                variant="standard"
                                hiddenLabel
                                placeholder=" "
                                InputProps={{
                                    disableUnderline: true,
                                    inputProps: { maxLength: 1 }
                                }} />
                        </div>
                    </div>

                </Grid>
            </>
        )
    }

    return (
        <div className='root' style={{ height: '100%' }}>
            <ToastContainer />
            <Grid container spacing={0} style={{ margin: 0 }}>
                <Grid item md={12} style={loginFormGrid}>
                    <Grid container spacing={1} style={loginForm}>
                        <Grid item md={12} style={{ width: '100%', paddingLeft: 0 }}>
                            <Typography style={{
                                fontSize: '26px',
                                fontWeight: '600',
                                marginBottom: '0',
                                textAlign: 'center'
                            }}>OTP Verification</Typography>
                            <p style={{ marginBottom: '4%', textAlign: 'center', opacity: '70%', fontSize: 14 }}>Enter the OTP, you have received to your email {user?.email}</p>
                            {/* <p style={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Resend OTP in: </p> */}
                        </Grid>

                        <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center' }}>
                            {otpForm()}
                            {
                                otpError ?
                                    <p style={{ fontSize: 14, margin: 0, fontWeight: 400, opacity: '70%' }} className='error-txt'>OTP is required*</p>
                                    :
                                    <></>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    )

}