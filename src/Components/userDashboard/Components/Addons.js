import * as React from 'react';
import { Grid } from "@mui/material";
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../Services/FetchNodeServices';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { primaryColor } from '../../globalVariables';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function Addons() {

    var navigate = useNavigate()
    var classes = useStyles()
    var dispatch = useDispatch()
    var user = JSON.parse(localStorage.getItem("User"))
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedService, setSelectedService] = useState({});
    const [company, setCompany] = useState({})
    var myCart = useSelector(state => state.cart)
    var keys = Object.keys(myCart)
    const [open, setOpen] = useState(false);
    const [checkout, setCheckout] = useState(false)


    const fetchCompanyByUser = async () => {
        var body = { 'userid': user[0]._id }
        var response = await postData('company/display_all_companies_by_user', body)
        if (response.status === true) {
            setCompany(response.data[0])
        }
    }

    useEffect(() => {
        fetchCompanyByUser()
    }, [])


    const handleClose = () => {
        setOpen(false);
    };

    const services = [
        {
            "key": 100,
            "icon": "address",
            "title": "Premium Business Address",
            "price": 199,
            "priceTime": "One Time Fee",
            "details": "Get your premium, unique business mailing address that allows for receiving 10+ mails monthly, along with an Amazon Post (Verification) Card."
        },
        {
            "key": 200,
            "icon": "website",
            "title": "WordPress & Shopify Website Setup",
            "price": 349,
            "priceTime": "One Time Fee",
            "details": "Experience a smooth start online as we handle the intricate setup of your WordPress or Shopify website."
        },
        {
            "key": 300,
            "icon": "paypal",
            "title": "Business PayPal Account",
            "price": 199,
            "priceTime": "One Time Fee",
            "details": "Our team will help you create a Business PayPal Account and give you a free US Premium VPS for six months."
        },
        {
            "key": 400,
            "icon": "company",
            "title": "UK Company Formation",
            "price": 249,
            "priceTime": "One Time Fee",
            "details": "Comprehensive UK Company Formation. Business, Director, Registered Address, Wise business account included."
        },
        {
            "key": 500,
            "icon": "file",
            "title": "Resale Certificate / Seller Permit",
            "price": 199,
            "priceTime": "One Time Fee",
            "details": "Legal compliance made easy. Obtain a Resale Certificate/Seller Permit with our expert assistance."
        },
        {
            "key": 600,
            "icon": "approve-file",
            "title": "ITIN Application",
            "price": 349,
            "priceTime": "One Time Fee",
            "details": "Hassle-free ITIN application. Smooth documentation, IRS approval, dedicated service team support."
        }
    ]

    const handleCart = (item) => {
        setSelectedService(item)
        if (keys.includes(item.key + "")) {
            dispatch({ type: 'DELETE_SERVICE', payload: [item.key, item.key] })
            setOpen(true)
            setCheckout(false)
        }
        else {
            dispatch({ type: 'ADD_SERVICE', payload: [item.key, item] })
            setCheckout(true)
            setOpen(true)
        }
    }

    const confirmModal = () => {
        return (
            <div>
                <Dialog fullWidth
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <CloseOutlinedIcon onClick={handleClose} style={{ cursor: 'pointer', position: 'absolute', opacity: '50%', width: 30, height: 30, top: '5%', right: '3%' }} />
                    <DialogTitle id="alert-dialog-title">
                        <div style={{ width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2%', justifyContent: 'center', textAlign: 'center', padding: '4% 0' }}>
                            <img src="/images/check-svg.svg" style={{ width: 60, height: 60, marginBottom: '2%' }} />
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 22, lineHeight: '1.2em' }}>
                                {
                                    keys.includes(selectedService.key + "") ? `Service added to Cart!` : "Service removed from Cart!"
                                }
                            </h3>
                        </div>
                    </DialogTitle>
                </Dialog>
            </div>
        )
    }

    const handleBuyNow = (item) => {
        navigate('/dashboard/cart', { state: { 'companydetails': company } })
    }

    return (
        <div style={{ width: '100%', padding: '2%' }}>
            {confirmModal()}
            <Grid container spacing={1}>
                <Grid item md={12}>
                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 22 : 25 }}>Addons Services</h3>
                    <p style={{ margin: 0, opacity: '70%', marginTop: '1%' }}>View company information and account details</p>
                </Grid>
            </Grid>

            <div style={{ marginTop: '4%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '3%' }}>
                {
                    services.map((item, i) => {
                        return (
                            <div style={{ width: matches_md ? '100%' : '40%', marginTop: matches_md ? '6%' : '3%', borderRadius: 10, background: 'white', padding: matches_md ? '6%' : '3%', boxShadow: '3px 3px 20px #ededed', position: "relative" }}>
                                <div style={{ position: "absolute", padding: '1% 2%', borderRadius: 7, top: '8%', right: '6%', background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', width: 60, display: "flex", justifyContent: "center" }}>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: 23 }}>${item.price}</h3>
                                </div>
                                <div style={{ height: matches_md ? '' : 215 }}>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 20 : 22, width: '70%' }}>{item.title}</h3>
                                    <p style={{ margin: '8% 0 4%', opacity: '80%', fontWeight: 500 }}>{item.priceTime}</p>
                                    <p style={{ marginTop: '1%', opacity: '80%' }}>{item.details}</p>
                                </div>
                                <Button onClick={() => handleCart(item)} startIcon={<ShoppingCartOutlinedIcon />} variant='outined'
                                    style={{
                                        marginTop: '5%',
                                        color: keys.includes(item.key + "") ? 'gray' : primaryColor,
                                        border: keys.includes(item.key + "") ? '2px solid gray' : `2px solid ${primaryColor}`,
                                        borderRadius: 10,
                                        padding: '2% 5%',
                                        fontWeight: 500
                                    }}
                                >
                                    {
                                        keys.includes(item.key + "") ? `Remove from Cart!` : "Add to Cart!"
                                    }
                                </Button>
                                {
                                    keys.includes(item.key + "") ?
                                        <>
                                            <Button onClick={() => handleBuyNow(item)} startIcon={<ShoppingCartOutlinedIcon />} variant='outined'
                                                style={{
                                                    background: 'linear-gradient(to right, blue, #8000ff)',
                                                    marginTop: '5%',
                                                    marginLeft: matches_md ? '1%' : '3%',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 10,
                                                    padding: '2% 5%',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Checkout
                                            </Button>
                                        </>
                                        :
                                        <></>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
