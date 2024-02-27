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
import { useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function OrderSuccess(props) {

    var navigate = useNavigate()
    var location = useLocation()
    var title = location?.state?.title
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleCompanyClick = () => {
        navigate('/dashboard/company')
        window.scrollTo(0, 0)
    }

    const startCompany = () => {
        return (
            <div>
                <Grid container spacing={1} style={{ position: "relative", borderRadius: 10, background: matches_md ? 'white' : 'linear-gradient(to right bottom, white 80%, blue 18%, #8000ff 2%)', padding: '6% 12%', boxShadow: '3px 3px 20px #ededed', textAlign: "center" }}>
                    <Grid item md={12} style={{ width: '100%', display: "flex", justifyContent: "center" }}>
                        <img src="/images/check-svg.svg" style={{ width: matches_md ? 90 : 110, marginTop: matches_md ? '-22%' : '-15%' }} />
                    </Grid>
                    <Grid item md={12} style={{ display: "flex", justifyContent: 'center', margin: '2% 0' }}>
                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 25 }}><font className="gradientText">Order Successfull!</font> We have received your order for {title}</h3>
                    </Grid>
                    <Grid item md={12} style={{ display: "flex", justifyContent: 'center', textAlign: "center" }}>
                        <p style={{ opacity: '70%', fontSize: 17, lineHeight: '1.5em' }}>
                            We are driven by providing ongoing value to our clients by bringing on great partners with services and resources that make it easier to run your business.
                        </p>
                    </Grid>
                    <Grid item md={12} style={{ width: '100%', display: "flex", justifyContent: 'center', alignItems: 'start', marginTop: matches_md ? '4%' : '2%' }}>
                        <Button onClick={handleCompanyClick} startIcon={<StoreOutlinedIcon />} variant="outlined" style={{ borderRadius: 7, fontSize: 13, padding: matches_md ? '4% 7%' : '1.5% 3%', color: '#7A00FF', border: '2px solid #7A00FF' }}>
                            View your Company
                        </Button>
                    </Grid>
                </Grid >
            </div >
        )
    }


    return (
        <div style={{ width: '100%', padding: 0, marginTop: '5%' }}>
            {startCompany()}
        </div>
    )
}