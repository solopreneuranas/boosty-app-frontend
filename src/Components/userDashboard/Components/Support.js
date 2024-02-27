import React, { useEffect, useMemo, useState } from 'react';
import { AppBar, Box, Grid, Toolbar, Button } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { TextField, InputAdornment } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postData } from '../../../Services/FetchNodeServices';
import Swal from 'sweetalert2'
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))


export default function Support({ status, setStatus }) {

    var navigate = useNavigate()
    const classes = useStyles();
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    var user = JSON.parse(localStorage.getItem("User"))
    const userId = user[0]._id
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [alertStatus, setAlertStatus] = useState(false)

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
        setStatus(false);
        setMessage('')
        setTitle('')
        setAlertStatus(false)
    }

    const handleMessage = async () => {
        var body = { 'userid': userId, 'message': message, 'title': title, 'ticketdate': new Date() }
        var response = await postData('tickets/create-tickets', body)
        if (response.status === true) {
            setAlertStatus(true)
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Something is missing!'
            })
        }
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleMessage()
        }
    }

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
                            <Grid item sm={12} style={{ margin: matches_md ? '0 0 19%' : '0 0 7%' }}>
                                <ReactQuill style={{ height: 200 }} theme="snow" value={message} onChange={setMessage} modules={modules} />
                            </Grid>
                            <Grid item sm={12} style={{ marginTop: '4%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Button variant='contained' fullWidth onClick={handleMessage}
                                    style={{ padding: '2% 0', boxShadow: 'none', borderRadius: 15, color: 'white', background: 'linear-gradient(to right, blue, #8000ff)', fontWeight: 500, fontSize: 18 }}
                                >Submit</Button>
                            </Grid>
                            {
                                alertStatus ?
                                    <>
                                        <Grid item xs={12} style={{ marginTop: '3%' }}>
                                            <div style={{ width: '100%' }}>
                                                <Alert severity="success">
                                                    <font style={{ fontWeight: 500 }}>Success!</font> We have received your message and will revert back soon!
                                                </Alert>
                                            </div>
                                        </Grid>
                                    </>
                                    :
                                    <></>
                            }
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}