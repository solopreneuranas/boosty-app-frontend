import { Grid, Button } from "@material-ui/core";
import AddonsSlider from "./AddonsSlider";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import StartCompany from "./StartCompany";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function MyCompany(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const [companies, setCompanies] = useState([])
    const [refresh, setRefresh] = useState(false)
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [loadingStatus, setLoadingStatus] = useState(true)

    const fetchCompanies = async () => {
        var body = { 'userid': user[0]?._id }
        var response = await postData('company/display_all_companies_by_user', body)
        if (response.status === true) {
            setCompanies(response.data)
            setLoadingStatus(false)
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

    const handleCompanyClick = (item) => {
        navigate('/dashboard/company-details', { state: { company: item } })
        window.scrollTo(0, 0)
    }

    const userCompanies = () => {
        return companies.map((item, i) => {

            var date = new Date(item.orderdate)
            var year = date.getFullYear()
            var month = date.getMonth()
            var day = date.getDate().toString().padStart(2, '0')
            var formattedDate = `${day} ${months[month]} ${year}`

            return (
                <div>
                    <Grid onClick={() => handleCompanyClick(item)} container spacing={1} style={{ marginTop: '5%' }}>
                        <Grid item md={12} style={{ width: '100%', borderRadius: 10, background: 'white', padding: matches_md ? '6%' : '3%', boxShadow: '3px 3px 20px #ededed', position: "relative", cursor: "pointer" }}>
                            <div style={{ position: "absolute", padding: matches_md ? '2% 0' : '1% 2%', borderRadius: matches_md ? 5 : 10, top: '8%', right: '2%', background: item.companystatus === 'Completed' ? '#8eff6b' : item.companystatus == 'In Progress' ? '#91edff' : '#ffe29e', color: item.companystatus == 'Completed' ? 'green' : item.companystatus == 'In Progress' ? '#0293b0' : '#cf8506', width: 125, display: "flex", justifyContent: "center", alignItems: "center", gap: '4%' }}>
                                {
                                    item.companystatus == 'Completed' ?
                                        <>
                                            <CheckCircleOutlineOutlinedIcon style={{ color: 'green', fontSize: matches_md ? 16 : 18 }} />
                                        </>
                                        :
                                        item.companystatus == 'In Progress' ?
                                            <>
                                                <WatchLaterOutlinedIcon style={{ color: '#0293b0', fontSize: matches_md ? 16 : 18 }} />
                                            </>
                                            :
                                            <WatchLaterOutlinedIcon style={{ color: '#cf8506', fontSize: matches_md ? 16 : 18 }} />
                                }
                                <p style={{ fontSize: matches_md ? 14 : 16 }}>{item.companystatus}</p>
                            </div>
                            <h3 style={{ width: matches_md ? '60%' : '100%', margin: 0, fontWeight: 600, fontSize: matches_md ? 18 : 20 }}>{item.companyname} {item.companytype}</h3>
                            <p style={{ marginTop: '2%', opacity: '80%', fontSize: matches_md ? 14 : 15 }}>State: {item.companystate}</p>
                            <p style={{ marginTop: '1%', opacity: '80%', fontSize: matches_md ? 14 : 15 }}>Owner: {item.legalfirstname} {item.legallastname}</p>
                            <p style={{ marginTop: '1%', opacity: '80%', fontSize: matches_md ? 14 : 15 }}>Country: {item.country}</p>
                            <p style={{ marginTop: '1%', opacity: '80%', fontSize: matches_md ? 14 : 15 }}>Date: {formattedDate}</p>
                        </Grid>
                    </Grid>
                </div>
            )
        })
    }

    const handleNewCompany = () => {
        navigate('/dashboard/register-company')
        window.scrollTo(0, 0)
    }


    return (
        <div style={{ width: '100%', padding: '2% 3% 2% 1%' }}>
            <Grid container spacing={1}>
                <Grid item md={6} style={{ width: '100%' }}>
                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 22 : 25 }}>My Company</h3>
                    <p style={{ margin: 0, opacity: '70%', marginTop: '1%' }}>View company information and account details</p>
                </Grid>
                {/* <Grid item md={6} style={{ width: '100%', display: "flex", justifyContent: matches_md ? 'left' : 'right', marginTop: matches_md ? '2%' : '' }}>
                    <Button onClick={handleNewCompany} startIcon={<AddIcon />} variant="outlined" style={{ borderRadius: matches_md ? 5 : 12, fontSize: 13, padding: matches_md ? '2% 3%' : '0 3%', color: '#7A00FF', border: '2px solid #7A00FF' }}>
                        New Company
                    </Button>
                </Grid> */}
            </Grid>
            {
                loadingStatus == true ?
                    <>
                        <Stack spacing={1} style={{ width: '100%', marginTop: '5%' }}>
                            <Skeleton variant="rounded" width={'100%'} height={120} />
                            <Skeleton variant="rounded" width={'100%'} height={50} />
                            <Skeleton variant="rounded" width={'100%'} height={50} />
                        </Stack>
                    </>
                    :
                    <>
                        {
                            companies.length == 0 ?
                                <>
                                    <StartCompany title="Register your Company in U.S" subTitle=" now by simply filling some basic details!" btnText="Launch Company" icon={<RocketLaunchOutlinedIcon />} btnLink="/dashboard/register-company" />
                                </>
                                :
                                <>
                                    {userCompanies()}
                                </>
                        }
                    </>
            }
        </div>
    )
}