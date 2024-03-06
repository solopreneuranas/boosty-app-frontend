import { Grid, Button } from "@material-ui/core";
import AddonsSlider from "./AddonsSlider";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { primaryColor } from "../../globalVariables";

export default function StartCompany(props) {

    var navigate = useNavigate()
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleCompanyClick = () => {
        navigate(props.btnLink)
    }

    const startCompany = () => {
        return (
            <div>
                <Grid container spacing={1} style={{ position: "relative", borderRadius: 20, background: matches_md ? 'white' : `linear-gradient(to right bottom, white 70%, blue 28%, ${primaryColor} 2%)`, padding: matches_md ? '6%' : '3% 5%', boxShadow: '3px 3px 20px #ededed' }}>
                    <Grid item md={12} style={{ display: "flex", alignItems: "center", gap: '1%', marginBottom: '2%' }}>
                        <CheckCircleOutlinedIcon style={{ opacity: '50%', marginRight: matches_md ? '3%' : '' }} />
                        <p style={{ margin: 0, fontSize: 18, fontWeight: 500, opacity: '50%' }}>Formations</p>
                    </Grid>
                    <Grid item md={6}>
                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 22 : 25 }}><font className="gradientText">{props.title}</font>{props.subTitle}</h3>
                        <p style={{ marginTop: '3%', opacity: '70%', fontSize: matches_md ? 16 : 17, lineHeight: '1.5em' }}>
                            We are driven by providing ongoing value to our clients by bringing on great partners with services and resources that make it easier to run your business.
                        </p>
                        <p style={{ marginTop: '5%', opacity: '70%', fontSize: 17, lineHeight: '1.5em' }}>
                            We don't believe that one size fits all, therefore our recommendations are a curated list based on your business type, industry, and other qualified information that help us provide only services relevant to your business.
                        </p>
                    </Grid>
                    <Grid item md={6} style={{ width: '100%', display: "flex", justifyContent: matches_md ? 'left' : 'right', alignItems: 'start', marginTop: matches_md ? '4%' : '' }}>
                        <Button onClick={handleCompanyClick} startIcon={props.icon} variant="outlined" style={{ borderRadius: 12, fontSize: 13, padding: matches_md ? '4% 6%' : '3%', color: primaryColor, border: `2px solid ${primaryColor}` }}>
                            {props.btnText}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }


    return (
        <div style={{ width: '100%', padding: 0, marginTop: '4%' }}>
            {startCompany()}
        </div>
    )
}