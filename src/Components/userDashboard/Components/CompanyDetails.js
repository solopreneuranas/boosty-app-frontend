import { Grid, Button } from "@material-ui/core";
import AddonsSlider from "./AddonsSlider";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useLocation } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';

export default function CompanyDetails(props) {

    var location = useLocation()
    var company = location?.state?.company
    var user = JSON.parse(localStorage.getItem("User"))
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));

    // const membersDataArray = JSON.parse(company.membersdata)
    const [membersDataArray, setMembersDataArray] = useState(Array.isArray(company.membersdata) ? company.membersdata : []);


    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    var date = new Date(company.orderdate)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate().toString().padStart(2, '0')
    var formattedDate = `${day} ${months[month]} ${year}`

    const gradientText = {
        background: 'linear-gradient(to right, blue, #8000ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        display: ' inline-block',
        fontSize: 22,
        margin: '5% 0',
        fontWeight: 600
    }

    const gradientIcon = {
        color: 'gray'
    }

    const checkComponent = () => {
        return (
            <CheckCircleIcon style={gradientIcon} fontSize="medium" />
        )
    }

    const companyAddons = () => {
        let companyAddonsArray = [];

        try {
            if (company.addons) {
                companyAddonsArray = JSON.parse(company.addons);
            }
        } catch (error) {
            console.error('No company addons:', error);
        }

        return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: '100%', gap: '2%', justifyContent: "right" }}>
                {
                    companyAddonsArray.map((item, i) => (
                        <div style={{ marginTop: '2%', display: "flex", justifyContent: "right", textAlign: "left" }} key={i}>
                            <div style={{ borderRadius: 50, padding: '10px 20px', fontSize: 14, background: '#F7F0FF' }}>{item.title}</div>
                        </div>
                    ))
                }
            </div>
        );
    }

    const companyInfo = [
        {
            title: 'Company Address',
            para: company.agentaddress
        },
        {
            title: 'Company Status',
            para: company.companystatus
        },
        {
            title: 'Company Industry',
            para: company.companyindustry
        },
        {
            title: 'Formation State',
            para: company.companystate
        },
        {
            title: 'Entity Type',
            para: company.companytype
        },
        {
            title: 'Website',
            para: company.companywebsite
        },
        {
            title: 'Company Description',
            para: company.companydescp
        },
        {
            title: 'Order Date',
            para: formattedDate
        },
        {
            title: 'EIN (TAX ID NUMBER):',
            para: company.ein ? company.ein : 'N/A'
        },
        {
            title: 'ITIN',
            para: company.itin ? company.itin : 'N/A'
        },
        {
            title: 'Addons',
            para: company.addons.length == 0 ? 'N/A' : companyAddons()
        }
    ]

    const contactInfo = [
        {
            title: 'Name',
            para: `${company.legalfirstname} ${company.legallastname}`
        },
        {
            title: 'Mailing Address',
            para: `${company.address}-${company.zipcode}, ${company.city}, ${company.state}, ${company.country}`
        },
        {
            title: 'Mobile no.',
            para: company.legalmobileno
        },
        {
            title: 'Email Address',
            para: company.legalemail
        },
    ]

    const memberInfo = [
        {
            title: 'Name',
            para: `${company.memberfirstname} ${company.memberlastname}`,
            ownership: company.memberownership
        }
    ]

    const userCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', boxShadow: '3px 3px 20px #ededed' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Company Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <h3 style={{ fontSize: matches_md ? 22 : 23, margin: '3% 0', fontWeight: 600, textTransform: "uppercase" }}>{company.companyname} {company.companytype}</h3>

                {
                    companyInfo.map((item, i) => {
                        return (
                            <div>
                                <Grid container spacing={0}>
                                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>{item.title}</h3>
                                    </Grid>
                                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right' }}>
                                        <p style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0' }}>{item.para}</p>
                                    </Grid>
                                </Grid>

                                {companyInfo.length - 1 === i ? <></> : <hr style={{ opacity: '30%' }} />}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const contactCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', boxShadow: '3px 3px 20px #ededed' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Contact Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                {
                    contactInfo.map((item, i) => {
                        return (
                            <div>
                                <Grid container spacing={0}>
                                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                                        <h3 style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%' }}>{item.title}</h3>
                                    </Grid>
                                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right' }}>
                                        <p style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0' }}>{item.para}</p>
                                    </Grid>
                                </Grid>

                                {contactInfo.length - 1 === i ? <></> : <hr style={{ opacity: '30%' }} />}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const agenctInfo = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', boxShadow: '3px 3px 20px #ededed' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Agent Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, opacity: '70%' }}>
                            {company.agentname ? company.agentname : 'N/A'}
                        </h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right' }}>
                        <p style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500 }}>{company.agentaddress ? company.agentaddress : 'N/A'}</p>
                    </Grid>
                </Grid>

            </div>
        )
    }

    const memberCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', boxShadow: '3px 3px 20px #ededed' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Members Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                {
                    memberInfo.map((item, i) => {
                        return (
                            <div>
                                <div style={{ border: '1px solid gainsboro', borderRadius: 10, padding: '1% 2%', marginTop: '3%' }}>
                                    <Grid container spacing={0}>
                                        <Grid item md={6} style={{ width: '50%', display: 'flex', justifyContent: 'left', flexDirection: 'row', gap: '4%', alignItems: "center" }}>
                                            <div style={{ background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', borderRadius: '100%', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                                1
                                            </div>
                                            <h3 style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, opacity: '70%' }}>{item.para}</h3>
                                        </Grid>
                                        <Grid item md={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right' }}>
                                            <p style={{ fontSize: matches_md ? 14 : 15, margin: matches_md ? '16% 0' : '5% 0' }}>Ownership: <font style={{ fontWeight: 500 }}>{item.ownership}%</font></p>
                                        </Grid>
                                    </Grid>
                                </div>
                                {
                                    membersDataArray[0] ?
                                        <>{allMembers()}</>
                                        :
                                        <></>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const allMembers = () => {
        return membersDataArray.map((item, i) => {
            return (
                <div style={{ border: '1px solid gainsboro', borderRadius: 10, padding: '1% 2%', marginTop: '3%' }}>
                    <Grid container spacing={0}>
                        <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left', flexDirection: 'row', gap: '4%', alignItems: "center" }}>
                            <div style={{ background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', borderRadius: '100%', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                {i + 2}
                            </div>
                            <h3 style={{ fontSize: 16, margin: '5% 0', fontWeight: 500, opacity: '70%' }}>{item.firstname} {item.lastname}</h3>
                        </Grid>
                        <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                            <p style={{ fontSize: 15, margin: '5% 0' }}>Ownership: <font style={{ fontWeight: 500 }}>{item.ownership}%</font></p>
                        </Grid>
                    </Grid>
                </div>
            )
        })
    }


    return (
        <div style={{ width: '100%', padding: '2% 3% 2% 1%' }}>

            <div style={{}}>
                {userCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {contactCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {agenctInfo()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {memberCompany()}
            </div>

        </div>
    )
}