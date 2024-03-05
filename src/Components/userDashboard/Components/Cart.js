import { Grid, Button } from "@material-ui/core";
import AddonsSlider from "./AddonsSlider";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useLocation } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector, useDispatch } from "react-redux";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

export default function Cart(props) {

    var navigate = useNavigate()
    var user = JSON.parse(localStorage.getItem("User"))
    var userId = user[0]._id
    var dispatch = useDispatch()
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [firstName, setFirstName] = useState(user[0].firstname)
    const [lastName, setLastName] = useState(user[0].lastname)
    const [email, setEmail] = useState(user[0].email)
    const [mobileNo, setMobileNo] = useState(user[0].mobileno)
    const [Razorpay] = useRazorpay();
    var myCart = useSelector(state => state.cart)
    var cartServices = Object.values(myCart)
    var keys = Object.keys(myCart)

    const getReduxItems = () => {
        dispatch({ type: 'REFRESH_STATE' });
    };

    // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    // const CheckoutForm = () => {
    //     const stripe = useStripe();
    //     const elements = useElements();

    //     const [errorMessage, setErrorMessage] = useState(null);

    //     const handleSubmit = async (event) => {
    //         event.preventDefault();

    //         if (elements == null) {
    //             return;
    //         }

    //         // Trigger form validation and wallet collection
    //         const { error: submitError } = await elements.submit();
    //         if (submitError) {
    //             // Show error to your customer
    //             setErrorMessage(submitError.message);
    //             return;
    //         }

    //         // Create the PaymentIntent and obtain clientSecret from your server endpoint
    //         const res = await fetch('/create-intent', {
    //             method: 'POST',
    //         });

    //         const { client_secret: clientSecret } = await res.json();

    //         const { error } = await stripe.confirmPayment({
    //             //`Elements` instance that was used to create the Payment Element
    //             elements,
    //             clientSecret,
    //             confirmParams: {
    //                 return_url: 'https://example.com/order/123/complete',
    //             },
    //         });

    //         if (error) {
    //             // This point will only be reached if there is an immediate error when
    //             // confirming the payment. Show error to your customer (for example, payment
    //             // details incomplete)
    //             setErrorMessage(error.message);
    //         } else {
    //             // Your customer will be redirected to your `return_url`. For some payment
    //             // methods like iDEAL, your customer will be redirected to an intermediate
    //             // site first to authorize the payment, then redirected to the `return_url`.
    //         }
    //     };

    //     return (
    //         <form onSubmit={handleSubmit}>
    //             <PaymentElement />
    //             <Button type="submit" disabled={!stripe || !elements}
    //                 style={{ boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, marginTop: '2%', color: 'white', padding: matches_md ? '3% 6%' : '1% 2%' }}
    //             >
    //                 Proceed to Payment
    //             </Button>
    //             {/* Show error message to your customers */}
    //             {errorMessage && <div>{errorMessage}</div>}
    //         </form>
    //     );
    // };

    // const options = {
    //     mode: 'payment',
    //     amount: 399,
    //     currency: 'usd',
    //     // Fully customizable with appearance API.
    //     appearance: {
    //         /*...*/
    //     },
    // };

    const cartServicesCost = cartServices.reduce((accumulator, currentItem) => {
        if (typeof currentItem === 'number') {
            return accumulator + currentItem;
        } else if (typeof currentItem === 'object' && currentItem.price) {
            return accumulator + currentItem.price;
        } else {
            return accumulator;
        }
    }, 0);

    var location = useLocation()
    var companyid = location?.state?.companyid
    var companyDetails = location?.state?.companydetails
    var company = props.company
    var user = JSON.parse(localStorage.getItem("User"))

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const discountPercentage = 25;
    const finalCost = cartServicesCost - (cartServicesCost * discountPercentage / 100);

    useEffect(() => {
        if (props.setOrderAmount) {
            props.setOrderAmount(finalCost)
        }
    }, [finalCost])

    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
        amount: finalCost * 100,
        currency: "INR",
        name: props.companyName,
        description: "Test Transaction",
        image: `${serverURL}/images/croma-logo.png`,

        handler: async function (response) {
            var body = {
                '_id': companyDetails._id,
                'userid': companyDetails.userid,
                'orderamount': parseInt(companyDetails.orderamount) + parseInt(finalCost),
                'addons': JSON.stringify(JSON.parse(companyDetails.addons).concat(cartServices)),
                'addonsorderdate': new Date()
            };

            var response = await postData('company/update-company', body)
            if (response.status === true) {
                navigate('/dashboard/order-successfull', { state: { title: `${cartServices.map((item, i) => item.title)}` } })
                window.scrollTo(0, 0)
            }
        },
        prefill: {
            name: `${firstName} ${lastName}`,
            email: email,
            contact: mobileNo,
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
    };

    const handleRzrpPayment = async (params) => {
        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }

    const handleSubmitForm = async () => {
        handleRzrpPayment()
    }

    const handleAddonChip = (item) => {
        if (keys.includes(item.key + "")) {
            dispatch({ type: 'DELETE_SERVICE', payload: [item.key, item.key] })
            getReduxItems()
        }
    }


    const addonsServicesList = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: '100%', gap: '2%', justifyContent: "right", }}>
                {
                    props.addons ?
                        <>
                            {props.addons.map((item, i) => {
                                return (
                                    <div style={{ marginTop: '2%', display: "flex", justifyContent: "right", textAlign: "left" }}>
                                        <div onClick={() => handleAddonChip(item)} style={{ cursor: "pointer", borderRadius: 50, padding: '10px 20px', fontSize: 14, background: '#F7F0FF', display: "flex", alignItems: "center" }}>
                                            <CancelIcon style={{ opacity: '20%' }} />
                                            <p style={{ fontSize: matches_md ? 12 : 14 }}>{item.title}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            {cartServices.map((item, i) => {
                                return (
                                    <div style={{ marginTop: '2%', display: "flex", justifyContent: "right", textAlign: "left" }}>
                                        <div onClick={() => handleAddonChip(item)} style={{ cursor: "pointer", borderRadius: 50, padding: '10px 20px', fontSize: 14, background: '#F7F0FF', display: "flex", alignItems: "center" }}>
                                            <CancelIcon style={{ opacity: '20%' }} />
                                            <p style={{ fontSize: matches_md ? 12 : 14 }}>{item.title}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>

                }
            </div>
        )
    }

    const companyInfo = [
        {
            title: 'Item',
            para: props.companyName ? 'LLC Formation Service' : 'Addons Services'
        },
        {
            title: 'Addons',
            para: addonsServicesList()
        },
        {
            title: 'Amount',
            para: `$${cartServicesCost}`
        },
        {
            title: 'Discount',
            para: "-" + discountPercentage + "%"
        }
    ]

    const cartComponent = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, boxShadow: props.companyName ? 'none' : '3px 3px 20px #ededed', padding: props.companyName ? 0 : matches_md ? '6%' : '3%' }}>
                <Grid container spacing={0} style={{ marginBottom: '3%' }}>
                    <Grid item sm={6} style={{ width: matches_md ? '100%' : '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 22 : 25 }}>Cart Summary</h3>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '10%' }} />

                {
                    companyInfo.map((item, i) => {
                        return (
                            <Grid container spacing={0} style={{ width: '100%' }}>
                                <Grid item md={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                                    <h3 style={{ fontSize: 17, margin: matches_md ? '10% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%' }}>{item.title}</h3>
                                </Grid>
                                <Grid item md={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right' }}>
                                    <p style={{ fontSize: 16, margin: matches_md ? '10% 0' : '5% 0' }}>{item.para}</p>
                                </Grid>
                                <hr style={{ opacity: '10%', width: '100%' }} />
                            </Grid>
                        )
                    })
                }

                <Grid container spacing={0} style={{ width: '100%' }}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ fontSize: 18, margin: matches_md ? '10% 0' : '5% 0', fontWeight: 600, textTransform: "uppercase" }}>Total: </h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right' }}>
                        <p style={{ fontSize: 18, margin: matches_md ? '10% 0' : '5% 0', fontWeight: 600 }}>${finalCost}</p>
                    </Grid>
                </Grid>

                {
                    props.screen == "Registeration" ?
                        <></>
                        :
                        <>
                            <Button type="submit" variant="primary" onClick={handleSubmitForm} style={{ boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, marginTop: '2%', color: 'white', padding: matches_md ? '3% 6%' : '1% 2%' }}>
                                Proceed to Payment
                            </Button>
                        </>
                }

            </div>
        )
    }


    return (
        <div style={{ width: '100%', padding: 0 }}>

            <div style={{}}>
                {
                    cartServices.length == 0 ?
                        <>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <img src="/images/empty-folder.png" style={{ width: 150, height: 150, marginBottom: '2%' }} />
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Your cart is Empty!</h3>
                            </div>

                        </>
                        :
                        <>
                            {cartComponent()}
                        </>
                }
            </div>
            {/* <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements> */}
        </div>
    )
}