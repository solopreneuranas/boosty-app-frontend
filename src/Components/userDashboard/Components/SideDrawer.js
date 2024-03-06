import '../../../.././src/App.css'
import * as React from 'react';
import { Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { postData } from '../../../Services/FetchNodeServices';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { primaryColor } from '../../globalVariables';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function SideDrawer(props) {

    var navigate = useNavigate()
    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [userId, setUserId] = useState(props.userid)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [email, setEmail] = useState(props.email)
    const [password, setPassword] = useState(props.password)
    const [mobileNo, setMobileNo] = useState(props.mobileNo)
    const [getErrors, setErrors] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    // const handleUpdateAccount = async () => {
    //     var error = validation()
    //     if (error === false) {
    //         var body = { '_id': userId, 'firstname': firstName, 'lastname': lastName, 'email': email, 'password': password, 'mobileno': mobileNo }
    //         var response = await postData('user/update-account', body)
    //         if (response.status === true) {
    //             localStorage.setItem('User', JSON.stringify([body]))
    //             Swal.fire({
    //                 icon: 'success',
    //                 toast: true,
    //                 title: 'Profile update!'
    //             })
    //         }
    //         else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Profile not updated!'
    //             })
    //         }
    //     }
    // }

    const sideDrawerComponent = () => {
        return (
            <div
                style={{ width: '100%', height: '100%' }} >
                <Grid container spacing={1} style={{ padding: '10%', display: 'flex', justifyContent: 'center' }}>
                    <h2 style={{ margin: 0, fontWeight: 600, fontSize: 25 }}>My Profile</h2>
                    <Grid item xs={12} style={{ marginTop: '8%' }}>
                        <center>
                            <img className='profileImg' src='/images/user-image.png' style={{ width: 100, height: 100, borderRadius: '50%', cursor: 'pointer' }} />
                            <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>{props.firstName}</h2>
                            <p style={{ padding: 0, fontWeight: 600, color: primaryColor, fontSize: 14 }}>{props.email}</p>
                            <div style={{ marginTop: '10%', width: '100%' }}>
                                {editUser()}
                            </div>
                        </center>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const editUser = () => {
        return (
            <div style={{ width: '100%' }}>
                <Grid container spacing={1} style={{ width: '100%' }}>

                    <Grid item xs={12} style={{ padding: 0, marginTop: '8%' }}>
                        <TextField
                            value={firstName}
                            error={getErrors.firstName}
                            helperText={getErrors.firstName}
                            onFocus={() => handleError('', 'firstName')}
                            label='Fisrt name' variant='outlined' 
                            fullWidth className={classes.roundedTextField} 
                            //onChange={(event) => setFirstName(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0, marginTop: '8%' }}>
                        <TextField
                            value={lastName}
                            error={getErrors.lastName}
                            helperText={getErrors.lastName}
                            onFocus={() => handleError('', 'lastName')}
                            label='Last name' variant='outlined' fullWidth className={classes.roundedTextField} 
                            //onChange={(event) => setLastName(event.target.value)} 
                            />
                    </Grid>

                    <Grid item xs={12} style={{ padding: 0, marginTop: '8%' }}>
                        <TextField
                            value={email}
                            error={getErrors.email}
                            helperText={getErrors.email}
                            onFocus={() => handleError('', 'email')}
                            label='Email' variant='outlined' fullWidth className={classes.roundedTextField} 
                            //onChange={(event) => setEmail(event.target.value)}
                            />
                    </Grid>

                    <Grid item xs={12} style={{ padding: 0, marginTop: '8%' }}>
                        <TextField
                            value={mobileNo}
                            error={getErrors.mobileNo}
                            helperText={getErrors.email}
                            onFocus={() => handleError('', 'mobileNo')}
                            label='Mobile no.' variant='outlined' fullWidth className={classes.roundedTextField} 
                            //onChange={(event) => setMobileNo(event.target.value)} 
                            />
                    </Grid>

                    <Grid item xs={12} style={{ padding: 0, marginTop: '8%' }}>
                        <FormControl fullWidth variant="outlined" className={classes.roundedTextField}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                value={password}
                                error={getErrors.password}
                                onFocus={() => handleError('', 'password')}
                                //onChange={(event) => setPassword(event.target.value)}
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
                    {/* <Grid item xs={12} variant='contained' style={{ padding: 0, marginTop: '8%' }}>
                        <Button
                            onClick={handleUpdateAccount}
                            fullWidth style={{
                                background: 'linear-gradient(to right, blue, #8000ff)',
                                color: 'white',
                                borderRadius: 10,
                                padding: '2% 0',
                                fontSize: 15,
                                fontWeight: '600'
                            }}>Update Profile</Button>
                    </Grid> */}
                </Grid>

            </div>
        )
    }

    return (
        <div style={{ width: '100%' }}>
            {sideDrawerComponent()}
            {/* <div style={{ width: '100%' }}>
                hello
            </div> */}
        </div>
    )
}