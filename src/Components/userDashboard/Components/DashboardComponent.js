import { Grid, Button } from "@material-ui/core";
import AddonsSlider from "./AddonsSlider";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import Support from "./Support";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StartCompany from "./StartCompany";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { primaryColor } from "../../globalVariables";

export default function DashboardComponent(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const [companies, setCompanies] = useState([])
    const [documents, setDocuments] = useState([])
    const [orderStatus, setOrderStatus] = useState({})
    const [status, setStatus] = useState(false)
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

    const fetchOrderStatus = async () => {
        var body = { 'userid': user[0]?._id }
        var response = await postData('orderstatus/display_order_status_by_user', body)
        if (response.status === true) {
            setOrderStatus(response.data[0])
        }
        else {
            alert('Database error!')
        }
    }

    const fetchDocuments = async () => {
        var body = { 'userid': user[0]?._id }
        var response = await postData('document/display_all_documents_by_user', body)
        if (response.status === true) {
            setDocuments(response.data)
            setLoadingStatus(false)
        }
        else {
            alert('Database error!')
        }
    }

    useEffect(function () {
        fetchCompanies()
        fetchDocuments()
        fetchOrderStatus()
    }, [])

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleCompanyClick = () => {
        navigate('/dashboard/company')
        window.scrollTo(0, 0)
    }

    const handleContact = () => {
        setStatus(true)
    }

    const statusItems = [
        {
            icon: <CheckCircleIcon style={{ color: '#00b009' }} />,
            title: "Order Successfully Processed"
        },
        {
            icon: orderStatus?.agent == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "Registered Agent Assigned"
        },
        {
            icon: orderStatus?.address == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "Business Mailing Address Issued"
        },
        {
            icon: orderStatus?.formation == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "Company Formation Completed"
        },
        {
            icon: orderStatus?.ein == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "EIN Successfully Processed"
        },
        {
            icon: orderStatus?.boi == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "BOI Report Filed"
        },
        {
            icon: orderStatus?.agreement == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "Operating Agreement Prepared"
        },
        {
            icon: orderStatus?.bank == 'True' ? <CheckCircleIcon style={{ color: '#00b009' }} /> : <WatchLaterOutlinedIcon style={{ color: '#0293B0' }} />,
            title: "Business Bank Account Set Up"
        }
    ]

    const dashboardItems = [
        {
            title: "Company",
            number: companies.length,
            link: '/dashboard/company',
            icon: <StoreOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        },
        {
            title: "Total Spent",
            number: companies[0]?.orderamount ? '$' + parseInt(companies[0]?.orderamount) : '0',
            icon: <AttachMoneyOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        },
        {
            title: "Documents",
            number: documents.length,
            link: '/dashboard/documents',
            icon: <TextSnippetOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        }
    ]

    const handleDashboardItemClick = (item) => {
        navigate(item.link)
        window.scrollTo(0, 0)
    }

    const dashboardItemsComponent = () => {
        return (
            <div style={{ width: '100%', display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '3%' }}>
                {
                    dashboardItems.map((item, i) => {
                        return (

                            <div onClick={() => handleDashboardItemClick(item)} style={{ marginTop: '3%', borderRadius: 10, padding: '7% 4%', width: 110, background: 'white', boxShadow: '3px 3px 20px #ededed', cursor: "pointer", position: "relative" }}>
                                {item.icon}
                                {
                                    loadingStatus == true ?
                                        <>
                                            <CircularProgress />
                                        </>
                                        :
                                        <>
                                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 27 }}>{item.number}</h3>
                                        </>
                                }
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 15, opacity: '70%' }}>{item.title}</h3>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const statusCompany = () => {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item md={6} style={{ width: '100%', height: matches_md ? '' : 700 }}>
                        {
                            matches_md ?
                                <>
                                    <div style={{ marginBottom: '8%' }}>{dashboardItemsComponent()}</div>
                                </>
                                :
                                <></>
                        }
                        <Grid container spacing={0} style={{ width: '100%', height: matches_md ? '' : '100%', borderRadius: 10, background: 'white', padding: '7%', boxShadow: '3px 3px 20px #ededed' }}>
                            <Grid item md={12} style={{ display: "flex", justifyContent: 'left', margin: '2% 0' }}>
                                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 23 }}>Your <font className="gradientText">Company</font> Status</h3>
                            </Grid>
                            <Grid item md={12} style={{ width: '100%', display: "flex", justifyContent: 'left', textAlign: "left", margin: '4% 0', flexDirection: "column" }}>
                                {
                                    statusItems.map((item, i) => {
                                        return (
                                            <div>
                                                <div style={{ display: "flex", gap: '2%', alignItems: "center", width: '100%', margin: '1% 0' }}>
                                                    {item.icon}
                                                    <p style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>{item.title}</p>
                                                </div>
                                                {
                                                    statusItems.length - 1 == i ?
                                                        <></>
                                                        :
                                                        <>
                                                            <div style={{ height: 20, borderRight: '2px solid gainsboro', width: 11, height: 30 }}></div>
                                                        </>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item md={12} style={{ width: '100%', display: "flex", justifyContent: 'left', alignItems: 'start', marginTop: '6%' }}>
                                <Button onClick={handleCompanyClick} startIcon={<StoreOutlinedIcon />} variant="outlined" style={{ borderRadius: 7, fontSize: 13, padding: '1.5% 3%', color: primaryColor, border: `2px solid ${primaryColor}` }}>
                                    View your Company
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} style={{ padding: 0, width: '100%', height: matches_md ? '' : 620 }}>
                        {
                            matches_md ?
                                <></>
                                :
                                <>
                                    {dashboardItemsComponent()}
                                </>
                        }
                        <div style={{ margin: '6% 0 4%' }}>
                            <center>
                                <img src="/images/dashboard-asset.svg"
                                    style={{ width: matches_md ? '90%' : '100%', borderRadius: 10 }}
                                />
                            </center>
                        </div>
                        <div style={{ borderRadius: 10, padding: '10% 6%', background: 'white', marginTop: '3%', boxShadow: '3px 3px 20px #ededed', marginBottom: matches_md ? '' : '10%' }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 22 }}>We're here to help</h3>
                            <div style={{ display: "flex", gap: '3%', marginTop: '4%' }}>
                                <Button variant="contained" onClick={handleContact}
                                    style={{
                                        width: matches_md ? '100%' : '',
                                        boxShadow: 'none',
                                        padding: '3%',
                                        background: 'linear-gradient(to right, blue, #8000ff)',
                                        color: "white",
                                        borderRadius: 10
                                    }}>
                                    Call or Email</Button>
                                <Button variant="outlined"
                                    style={{
                                        width: matches_md ? '100%' : '',
                                        boxShadow: 'none',
                                        padding: '3%',
                                        background: 'white',
                                        color: primaryColor,
                                        border: `2px solid ${primaryColor}`,
                                        borderRadius: 10
                                    }}
                                >Book a free consultation</Button>
                            </div>
                            <p style={{ marginTop: '3%', opacity: '70%' }}>View company information and account details.</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }


    return (
        <div style={{ width: '100%', padding: 0 }}>
            {
                loadingStatus ?
                    <>
                        {
                            matches_md ?
                                <div style={{ display: "flex", justifyContent: 'center' }}><CircularProgress /></div>
                                :
                                <Stack spacing={1} style={{ width: '100%', marginTop: '5%' }}>
                                    <Grid container spacing={3}>
                                        <Grid item md={6}>
                                            <Skeleton variant="rounded" width={'100%'} height={570} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <div style={{ display: "flex", flexDirection: "row", gap: '3%' }}>
                                                <Skeleton variant="rounded" width={'33%'} height={130} />
                                                <Skeleton variant="rounded" width={'33%'} height={130} />
                                                <Skeleton variant="rounded" width={'33%'} height={130} />
                                            </div>
                                            <div style={{ marginTop: '4%' }}><Skeleton variant="rounded" width={'100%'} height={200} /></div>
                                            <div style={{ marginTop: '4%' }}><Skeleton variant="rounded" width={'100%'} height={200} /></div>
                                        </Grid>
                                    </Grid>
                                </Stack>
                        }
                    </>
                    :
                    <>
                        {
                            companies.length === 0 ?
                                <>
                                    <StartCompany title="Register your Company in U.S" subTitle=" now by simply filling some basic details!" btnText="Launch Company" icon={<RocketLaunchOutlinedIcon />} btnLink="/dashboard/register-company" />
                                </>
                                :
                                <>
                                    {statusCompany()}
                                    <Support status={status} setStatus={setStatus} />
                                </>
                        }
                    </>
            }
        </div>
    )
}