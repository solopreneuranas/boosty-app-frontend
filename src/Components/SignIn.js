import '../.././src/App.css'
import * as React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Grid, TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { postData } from '../Services/FetchNodeServices';
import FormSidebar from './FormSidebar';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function SignIn() {

    var location = useLocation()
    var status = location?.state?.status
    var navigate = useNavigate()
    const classes = useStyles();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [password, setPassword] = useState('')
    const [getErrors, setErrors] = useState('')
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (email.length === 0) {
            error = true
            handleError('Please enter email', 'email')
        }
        if (password.length === 0) {
            error = true
            handleError('Please enter password', 'password')
        }
        return error
    }

    const handleLoginAccount = async () => {
        setLoadingPage(true)
        var error = validation()
        if (error === false) {
            var body = { 'email': email, 'password': password }
            var response = await postData('user/login', body)
            if (response.status === true) {
                setLoadingPage(false)
                localStorage.setItem('User', JSON.stringify(response.data))
                navigate('/dashboard')
            }
            else {
                setLoadingPage(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid credentails!'
                })
            }
        }
    }

    const loginFormGrid = {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        padding: '3% 0'
    };

    const loginForm = {
        width: matches_md ? '90%' : '40%',
        margin: 'auto',
        padding: '2%',
        borderRadius: '15px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        //boxShadow: '5px 5px 20px #e9d4ff',
    }

    const handleEnter = (event) => {
        if (event.key == 'Enter') {
            handleLoginAccount()
        }
    }

    React.useEffect(() => {
        if (status) {
            toast.success('Login to your account!')
        }
    }, [])

    return (
        <div className='root' style={{ height: '100%', background: 'white' }}>
            <ToastContainer />
            {
                loadingPage ?
                    <>
                        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src='/images/boosty-app-logo.svg' style={{ width: 150 }} />
                            <div style={{ width: 250, marginTop: '2%' }}>
                                <LinearProgress color="primary" />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Grid container spacing={1} style={{ margin: 0 }}>
                            {
                                matches_md ?
                                    <></>
                                    :
                                    <>
                                        <Grid item md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3%', background: '#f0f0ff', color: 'black' }}>
                                            <FormSidebar
                                                title="Create account & manage Tasks easily"
                                                para="Choose between JSON Web Token, Firebase, AWS Amplify or Auth0. Regular login/register functionality is also available."
                                                subTitle="Want to switch auth methods?"
                                                subPara="It only takes seconds. There is a documentation section showing how to do exactly that. Read docs"
                                            />
                                        </Grid>
                                    </>
                            }
                            <Grid item md={matches_md ? 12 : 9} style={loginFormGrid}>
                                <Grid container spacing={3} style={loginForm}>
                                    {
                                        matches_md ?
                                            <>
                                                <Grid item md={12} style={{ display: 'flex', width: '100%', justifyContent: 'center', paddingLeft: 0 }}>
                                                    <img src='/images/boosty-app-logo.svg' style={{ width: 150 }} />
                                                </Grid>
                                            </>
                                            :
                                            <></>
                                    }
                                    <Grid item md={12} style={{ width: '100%', paddingLeft: 0 }}>
                                        <Typography style={{
                                            fontSize: '26px',
                                            fontWeight: '600',
                                            marginBottom: '0',
                                            textAlign: 'center'
                                        }}>Sign in</Typography>
                                        <p style={{ marginBottom: '4%', textAlign: 'center', opacity: '70%' }}>Fill in the fields below to sign in to your account.</p><br />
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                onKeyPress={(event) => handleEnter(event)}
                                                error={getErrors.email}
                                                helperText={getErrors.email}
                                                onFocus={() => handleError('', 'email')}
                                                label='Email' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(event) => setEmail(event.target.value)} />
                                        </Grid>
                                    </Grid>

                                    <Grid item md={12} style={{ padding: 0, marginTop: '5%', width: '100%' }}>
                                        <FormControl fullWidth variant="outlined" className={classes.roundedTextField}>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                error={getErrors.password}
                                                onFocus={() => handleError('', 'password')}
                                                onChange={(event) => setPassword(event.target.value)}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.password}</p>
                                    </Grid>
                                    {/* <Grid item md={12} style={{ padding: 0, marginTop: '3%', width: '100%' }}>
                                        <div>
                                            <Checkbox {...label} defaultChecked style={{ paddingLeft: 0 }} />
                                            <font style={{ fontSize: '15px', opacity: '80%' }}>I accept the <font style={{ color: '#2c2c2c' }}>terms and conditions.</font></font>
                                        </div>
                                    </Grid> */}
                                    <Grid item md={12} variant='contained' style={{ width: '100%', padding: 0, marginTop: '4%' }}>
                                        <Button
                                            onClick={handleLoginAccount}
                                            fullWidth style={{
                                                background: 'linear-gradient(to right, blue, #8000ff)',
                                                color: 'white',
                                                borderRadius: '15px',
                                                padding: '2% 0',
                                                fontSize: '18px',
                                                fontWeight: '600'
                                            }}>
                                            Sign in
                                        </Button>
                                    </Grid>
                                    <Grid item md={8} style={{ padding: 0, marginTop: '6%', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                                        <font style={{ fontSize: '15px', opacity: '80%' }}>New customer? <font style={{ color: '#2c2c2c' }}>sign up in here</font></font>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
            }
        </div >
    )

}