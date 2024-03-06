import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, Button, Box } from "@material-ui/core";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { primaryColor } from '../../globalVariables';

export default function AddonsSlider(props) {

    var dispatch = useDispatch()
    const sliderRef = useRef(null);
    const theme = useTheme();
    var myCart = useSelector(state => state.cart)
    var keys = Object.keys(myCart)
    const [refresh, setRefresh] = useState(false)
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedService, setSelectedService] = useState({});

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        focusOnSelect: false,
        autoplay: true,
        slidesToShow: matches_md ? 1 : 2.5,
        slidesToScroll: matches_md ? 1 : 1,
        arrows: false,
    }

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
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

    const handleCart = (item) => {
        setSelectedService(item)
        if (keys.includes(item.key + "")) {
            dispatch({ type: 'DELETE_SERVICE', payload: [item.key, item.key] })
            props.setRefresh(!props.refresh)
            setOpen(true)
        }
        else {
            dispatch({ type: 'ADD_SERVICE', payload: [item.key, item] })
            props.setRefresh(!props.refresh)
            setOpen(true)
        }
    }

    const servicesSlider = () => {
        return services.map((item, i) => {
            return (
                <div>
                    <div style={{ margin: '5% 4%', borderRadius: 10, background: 'white', padding: '8%', boxShadow: '3px 3px 20px #ededed', position: "relative" }}>
                        <div style={{ position: "absolute", padding: '1% 2%', borderRadius: 7, top: '8%', right: '6%', background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', width: 60, display: "flex", justifyContent: "center" }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 22 }}>${item.price}</h3>
                        </div>
                        <div style={{ height: 230 }}>
                            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 20, width: '70%' }}>{item.title}</h3>
                            <p style={{ margin: '8% 0 4%', opacity: '80%', fontWeight: 500 }}>{item.priceTime}</p>
                            <p style={{ marginTop: '1%', opacity: '80%' }}>{item.details}</p>
                        </div>
                        <Button onClick={() => handleCart(item)} startIcon={<ShoppingCartOutlinedIcon />} variant='outined'
                            style={{
                                marginTop: '5%',
                                color: keys.includes(item.key + "") ? 'gray' : primaryColor,
                                border: keys.includes(item.key + "") ? '2px solid gray' : `2px solid ${primaryColor}`,
                                borderRadius: 10,
                                padding: '3% 6%',
                                fontWeight: 500
                            }}
                        >
                            {
                                keys.includes(item.key + "") ? 'Remove from Cart' : 'Add to Cart'
                            }
                        </Button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ marginTop: '3%' }}>
            {confirmModal()}
            <Slider ref={sliderRef} {...settings}>
                {servicesSlider()}
            </Slider>
        </div>
    )
}