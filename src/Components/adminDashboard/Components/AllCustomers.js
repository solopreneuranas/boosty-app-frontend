import { Grid, Button } from "@material-ui/core";
import { serverURL, postData, getData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function AllCustomers(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const [customers, setCustomers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchCustomers = async () => {
        var response = await getData('user/display_all_users')
        if (response.status === true) {
            setCustomers(response.data)
        }
        else {
            alert('Database error!')
        }
    }

    useEffect(function () {
        fetchCustomers()
    }, [])

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleUserClick = (item) => {
        navigate('/admindashboard/user-details', { state: { user: item } })
        window.scrollTo(0, 0)
    }

    const displayUsersList = () => {
        return (
            customers.map((item, i) => {

                return (
                    <div style={{ width: '100%', padding: '0.4% 0' }}>
                        <Grid onClick={() => handleUserClick(item)} container spacing={1} style={{ borderBottom: i === customers?.length - 1 ? '' : '1px solid gainsboro', cursor: "pointer", width: '100%', margin: 0, padding: '1%', background: 'white', display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={1}>
                                {i + 1}
                            </Grid>
                            <Grid item xs={5} style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{item.firstname} {item.lastname}</h3>
                            </Grid>
                            <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{item.email}</h3>
                            </Grid>
                            <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{item.mobileno}</h3>
                            </Grid>
                        </Grid>
                    </div>
                )
            })
        )
    }

    return (
        <div style={{ width: '95%', padding: '2%', background: 'white', height: '100vh' }}>
            {
                customers.length == 0 ?
                    <>
                        <center><CircularProgress /></center>
                    </>
                    :
                    <>
                        <Grid container spacing={1} style={{ marginBottom: '3%' }}>
                            <Grid item md={6} style={{ width: '100%' }}>
                                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>All Customers</h3>
                                <p style={{ margin: 0, opacity: '70%', marginTop: '1%', fontSize: 15 }}>View customers information and account details</p>
                            </Grid>
                        </Grid>
                        {displayUsersList()}
                    </>
            }
        </div>
    )
}