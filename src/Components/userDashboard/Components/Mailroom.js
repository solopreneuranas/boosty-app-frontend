import { Grid, Button } from "@material-ui/core";
import { serverURL, postData, getData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { primaryColor } from "../../globalVariables";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function Mailroom(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const [refresh, setRefresh] = useState(false)
    const theme = useTheme();
    const [mails, setMails] = useState([])
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [loadingStatus, setLoadingStatus] = useState(true)

    const fetchMailsByUser = async () => {
        var body = { 'userid': user[0]._id }
        var response = await postData('mailroom/display_all_mails_by_user', body)
        if (response.status === true) {
            setMails(response.data)
            setLoadingStatus(false)
        }
    }

    console.log(mails)

    useEffect(function () {
        fetchMailsByUser()
    }, [])

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleDownloadMail = async (filename) => {
        const fileUrl = `${serverURL}/images/${filename}`
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const link = document.createElement('a')
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl);
    }

    console.log('mails', mails);

    const agent = () => {
        return mails.slice(0, 1).map((item, i) => {
            var date = new Date(item.maildate);
            var month = date.getMonth()
            var year = date.getFullYear() + 1
            var day = date.getDate().toString().padStart(2, '0')
            var formattedDate = `${day} ${months[month].slice(0, 3)} ${year}`
            return (
                <div style={{ marginBottom: matches_md ? '10%' : 0 }}>
                    <Grid item md={5} style={{ borderRadius: 10, padding: matches_md ? '6%' : '3%', display: "flex", justifyContent: "left", flexDirection: "column", background: 'white', marginTop: '3%', boxShadow: '3px 3px 20px #ededed' }}>
                        <EmailOutlinedIcon style={{ opacity: '70%', width: 50, height: 50, color: primaryColor }} />
                        <h3 style={{ fontWeight: 550, fontSize: 20, marginBottom: '6%' }}>Mailing Address</h3>
                        <p style={{ opacity: '70%', margin: '1% 0' }}>Active until {formattedDate}</p>
                        <p style={{ opacity: '70%', margin: '1% 0' }}>{item.companyData[0]?.agentname}</p>
                        <p style={{ opacity: '70%', margin: '1% 0' }}>{item.companyData[0]?.agentaddress}</p>
                    </Grid>
                </div>
            )
        })
    }

    const displayMailsListMobile = () => {
        return (
            mails.map((item, i) => {

                var date = new Date(item.maildate);
                var month = date.getMonth()
                var day = date.getDate().toString().padStart(2, '0')
                var formattedDate = `${day} ${months[month].slice(0, 3)}`

                return (
                    <Grid container spacing={1} style={{ position: 'relative', padding: '5% 3%', borderRadius: 15, background: i % 2 == 0 ? 'white' : '', display: 'flex', alignItems: 'center', margin: '3% 0 6%', boxShadow: i % 2 == 0 ? '3px 3px 20px #ededed' : 'none' }}>
                        <div style={{}}>
                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 40, opacity: '25%' }}>{i + 1}.</h3>
                        </div>
                        <Grid item xs={10}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>{item.sender}</h3>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>Mail Type: {item.mailtype}</h3>
                        </Grid>
                        <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16, color: 'green' }}>Date: {formattedDate}</h3>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                            <div
                                style={{ cursor: 'pointer', padding: '4% 10%', background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', borderRadius: 5, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                                onClick={() => handleDownloadMail(item.mail)}
                            >
                                File <GetAppOutlinedIcon style={{ marginLeft: '15%', color: 'white' }} />
                            </div>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    const displayMailsList = () => {
        return (
            <div>
                {
                    matches_md ?
                        <></>
                        :
                        <>
                            <div style={{ width: '95%', marginTop: '3%', padding: '2.5%' }}>
                                <Grid container spacing={1} style={{ width: '100%', margin: 0, borderRadius: 10, display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={1}>
                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>S no.</h3>
                                    </Grid>
                                    <Grid item xs={5} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>Sender</h3>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>Type</h3>
                                    </Grid>
                                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>Date</h3>
                                    </Grid>
                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>Download</h3>
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                }

                {
                    mails.map((item, i) => {

                        var date = new Date(item.maildate);
                        var month = date.getMonth()
                        var year = date.getFullYear()
                        var day = date.getDate().toString().padStart(2, '0')
                        var formattedDate = `${day} ${months[month].slice(0, 3)} ${year}`

                        return (
                            <div style={{ width: '95%', marginTop: i == 0 ? 0 : '3%', background: 'white', padding: '2.5%', borderRadius: 15, boxShadow: '3px 3px 20px #ededed' }}>
                                <Grid container spacing={1} style={{ width: '100%', margin: 0, borderRadius: 10, display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={1}>
                                        {i + 1}
                                    </Grid>
                                    <Grid item xs={5} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>{item.sender}</h3>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>{item.mailtype}</h3>
                                    </Grid>
                                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16, color: 'green' }}>{formattedDate}</h3>
                                    </Grid>
                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <GetAppOutlinedIcon onClick={() => handleDownloadMail(item.mail)} style={{ color: primaryColor, cursor: "pointer" }} />
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
        <div style={{ width: '100%', padding: 0 }}>
            <Grid container spacing={1} style={{ marginBottom: matches_md ? '7%' : 0 }}>
                <Grid item md={6} style={{ width: '100%' }}>
                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 22 : 25 }}>Mailroom</h3>
                    <p style={{ margin: 0, opacity: '70%', marginTop: '1%' }}>View company information and account details</p>
                </Grid>
            </Grid>
            {
                loadingStatus == true ?
                    <>
                        <div style={{ marginTop: '5%' }}>
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '40%'} height={200} />
                        </div>

                        <div style={{ marginTop: '5%' }}>
                            <Stack spacing={2} style={{ width: '100%' }}>
                                <Skeleton variant="rounded" width={'100%'} height={60} />
                                <Skeleton variant="rounded" width={'100%'} height={60} />
                                <Skeleton variant="rounded" width={'100%'} height={60} />
                            </Stack>
                        </div>
                    </>
                    :
                    <>
                        {
                            mails.length == 0 ?
                                <>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                        <img src="/images/empty-folder.png" style={{ width: 150, height: 150, marginBottom: '2%' }} />
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>No Mails in your Mailroom!</h3>
                                    </div>
                                </>
                                :
                                <>
                                    {agent()}
                                    {
                                        matches_md ?
                                            <>{displayMailsListMobile()}</>
                                            :
                                            <>{displayMailsList()}</>
                                    }
                                </>
                        }
                    </>
            }
        </div>
    )
}