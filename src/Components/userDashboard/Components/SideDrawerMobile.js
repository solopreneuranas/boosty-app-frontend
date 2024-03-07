import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideDrawer from './SideDrawer';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Support from './Support';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Logout from '@mui/icons-material/Logout';
import { primaryColor } from '../../globalVariables';

export default function SideDrawerMobile(props) {

    var navigate = useNavigate()
    const [state, setState] = React.useState({ right: false })
    var user = JSON.parse(localStorage.getItem("User"))
    const [userId, setUserId] = useState(user[0]?._id)
    const [firstName, setFirstName] = useState(user[0]?.firstname)
    const [lastName, setLastName] = useState(user[0]?.lastname)
    const [email, setEmail] = useState(user[0]?.email)
    const [password, setPassword] = useState(user[0]?.password)
    const [mobileNo, setMobileNo] = useState(user[0]?.mobileno)
    const [selectedItemIndex, setSelectedItemIndex] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [status, setStatus] = useState(false)
    const open = Boolean(anchorEl)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        setSelectedItemIndex(0)
    }, [])

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

    const handleListItem = (item, i, event) => {
        if (item.link) {
            navigate(item.link);
            window.scrollTo(0, 0)
            setSelectedItemIndex(i);
            toggleDrawer('right', false)(event)
        }
        else {
            toggleDrawer('right', false)(event)
            setStatus(true)
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const logoutSec = () => {
        return (
            <div onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '6%', display: 'flex', alignItems: 'center', marginTop: '5%' }}>
                <Logout color="action" style={{ width: 25, height: 25, color: '#fc7168' }} />
                <h3 style={{ fontWeight: 500, fontSize: 17, marginLeft: '3%', color: '#fc7168' }}>Logout</h3>
            </div>
        )
    }

    const listComponent = () => {
        return (
            <div style={{ marginTop: '10%' }}>
                <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
                    {listItems.map((item, i) => {
                        return (
                            <div>
                                <ListItemButton
                                    key={i}
                                    onClick={(event) => handleListItem(item, i, event)}
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
            </div>
        )
    }

    const list = (anchor) => (
        <Box
            style={{ width: 350, position: 'relative' }}
            role="presentation"
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    toggleDrawer(anchor, false)(event);
                }
            }}
        >
            <CloseIcon onClick={toggleDrawer('right', false)} style={{ position: 'absolute', right: '2%', top: '1%', cursor: 'pointer', opacity: '70%', zIndex: 99 }} />
            {listComponent()}
            {logoutSec()}
        </Box>
    );


    return (
        <div>
            <React.Fragment key={'right'}>
                <MenuIcon onClick={toggleDrawer('right', true)} style={{ cursor: 'pointer', width: 30, height: 30, opacity: '70%' }} />
                {/* <img onClick={toggleDrawer('right', true)} src='/images/user-image.png' style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '6%', cursor: 'pointer' }} /> */}
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </React.Fragment>
            <Support status={status} setStatus={setStatus} />
        </div>
    );
}