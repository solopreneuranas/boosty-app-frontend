import { Grid, Button } from "@material-ui/core";
import { serverURL, postData, getData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function AllCompanies(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const [companies, setCompanies] = useState([])
    const [refresh, setRefresh] = useState(false)
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    let userData = JSON.parse(localStorage.getItem('User'))
    console.log('userData: ', userData);

    const fetchCompanies = async () => {
        var response = await getData('company/display_all_companies')
        if (response.status === true) {
            setCompanies(response.data)
        }
        else {
            alert('Database error!')
        }
    }

    useEffect(function () {
        fetchCompanies()
    }, [])

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    // const [orderStatus, setOrderStatus] = useState({})
    // const fetchOrderStatus = async () => {
    //     var body = { 'userid': userData[0]._id }
    //     var response = await postData('orderstatus/display_order_status_by_user', body)
    //     if (response.status === true) {
    //         setOrderStatus(response.data[0])
    //     }
    // }

    // useEffect(() => {
    //     fetchOrderStatus()
    // }, [])


    const handleCompanyClick = (item) => {
        navigate('/admindashboard/company-details', { state: { company: item } })
        window.scrollTo(0, 0)
    }

    const displayCompaniesList = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, paddingBottom: '2%' }}>
                <div style={{ width: '95%', margin: '3% 0 2%', padding: '2.5% 2.5% 1%' }}>
                    <Grid container spacing={0} style={{ width: '100%', margin: 0, borderRadius: 10, display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={1}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>S no.</h3>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Company Name</h3>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>State</h3>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Owner Name</h3>
                        </Grid>
                        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Amount</h3>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Date</h3>
                        </Grid>
                    </Grid>
                </div>
                {
                    companies.map((item, i) => {

                        var date = new Date(item.orderdate);
                        var month = date.getMonth()
                        var year = date.getFullYear()
                        var day = date.getDate().toString().padStart(2, '0')
                        var formattedDate = `${day} ${months[month].slice(0, 3)} ${year}`

                        return (
                            <div style={{ width: '100%', padding: '0.4% 0', borderBottom: i === companies?.length - 1 ? '' : '1px solid gainsboro' }}>
                                <Grid onClick={() => handleCompanyClick(item)} container spacing={1} style={{ cursor: "pointer", width: '100%', margin: 0, padding: '1%', background: 'white', display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={1}>
                                        {i + 1}
                                    </Grid>
                                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{item.companyname} {item.companytype}</h3>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{item.companystate}</h3>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{item?.userData[0]?.firstname} {item?.userData[0]?.lastname}</h3>
                                    </Grid>
                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>${item.orderamount}</h3>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 14, color: 'green' }}>{formattedDate}</h3>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div style={{ width: '95%', padding: '2%', background: 'white', height: '100vh' }}>
            {
                companies.length == 0 ?
                    <>
                        <center><CircularProgress /></center>
                    </>
                    :
                    <>
                        <Grid container spacing={1}>
                            <Grid item md={6} style={{ width: '100%' }}>
                                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>All Companies</h3>
                                <p style={{ margin: 0, opacity: '70%', marginTop: '1%', fontSize: 15 }}>View company information and account details</p>
                            </Grid>
                        </Grid>
                        {displayCompaniesList()}
                    </>
            }
        </div>
    )
}