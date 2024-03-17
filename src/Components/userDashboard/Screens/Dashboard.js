import * as React from 'react';
import { Grid, Button, TextField, Box } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PushPinIcon from '@mui/icons-material/PushPin';
import ListIcon from '@mui/icons-material/List';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ShareIcon from '@mui/icons-material/Share';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SideDrawerMobile from '../Components/SideDrawerMobile';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import SideDrawer from '../Components/SideDrawer';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import MyCompany from '../Components/MyCompany';
import Addons from '../Components/Addons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Logout from '@mui/icons-material/Logout';
import RegisterCompany from '../../RegisterCompany';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CompanyDetails from '../Components/CompanyDetails';
import OrderSuccess from '../Components/OrderSuccess';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardComponent from '../Components/DashboardComponent';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Cart from '../Components/Cart';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Documents from '../Components/Documents';
import Support from '../Components/Support';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import DashboardDrawerMobile from '../Components/DashboardDrawerMobile';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Mailroom from '../Components/Mailroom';
import { primaryColor } from '../../globalVariables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStylesTextField = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 15
        },
    },
}))

export default function Dashboard(props) {

    var user = JSON.parse(localStorage.getItem("User"))
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
        localStorage.removeItem('User')
        navigate('/login')
    }

    const listItems = [
        {
            icon: <DashboardIcon />,
            title: 'Dashboard',
            link: '/dashboard'
        },
        {
            icon: <StoreOutlinedIcon />,
            title: 'My Business',
            link: '/dashboard/company'
        },
        {
            icon: <DescriptionOutlinedIcon />,
            title: 'Document',
            link: '/dashboard/documents'
        },
        {
            icon: <MarkunreadOutlinedIcon />,
            title: 'Mailroom',
            link: '/dashboard/mailroom'
        },
        {
            icon: <PostAddIcon />,
            title: 'Addons Services',
            link: '/dashboard/addons'
        },
        {
            icon: <QuestionAnswerOutlinedIcon />,
            title: 'Support'
        }
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
            <ToastContainer />
            <Grid container spacing={1} style={{ width: '100%', margin: 0, height: '100%' }}>
                {
                    matches_md ?
                        <></>
                        :
                        <>
                            <Grid item xs={2}
                                style={{
                                    padding: '3% 1% 3% 0',
                                    color: 'black',
                                    height: '100vh',
                                    background: 'white',
                                    position: 'sticky',
                                    //borderRight: '1px solid gainsboro',
                                    top: 0
                                }}
                            >
                                <Grid item md={12} style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                    <img src='/images/boosty-app-logo.svg' style={{ width: 150 }} />
                                </Grid>

                                <Grid style={{ background: matches_md ? 'white' : 'white', color: 'black', borderRadius: '10px', display: "flex", justifyContent: matches_md ? "center" : "left", alignItems: 'center', padding: '3%', marginLeft: '5%' }}>
                                    {
                                        matches_md ?
                                            <>
                                                <DashboardDrawerMobile />
                                            </>
                                            :
                                            <>
                                                {/* <img src='/images/user-image.png' style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '6%' }} />
                                                <div>
                                                    <div style={{ fontSize: '16px', fontWeight: '500', padding: 0, margin: 0 }}>{user[0]?.firstname}</div>
                                                    <div style={{ fontSize: '11px', fontWeight: '500', opacity: '70%', padding: 0, margin: 0 }}>{user[0]?.email}</div>
                                                </div> */}
                                            </>
                                    }
                                </Grid>

                                <Grid style={{ marginTop: '10%' }}>
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
                                                            borderLeft: selectedItemIndex === i ? `3px solid ${primaryColor}` : '3px solid white'
                                                        }}
                                                    >
                                                        <ListItemIcon style={{ color: selectedItemIndex === i ? primaryColor : 'black', opacity: '100%', fontSize: '15px', opacity: selectedItemIndex === i ? '100%' : '75%' }}>
                                                            {item.icon}
                                                        </ListItemIcon>
                                                        <p style={{ margin: 0, opacity: '100%', fontSize: '15px', color: selectedItemIndex === i ? primaryColor : 'black' }}>{item.title}</p>
                                                    </ListItemButton>
                                                </div>
                                            );
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </>
                }

                <Grid item xs={matches_md ? 12 : 8} style={{ padding: matches_md ? '2% 3%' : '2% 1.5%', height: '100%', background: '#F4F5FF', width: '100%', position: 'sticky', top: 0 }}>
                    <Grid container spacing={1} style={{ zIndex: 99, width: '100%', padding: 0, marginBottom: matches_md ? '10%' : 0 }}>
                        {
                            matches_md ?
                                <>
                                    <Grid item xs={2}>
                                        <DashboardDrawerMobile />
                                    </Grid>
                                </>
                                :
                                <></>
                        }
                        <Grid item xs={matches_md ? 8 : 10} style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: '600', fontSize: matches_md ? 18 : 25, textAlign: 'left', margin: 0, marginLeft: '3%' }}>Hi, Welcome back {user[0]?.firstname} 👋</h3>
                        </Grid>
                        <Grid item xs={matches_md ? 2 : 2} style={{ display: "flex", alignItems: 'center' }}>
                            <Badge showZero variant="dot" color="error" style={{ marginRight: matches_md ? '20%' : '10%', marginRight: 'auto' }}>
                                <ShoppingCartOutlinedIcon onClick={() => navigate('/dashboard/cart')} color="action" style={{ cursor: 'pointer', width: 25, height: 25 }} />
                            </Badge>
                            {
                                matches_md ?
                                    <>
                                        <SideDrawerMobile userid={user[0]._id} />
                                    </>
                                    :
                                    <>
                                        <Badge onClick={handleLogout} style={{ cursor: 'pointer', marginRight: matches_md ? '20%' : '10%', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                            <Logout color="action" style={{ width: 25, height: 25, color: '#fc7168' }} />
                                            <h3 style={{ fontWeight: 500, fontSize: 17, marginLeft: '3%', color: '#fc7168' }}>Logout</h3>
                                        </Badge>
                                    </>
                            }
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}
                        style={{
                            height: '100%',
                            width: '100%',
                            marginTop: '6%'
                        }} >
                        <Grid item xs={12} style={{
                            height: '100%', width: '100%'
                        }}>
                            <Routes>
                                <Route element={<DashboardComponent />} path="/" />
                                <Route element={<MyCompany />} path="/company" />
                                <Route element={<Addons />} path="/addons" />
                                <Route element={<RegisterCompany />} path="/register-company" />
                                <Route element={<CompanyDetails />} path="/company-details" />
                                <Route element={<OrderSuccess />} path="/order-successfull" />
                                <Route element={<Mailroom />} path="/mailroom" />
                                <Route element={<Documents />} path="/documents" />
                                <Route element={<Cart />} path="/cart" />
                            </Routes>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    matches_md ? <></> :
                        <Grid item xs={2} style={{ padding: 0, height: '100vh', background: 'white', width: '100%', position: 'sticky', top: 0 }}>
                            <SideDrawer firstName={user[0].firstname} lastName={user[0].lastname} email={user[0].email} password={user[0].password} userid={user[0]._id} mobileNo={user[0].mobileno} />
                        </Grid>
                }
            </Grid>
            <Support status={status} setStatus={setStatus} />
        </div >
    )
}