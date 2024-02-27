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
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Documents(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [documents, setDocuments] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(true)

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const fetchDocumentsByCompany = async () => {
        var body = { 'userid': user[0]?._id }
        var response = await postData('document/display_all_documents_by_user', body)
        if (response.status === true) {
            setDocuments(response.data)
            setLoadingStatus(false)
        }
    }

    useEffect(() => {
        fetchDocumentsByCompany()
    }, [])


    const documentsArray = [
        {
            title: "ITIN",
            format: "PDF"
        },
        {
            title: "EIN",
            format: "PDF"
        },
        {
            title: "Operating Agreement",
            format: "PDF"
        },
        {
            title: "TAX",
            format: "PDF"
        },
    ]

    const handleDownloadFile = async (filename) => {
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

    const documentCompany = () => {
        return (
            <div style={{ background: '', borderRadius: 10, padding: matches_md ? '3% 1%' : '1%', marginTop: '3%' }}>

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '3%', }}>
                    {
                        documents.map((item, i) => {
                            var docFormat = item.documents.split('.').pop().toUpperCase()
                            return (
                                <div style={{ width: matches_md ? '100%' : 200, height: 70, borderRadius: 10, background: 'white', padding: matches_md ? '6%' : '3%', position: "relative", marginTop: matches_md ? '4%' : '2%' }}>
                                    <div onClick={() => handleDownloadFile(item.documents)} style={{ position: "absolute", padding: '1% 2%', borderRadius: 5, top: '10%', right: '6%', background: '#91edff', color: '#0293b0', width: 80, display: "flex", justifyContent: "center", alignItems: "center", gap: '4%', cursor: "pointer" }}>
                                        <GetAppOutlinedIcon style={{ color: '#0293b0' }} />
                                        {docFormat}
                                    </div>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 19 : 22, width: '70%' }}>{item.name}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div style={{ width: '100%', padding: matches_md ? '2% 1%' : '2% 3% 2% 1%' }}>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 22 : 25 }}>My Documents</h3>
                    <p style={{ margin: 0, opacity: '70%', marginTop: '1%' }}>View company information and account details</p>
                </Grid>
                <Grid item md={6} style={{ display: "flex", justifyContent: 'right' }}>
                </Grid>
            </Grid>
            {
                loadingStatus == true ?
                    <>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '2%', marginTop: '5%' }}>
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '30%'} height={150} style={{ marginTop: matches_md ? '3%' : 0 }} />
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '30%'} height={150} style={{ marginTop: matches_md ? '3%' : 0 }}/>
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '30%'} height={150} style={{ marginTop: matches_md ? '3%' : 0 }}/>
                        </div>
                    </>
                    :
                    <>
                        {
                            documents.length == 0 ?
                                <>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                        <img src="/images/empty-folder.png" style={{ width: 150, height: 150, marginBottom: '2%' }} />
                                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>No Documents!</h3>
                                    </div>
                                </>
                                :
                                <>
                                    {documentCompany()}
                                </>
                        }
                    </>
            }
        </div>
    )
}