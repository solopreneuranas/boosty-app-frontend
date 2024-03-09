import { Grid, Button, TextField } from "@material-ui/core";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useLocation } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import Swal from 'sweetalert2'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function UserDetails(props) {

    var navigate = useNavigate()
    const classes = useStyles();
    var location = useLocation()
    var user = location?.state?.user
    var admin = JSON.parse(localStorage.getItem("Admin"))
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [firstName, setFirstName] = useState(user.firstname)
    const [lastName, setLastName] = useState(user.lastname)
    const [email, setEmail] = useState(user.email)
    const [mobileNo, setMobileNo] = useState(user.mobileno)
    const [password, setPassword] = useState(user.password)
    const [company, setCompany] = useState({})

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const fetchCompanyByUser = async () => {
        var body = { 'userid': user._id }
        var response = await postData('company/display_user_details_by_company', body)
        if (response.status === true) {
            setCompany(response.data[0])
        }
    }

    const handleUpdateUser = async () => {
        var body = { '_id': user._id, 'firstname': firstName, 'lastname': lastName, 'email': email, 'password': password }
        var response = await postData('user/update-account', body)
        if (response.status === true) {
            Swal.fire({
                icon: 'success',
                toast: true,
                timer: 2000,
                title: 'User details updated!'
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'User details not updated!'
            })
        }
    }

    useEffect(() => {
        fetchCompanyByUser()
    }, [])

    const gradientText = {
        background: 'linear-gradient(to right, blue, #8000ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        display: ' inline-block',
        fontSize: 22,
        margin: '5% 0',
        fontWeight: 600
    }

    const handleLoginAccount = async () => {
        var body = { 'email': user.email, 'password': user.password }
        var response = await postData('user/login', body)
        if (response.status === true) {
            localStorage.setItem('User', JSON.stringify([user]))
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                timer: 2000,
                toast: true
            })
            navigate('/dashboard')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid credentails!'
            })
        }
    }

    const handleDeleteUser = async () => {

        Swal.fire({
            title: 'Do you want to delete the User?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                let body = { "_id": user._id }
                let response = await postData('user/delete_user', body)
                Swal.fire('User Deleted!', '', 'success')
                navigate('/admindashboard/customers')
            } else if (result.isDenied) {
                Swal.fire('User not Deleted', '', 'info')
            }
        })
    }

    const userCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Edit User Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button onClick={handleUpdateUser} variant="primary" type="submit" style={{ width: matches_md ? '100%' : '', boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, height: 50, marginTop: '2%', marginLeft: matches_md ? '' : '1%', color: 'white', padding: matches_md ? '3% 6%' : '1% 2%' }}>
                            Update User
                        </Button>
                        <Button onClick={handleLoginAccount} variant="outlined" style={{ width: matches_md ? '100%' : '', boxShadow: 'none', borderRadius: matches_md ? 5 : 10, marginTop: '2%', height: 50, marginLeft: matches_md ? '' : '1%', color: '#8000ff', padding: matches_md ? '3% 6%' : '1% 2%', border: '2px solid #8000ff' }}>
                            Login to Dashboard
                        </Button>
                        <Button onClick={handleDeleteUser} variant="outlined" style={{ width: matches_md ? '100%' : '', boxShadow: 'none', borderRadius: matches_md ? 5 : 10, marginTop: '2%', height: 50, marginLeft: matches_md ? '' : '1%', color: 'red', padding: matches_md ? '3% 6%' : '1% 2%', border: '2px solid red' }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <h3 style={{ fontSize: matches_md ? 22 : 23, margin: '3% 0', fontWeight: 600, textTransform: "uppercase" }}>{user.firstname} {user.lastname}</h3>

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Company Name</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 600, textTransform: "uppercase", fontSize: matches_md ? 14 : 15 }}>{company?.companyname} {company?.companytype}</h3>
                    </Grid>
                </Grid>
                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>First Name</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="First name" onChange={(e) => setFirstName(e.target.value)} className={classes.roundedTextField} value={firstName} variant="outlined" />
                    </Grid>
                </Grid>
                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Last Name</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Last name" onChange={(e) => setLastName(e.target.value)} className={classes.roundedTextField} value={lastName} variant="outlined" />
                    </Grid>
                </Grid>
                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Email</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} className={classes.roundedTextField} value={email} variant="outlined" />
                    </Grid>
                </Grid>
                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Password</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Password" onChange={(e) => setPassword(e.target.value)} className={classes.roundedTextField} value={password} variant="outlined" />
                    </Grid>
                </Grid>
                <hr style={{ opacity: '30%' }} />
            </div>
        )
    }

    return (
        <div style={{ width: '97%', padding: '2% 3% 2% 1%' }}>
            <div style={{}}>
                {userCompany()}
            </div>
        </div>
    )
}