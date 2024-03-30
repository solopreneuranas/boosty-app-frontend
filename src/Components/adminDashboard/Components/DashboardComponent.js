import { Grid, Button } from "@material-ui/core";
import { serverURL, postData, getData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
// import Support from "./Support";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function DashboardComponent(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const [companies, setCompanies] = useState([])
    const [documents, setDocuments] = useState([])
    const [mails, setMails] = useState([])
    const [customers, setCustomers] = useState([])
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [loadingStatus, setLoadingStatus] = useState(true)

    const fetchCompanies = async () => {
        var response = await getData('company/display_all_companies')
        if (response.status === true) {
            setCompanies(response.data)
            setLoadingStatus(false)
        }
        else {
            alert('Database error!')
        }
    }

    const fetchDocuments = async () => {
        var response = await getData('document/display_all_documents')
        if (response.status === true) {
            setDocuments(response.data)
            setLoadingStatus(false)
        }
        else {
            alert('Database error!')
        }
    }

    const fetchMails = async () => {
        var response = await getData('mailroom/display_all_mails')
        if (response.status === true) {
            setMails(response.data)
            setLoadingStatus(false)
        }
        else {
            alert('Database error!')
        }
    }

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
        fetchCompanies()
        fetchDocuments()
        fetchMails()
        fetchCustomers()
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

    const totalOrderAmount = companies.reduce((sum, company) => sum + parseInt(company?.orderamount), 0);

    const dashboardItems = [
        {
            title: "Total Companies",
            number: companies?.length - 1,
            icon: <StoreOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        },
        {
            title: "Total Sales",
            number: `$${totalOrderAmount - 269}`,
            icon: <AttachMoneyOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        },
        {
            title: "Total Documents",
            number: documents?.length - 1,
            icon: <TextSnippetOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        },
        {
            title: "Total Mails",
            number: mails?.length - 1,
            icon: <EmailOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        },
        {
            title: "Total Customers",
            number: customers?.length - 1,
            icon: <PersonOutlineOutlinedIcon style={{ position: "absolute", right: '5%', top: '5%', opacity: '10%', width: 40, height: 40 }} />
        }
    ]

    const dashboardItemsComponent = () => {
        return (
            <div style={{ width: '100%', display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '2%' }}>
                {
                    dashboardItems.map((item, i) => {
                        return (
                            <div style={{ marginTop: '3%', borderRadius: 10, padding: '3% 1%', width: 140, background: 'white', border: '2px solid gainsboro', position: "relative" }}>
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


    return (
        <div style={{ width: '100%', height: '100vh', paddingLeft: '2%' }}>
            {
                loadingStatus ?
                    <>
                        {
                            matches_md ?
                                <div style={{ display: "flex", justifyContent: 'center' }}><CircularProgress /></div>
                                :
                                <Stack spacing={1} style={{ width: '100%', marginTop: '5%' }}>
                                    <Grid container spacing={0}>
                                        <Grid item md={8}>
                                            <div style={{ display: "flex", flexDirection: "row", gap: '3%' }}>
                                                <Skeleton variant="rounded" width={'25%'} height={130} />
                                                <Skeleton variant="rounded" width={'25%'} height={130} />
                                                <Skeleton variant="rounded" width={'25%'} height={130} />
                                                <Skeleton variant="rounded" width={'25%'} height={130} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Stack>
                        }
                    </>
                    :
                    <>
                        <div>
                            <Grid container spacing={0}>
                                <Grid item md={6} style={{ width: '100%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>Dashboard</h3>
                                    <p style={{ margin: 0, opacity: '70%', marginTop: '1%', fontSize: 15 }}>View and manage your companies, customers and documents</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item md={12} style={{ padding: 0, width: '100%' }}>
                                    {dashboardItemsComponent()}
                                </Grid>
                            </Grid>
                        </div>
                    </>
            }
        </div>
    )
}