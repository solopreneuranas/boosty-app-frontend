import * as React from 'react';
import { Grid, TextField, Button, Box } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { getData, serverURL, postData } from "../../../Services/FetchNodeServices";
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function TicketsList() {

    var user = JSON.parse(localStorage.getItem("User"))
    const userId = user[0]._id
    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var navigate = useNavigate()
    const [ticket, setTicketId] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [ticketsList, setTicketsList] = useState([])
    const [status, setStatus] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openOptions = Boolean(anchorEl);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches_md ? '80%' : '35%',
        bgcolor: 'white',
        color: 'black',
        p: matches_md ? '8% 6%' : '2%',
        borderRadius: 1
    }

    const handleClick = (event, item) => {
        setTicketId(item._id)
        setMessage(item.message)
        setTitle(item.title)
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseOptions = () => {
        setAnchorEl(null);
    };

    useEffect(function () {
        fetchTickets()
    }, [])

    const fetchTickets = async () => {
        var body = { 'userid': userId }
        var response = await postData('tickets/display_all_tickets_by_user', body)
        setTicketsList(response.data)
    }

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }))

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleEditTicket = (item) => {
        setStatus(true)
        setAnchorEl(null)
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', "link"],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
            ]
        },
    }), [])

    const handleClose = () => {
        setStatus(false)
    }

    const handleMessage = async () => {
        var body = { 'userid': userId, 'message': message, 'title': title, 'ticketdate': new Date() }
        var response = await postData('tickets/create-tickets', body)
        if (response.status === true) {
            setMessage('')
            setTitle('')
            setStatus(false)
            Swal.fire({
                icon: 'success',
                toast: true,
                timer: 2000,
                title: 'Your Ticket has been created!'
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Something is missing!'
            })
        }
    }

    const editTicketModal = () => {
        return (
            <div style={{ position: 'relative' }}>
                <Modal
                    style={{ background: '#9b9b9ba1' }}
                    open={status}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={status}>
                        <Box sx={style}>
                            <CloseIcon onClick={handleClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer', opacity: '30%' }} />
                            <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', }}>
                                <h3 style={{ fontWeight: 500, fontSize: 18 }}>Leave us a message and we'll reach you soon!</h3>
                            </Grid>
                            <TextField onChange={(e) => setTitle(e.target.value)} value={title}
                                style={{ marginTop: '8%' }} variant='outlined' label='Enter the title' fullWidth className={classes.roundedTextField} />
                            <Grid container spacing={1} style={{ marginTop: '3%' }}>
                                <Grid item sm={12} style={{ margin: '0 0 7%' }}>
                                    <ReactQuill style={{ height: 200 }} theme="snow" value={message} onChange={setMessage} modules={modules} />
                                </Grid>
                                <Grid item sm={12} style={{ marginTop: '4%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <Button variant='contained' fullWidth onClick={handleMessage}
                                        style={{ padding: '2% 0', boxShadow: 'none', borderRadius: 15, color: 'white', background: 'linear-gradient(to right, blue, #8000ff)', fontWeight: 500, fontSize: 18 }}
                                    >Submit</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        )
    }

    const displayTicketsListMobile = () => {
        return (
            ticketsList.map((item, i) => {

                var date = new Date(item.ticketdate);
                var month = date.getMonth()
                var day = date.getDate().toString().padStart(2, '0')
                var formattedDate = `${day} ${months[month].slice(0, 3)}`

                return (
                    <Grid container spacing={1} style={{ position: 'relative', padding: '5% 3%', borderRadius: 15, background: i % 2 == 0 ? '#F1EEE4' : 'white', display: 'flex', alignItems: 'center', margin: '3% 0 6%', boxShadow: i % 2 == 0 ? 'none' : '0px 3px 20px #d9d9d9' }}>
                        <div style={{}}>
                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 40, opacity: '25%' }}>{i + 1}.</h3>
                        </div>
                        <Grid item xs={12} style={{ position: 'absolute', top: '3%', right: '3%' }}>
                            <MoreVertIcon style={{ cursor: 'pointer' }}
                                aria-controls={openOptions ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openOptions ? 'true' : undefined}
                                onClick={(event) => handleClick(event, item)}
                            />
                            <Menu
                                style={{ boxShadow: 'none' }}
                                anchorEl={anchorEl}
                                open={openOptions}
                                onClose={handleCloseOptions}
                            >
                                <MenuItem><EditIcon style={{ marginRight: '12%' }} /> Edit</MenuItem>
                                <MenuItem><DeleteIcon style={{ marginRight: '12%' }} /> Delete</MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item xs={10}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h3>
                        </Grid>
                        <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16, color: 'green' }}>Date: {formattedDate}</h3>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    const displayTicketsList = () => {
        return (
            ticketsList.map((item, i) => {

                var date = new Date(item.ticketdate);
                var month = date.getMonth()
                var year = date.getFullYear()
                var day = date.getDate().toString().padStart(2, '0')
                var formattedDate = `${day} ${months[month].slice(0, 3)} ${year}`

                return (
                    <div style={{ width: '100%' }}>
                        <Grid container spacing={1} style={{ width: '100%', margin: '1% 0', padding: i % 2 == 0 ? '0.5% 1%' : '1%', borderRadius: 10, background: i % 2 == 0 ? 'transparent' : 'white', boxShadow: i % 2 == 0 ? 'none' : '3px 3px 20px #ededed', display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={1}>
                                <img src="http://localhost:3000/images/user-image.png" style={{ width: 30, height: 30 }} />
                            </Grid>
                            <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h3>
                            </Grid>
                            <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16, color: 'green' }}>{formattedDate}</h3>
                            </Grid>
                        </Grid>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            {editTicketModal()}
            <div style={{ margin: matches_md ? '0 3%' : '7% 0 0', height: matches_md ? '100%' : '100vh' }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 26 }}>Tickets List</h3><br />
                {
                    matches_md ? displayTicketsListMobile() : displayTicketsList()
                }
            </div>
        </div>
    )
}