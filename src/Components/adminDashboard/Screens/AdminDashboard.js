import * as React from 'react';
import { Grid, Button, TextField, Box } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PushPinIcon from '@mui/icons-material/PushPin';
import ListIcon from '@mui/icons-material/List';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ShareIcon from '@mui/icons-material/Share';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AllCompanies from '../Components/AllCompanies';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Logout from '@mui/icons-material/Logout';
import RegisterCompany from '../../RegisterCompany';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AllCustomers from '../Components/AllCustomers';
import CompanyDetails from '../Components/CompanyDetails';
import UserDetails from '../Components/UserDetails';
import DashboardComponent from '../Components/DashboardComponent';
import AdminTickets from '../Components/AdminTickets';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';

const useStylesTextField = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 15
        },
    },
}))

export default function AdminDashboard(props) {

    var admin = JSON.parse(localStorage.getItem("Admin"))
    var navigate = useNavigate()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStylesTextField()
    const [status, setStatus] = useState(false)


    const [selectedItemIndex, setSelectedItemIndex] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        setSelectedItemIndex(0)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('Admin')
        navigate('/adminlogin')
    }

    const listItems = [
        {
            icon: <DashboardIcon />,
            title: 'Dashboard',
            link: '/admindashboard'
        },
        {
            icon: <StoreOutlinedIcon />,
            title: 'Companies',
            link: '/admindashboard/companies'
        },
        {
            icon: <PermIdentityOutlinedIcon />,
            title: 'Customers',
            link: '/admindashboard/customers'
        },
        // {
        //     icon: <HelpCenterOutlinedIcon />,
        //     title: 'Tickets',
        //     link: '/admindashboard/tickets'
        // }
    ]

    const handleListItem = (item, i) => {
        if (item.link) {
            navigate(item.link);
            window.scrollTo(0, 0)
            setSelectedItemIndex(i);
        }
        else {
            setStatus(true)
        }
    }

    return (
        <div style={{ height: '100%' }}>
            <Grid container spacing={1} style={{ width: '100%', margin: 0, height: '100%' }}>
                <Grid item xs={2}
                    style={{
                        padding: '3% 1% 3% 0',
                        color: 'black',
                        height: '100vh',
                        background: '#f8f8f8',
                        position: 'sticky',
                        borderRight: '1px solid gainsboro',
                        top: 0
                    }}
                >
                    <Grid style={{ background: matches_md ? 'white' : 'white', color: 'black', borderRadius: '10px', display: "flex", justifyContent: matches_md ? "center" : "left", alignItems: 'center', padding: '3%', marginLeft: '5%' }}>
                        {
                            matches_md ?
                                <>
                                    {/* <DashboardDrawerMobile /> */}
                                </> : <>
                                    <img src='/images/user-image.png' style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '6%' }} />
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '500', padding: 0, margin: 0 }}>{admin[0]?.name}</div>
                                        <div style={{ fontSize: '11px', fontWeight: '500', opacity: '70%', padding: 0, margin: 0 }}>{admin[0]?.email}</div>
                                    </div>
                                </>
                        }
                    </Grid>

                    <Grid style={{ marginTop: '20%' }}>
                        <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
                            {listItems.map((item, i) => {
                                return (
                                    <div>
                                        <ListItemButton
                                            key={i}
                                            onClick={() => handleListItem(item, i)}
                                            style={{
                                                margin: '2% 0',
                                                color: selectedItemIndex === i ? 'white' : 'black',
                                                borderLeft: selectedItemIndex === i ? '3px solid black' : '3px solid white'
                                            }}
                                        >
                                            <ListItemIcon style={{ color: selectedItemIndex === i ? 'black' : 'black', opacity: '100%', fontSize: 14, opacity: selectedItemIndex === i ? '100%' : '75%' }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <p style={{ margin: 0, opacity: '100%', fontSize: 14, color: selectedItemIndex === i ? 'black' : 'black' }}>{item.title}</p>
                                        </ListItemButton>
                                    </div>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>

                <Grid item xs={10} style={{ padding: matches_md ? '2% 3%' : '2% 1.5%', height: '100%', background: 'white', width: '100%', position: 'sticky', top: 0 }}>
                    <Grid container spacing={1} style={{ zIndex: 99, width: '100%', padding: 0, marginBottom: matches_md ? '10%' : 0 }}>
                        <Grid item xs={matches_md ? 8 : 10} style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: '600', fontSize: matches_md ? 18 : 21, textAlign: 'left', margin: 0, marginLeft: '3%' }}>Hi, Welcome back {admin[0]?.name} 👋</h3>
                        </Grid>
                        <Grid item xs={matches_md ? 2 : 2} style={{ display: "flex", alignItems: 'center' }}>
                            <Badge onClick={handleLogout} style={{ cursor: 'pointer', marginRight: matches_md ? '20%' : '10%', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                <Logout color="action" style={{ width: 25, height: 25, color: '#fc7168' }} />
                                <h3 style={{ fontWeight: 500, fontSize: 17, marginLeft: '3%', color: '#fc7168' }}>Logout</h3>
                            </Badge>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}
                        style={{
                            height: '100%',
                            width: '100%',
                            marginTop: '4%'
                        }} >
                        <Grid item xs={12} style={{
                            height: '100%', width: '100%'
                        }}>
                            <Routes>
                                <Route element={<DashboardComponent />} path="/" />
                                <Route element={<AllCompanies />} path="/companies" />
                                <Route element={<CompanyDetails />} path="/company-details" />
                                <Route element={<AllCustomers />} path="/customers" />
                                <Route element={<UserDetails />} path="/user-details" />
                                <Route element={<AdminTickets />} path="/tickets" />
                            </Routes>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}