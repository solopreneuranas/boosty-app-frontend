import { Grid, Button } from "@material-ui/core";
import AddonsSlider from "./AddonsSlider";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { primaryColor } from "../../globalVariables";

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
                            let docFormat = item.documents.split('.').pop().toUpperCase()
                            return (
                                <div style={{ width: matches_md ? '100%' : '35%', borderRadius: '15px', background: 'white', padding: matches_md ? '6%' : '3%', position: "relative", marginTop: matches_md ? '4%' : '2%', border: '4px solid #dbdfff' }}>
                                    <img src='/images/file-icon.svg' style={{ width: 50, height: 50, marginBottom: '7%' }} />
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 19 : 19, width: '100%' }}>{item?.name}</h3>
                                    <p style={{ fontSize: 14, opacity: '70%', lineHeight: '23px', marginTop: '4%' }}>{item?.description}</p>
                                    <Button
                                        onClick={() => handleDownloadFile(item?.documents)}
                                        style={{
                                            // position: "absolute",
                                            // bottom: '8%',
                                            marginTop: '5%',
                                            color: primaryColor,
                                            border: `2px solid ${primaryColor}`,
                                            borderRadius: 12,
                                            padding: '2% 7%',
                                            fontWeight: 600
                                        }}
                                    >
                                        View .{docFormat}
                                    </Button>
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
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '40%'} height={250} style={{ marginTop: '3%' }} />
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '40%'} height={250} style={{ marginTop: '3%' }} />
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '40%'} height={250} style={{ marginTop: '3%' }} />
                            <Skeleton variant="rounded" width={matches_md ? '100%' : '40%'} height={250} style={{ marginTop: '3%' }} />
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