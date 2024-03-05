import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideDrawer from './SideDrawer';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DashboardDrawerMobile(props) {

    const navigate = useNavigate()
    const [state, setState] = React.useState({ right: false })
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var user = JSON.parse(localStorage.getItem("User"))
    const [userId, setUserId] = useState(user[0]?._id)
    const [firstName, setFirstName] = useState(user[0]?.firstname)
    const [lastName, setLastName] = useState(user[0]?.lastname)
    const [email, setEmail] = useState(user[0]?.email)
    const [password, setPassword] = useState(user[0]?.password)
    const [mobileNo, setMobileNo] = useState(user[0]?.mobileno)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            style={{ width: 350, position: 'relative', background: 'white' }}
            role="presentation"
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    toggleDrawer(anchor, false)(event);
                }
            }}
        >
            <CloseIcon onClick={toggleDrawer('left', false)} style={{ position: 'absolute', right: '2%', top: '1%', cursor: 'pointer', opacity: '70%' }} />
            <SideDrawer firstName={user[0].firstname} lastName={user[0].lastname} mobileNo={user[0].mobileno} email={user[0].email} password={user[0].password} userId={userId} />
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <img onClick={toggleDrawer('left', true)} src='/images/user-image.png' style={{ width: 40, height: 40, borderRadius: '50%', marginRight: '6%', cursor: 'pointer' }} />
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}