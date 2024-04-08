import React, { useState } from 'react';
import { Form, ProgressBar, Row, Col } from 'react-bootstrap';
import { TextField, Grid, Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Swal from 'sweetalert2'
import { postData, serverURL } from '../Services/FetchNodeServices';
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import Cart from './userDashboard/Components/Cart';
import AddonsSlider from './userDashboard/Components/AddonsSlider';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function RegisterCompany(props) {

    var navigate = useNavigate()
    var myCart = useSelector(state => state.cart)
    var cartServices = Object.values(myCart)
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const addons = []
    cartServices.forEach((item) => {
        if (typeof item === 'object') {
            addons.push(item);
        }
    });

    var dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    var user = JSON.parse(localStorage.getItem("User"))
    const [Razorpay] = useRazorpay();
    var userId = user[0]._id
    const [firstName, setFirstName] = useState(user[0].firstname)
    const [lastName, setLastName] = useState(user[0].lastname)
    const [email, setEmail] = useState(user[0].email)
    const [mobileNo, setMobileNo] = useState(user[0].mobileno)
    const [passport, setPassport] = useState({ bytes: '', filename: '' })
    const [legalFirstName, setLegalFirstName] = useState('')
    const [legalLastName, setLegalLastName] = useState('')
    const [legalEmail, setLegalEmail] = useState('')
    const [legalMobileNo, setLegalMobileNo] = useState('')
    const [password, setPassword] = useState(user[0].password)
    const [companyName, setCompanyName] = useState('')
    const [companyType, setCompanyType] = useState('')
    const [companyWebsite, setCompanyWebsite] = useState('')
    const [companyIndustry, setCompanyIndustry] = useState('')
    const [companyDescp, setCompanyDescp] = useState('')
    const [itin, setItin] = useState('')
    const [isItin, setIsItin] = useState(false)
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [memberFirstName, setMemberFirstName] = useState('')
    const [memberLastName, setMemberLastName] = useState('')
    const [memberOwnership, setMemberOwnership] = useState('')
    const [orderAmount, setOrderAmount] = useState('')
    const [selectedState, setSelectedState] = useState(null)

    const [getErrors, setErrors] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const [ownershipError, setOwnershipError] = useState(false)

    const [memberData, setMemberData] = useState([])

    var memberDataArray = memberData.map(item => item)

    const [orderConfirm, setOrderConfirm] = useState(false)

    const classes = useStyles();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const registerCompanyComponent = () => {

        const handleCompanyTypeChange = (event) => {
            setCompanyType(event.target.value);
        };

        const handleCompanyIndustry = (event, newValue) => {
            setCompanyIndustry(newValue)
        }

        const handleCountryChange = (event, newValue) => {
            setCountry(newValue)
        }

        const handleError = (error, label) => {
            setErrors((prev) => ({ ...prev, [label]: error }))
        }

        const handlePassport = (event) => {
            setPassport({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        }

        const validation = () => {
            var error = false

            setErrors({})

            if (step === 1) {
                if (firstName.length === 0) {
                    error = true;
                    handleError('Please enter name', 'firstName');
                }
                if (email.length === 0) {
                    error = true
                    handleError('Please enter email', 'email')
                }
            }

            if (step === 2) {
                if (!selectedState) {
                    error = true;
                    handleError('Please enter state', 'selectedState');
                }
            }

            if (step === 3) {
                setOwnershipError(false)
                if (companyName.length === 0) {
                    error = true
                    handleError('Please enter company name', 'companyName')
                }
                if (companyType.length === 0) {
                    error = true
                    handleError('Please select company type', 'companyType')
                }
                if (companyIndustry.length === 0) {
                    error = true
                    handleError('Please select company industry', 'companyIndustry')
                }
                if (companyDescp.length === 0) {
                    error = true
                    handleError('Please select company description', 'companyDescp')
                }
            }

            if (step === 4) {
                const currentSum = memberData.reduce((sum, member) => sum + parseFloat(member.ownership || 0), 0)
                const totalMemberShip = parseInt(memberOwnership) + parseInt(currentSum)
                console.log('totalMemberShip: ', totalMemberShip)

                if (memberFirstName.length == 0) {
                    error = true;
                    handleError('Please add first name', 'memberFirstName');
                }
                if (memberOwnership.length == 0) {
                    error = true;
                    handleError('Please add at ownership', 'memberOwnership');
                }
                if (totalMemberShip !== 100) {
                    error = true
                    setOwnershipError(true)
                }
            }

            if (step === 5) {
                if (legalFirstName.length === 0) {
                    error = true
                    handleError('Please enter first name', 'legalFirstName')
                }
                if (legalLastName.length === 0) {
                    error = true
                    handleError('Please enter last name', 'legalLastName')
                }
                if (legalEmail.length === 0) {
                    error = true
                    handleError('Please enter email', 'legalEmail')
                }
                if (legalMobileNo.length === 0) {
                    error = true
                    handleError('Please enter mobile no.', 'legalMobileNo')
                }
            }

            if (step === 6) {
                if (country.length === 0) {
                    error = true
                    handleError('Please enter country', 'country')
                }
                if (state.length === 0) {
                    error = true
                    handleError('Please enter state', 'state')
                }
                if (city.length === 0) {
                    error = true
                    handleError('Please enter city', 'city')
                }
                if (zipCode.length === 0) {
                    error = true
                    handleError('Please enter zipcode', 'zipCode')
                }
                if (address.length === 0) {
                    error = true
                    handleError('Please enter address', 'address')
                }
            }

            return error
        }

        const handleStateSelect = (event, newValue) => {
            setSelectedState(newValue);
            setOrderAmount(newValue.fee);
            dispatch({ type: 'RESET_STATE' });
            dispatch({ type: 'ADD_SERVICE', payload: [newValue.label, newValue.fee] })
        }

        // const handleNext = () => {
        //     setStep(step + 1);
        // };

        const handleNext = () => {
            if (!validation()) {
                setStep(step + 1);
            }
        };

        const handlePrevious = () => {
            setStep(step - 1);
        };

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            // handle form submission
        };

        const states = [
            { label: "Wyoming (Top Choice Overall)", fee: 102 },
            { label: "Florida (Ideal for E-commerce)", fee: 125 },
            { label: "Texas (Great for Amazon Sellers)", fee: 300 },
            { label: "Montana (Most Affordable)", fee: 35 },
            { label: "Delaware (Prime for Startups)", fee: 140 },

            { label: 'Alabama', fee: 236 },
            { label: 'Alaska', fee: 250 },
            { label: 'Arizona', fee: 85 },
            { label: 'Arkansas', fee: 45 },
            { label: 'California', fee: 70 },
            { label: 'Colorado', fee: 50 },
            { label: 'Connecticut', fee: 120 },
            { label: 'District of Columbia', fee: 99 },
            { label: 'Georgia', fee: 100 },
            { label: 'Hawaii', fee: 51 },
            { label: 'Idaho', fee: 101 },
            { label: 'Illinois', fee: 153 },
            { label: 'Indiana', fee: 97 },
            { label: 'Iowa', fee: 50 },
            { label: 'Kansas', fee: 166 },
            { label: 'Kentucky', fee: 40 },
            { label: 'Louisiana', fee: 105 },
            { label: 'Maine', fee: 175 },
            { label: 'Maryland', fee: 155 },
            { label: 'Massachusetts', fee: 520 },
            { label: 'Michigan', fee: 50 },
            { label: 'Minnesota', fee: 155 },
            { label: 'Mississippi', fee: 53 },
            { label: 'Missouri', fee: 50 },
            { label: 'Nebraska', fee: 102 },
            { label: 'Nevada', fee: 425 },
            { label: 'New Hampshire', fee: 102 },
            { label: 'New Jersey', fee: 129 },
            { label: 'New Mexico', fee: 50 },
            { label: 'New York', fee: 205 },
            { label: 'North Carolina', fee: 128 },
            { label: 'North Dakota', fee: 135 },
            { label: 'Ohio', fee: 99 },
            { label: 'Oklahoma', fee: 104 },
            { label: 'Oregon', fee: 100 },
            { label: 'Pennsylvania', fee: 125 },
            { label: 'Rhode Island', fee: 156 },
            { label: 'South Carolina', fee: 125 },
            { label: 'South Dakota', fee: 150 },
            { label: 'Tennessee', fee: 307 },
            { label: 'Utah', fee: 56 },
            { label: 'Vermont', fee: 125 },
            { label: 'Virginia', fee: 100 },
            { label: 'Washington', fee: 200 },
            { label: 'West Virginia', fee: 130 },
            { label: 'Wisconsin', fee: 130 }
        ]

        const industryOptions = [
            "Accounting",
            "Advertising",
            "Agriculture",
            "Automotive",
            "Banking",
            "Biotechnology",
            "Chemicals",
            "Communications",
            "Construction",
            "Consulting",
            "Education",
            "Electronics",
            "Energy",
            "Engineering",
            "Entertainment",
            "Environmental",
            "Finance",
            "Food and Beverage",
            "Government",
            "Healthcare",
            "Hospitality",
            "Insurance",
            "IT/Technology",
            "Legal",
            "Manufacturing",
            "Media",
            "Non-profit",
            "Pharmaceuticals",
            "Real Estate",
            "Retail",
            "Telecommunications",
            "Transportation",
            "Travel",
            "Other"
        ]

        const countries = [
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
            "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
            "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
            "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia",
            "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
            "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
            "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras",
            "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
            "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
            "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
            "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
            "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan",
            "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
            "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
            "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
            "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
            "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
            "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
        ]

        const handleItin = (event) => {
            setItin(event.target.value)
            if (event.target.value == 'yes') {
                setIsItin(true)
            }
            else {
                setIsItin(false)
            }
        }

        const handleMemberDataChange = (index, field, value) => {
            const newData = [...memberData];
            newData[index][field] = value;
            setMemberData(newData);
            if (newData[index].ownership) {
                setOwnershipError(false)
            }
        }

        const handleAddMemberData = () => {
            setMemberData([...memberData, { firstname: '', lastname: '', ownership: '' }]);
        }

        const handlDeleteMember = (index) => {
            const newData = [...memberData];
            newData.splice(index, 1);
            setMemberData(newData);
        }

        const options = {
            key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
            amount: orderAmount * 100,
            currency: "INR",
            name: 'Boosty LLC',
            description: "Test Transaction",
            image: `${serverURL}/images/croma-logo.png`,

            handler: async function (response) {
                var formData = new FormData()
                formData.append('userid', userId)
                formData.append('companystate', selectedState.label)
                formData.append('companyname', companyName)
                formData.append('companytype', companyType)
                formData.append('companyindustry', companyIndustry)
                formData.append('companydescp', companyDescp)
                formData.append('companywebsite', companyWebsite)
                formData.append('userpassport', passport.bytes)
                formData.append('memberfirstname', memberFirstName)
                formData.append('memberlastname', memberLastName)
                formData.append('memberownership', memberOwnership)
                formData.append('legalfirstname', legalFirstName)
                formData.append('legallastname', legalLastName)
                formData.append('legalemail', legalEmail)
                formData.append('legalmobileno', legalMobileNo)
                formData.append('ein', '')
                formData.append('agentname', '')
                formData.append('agentaddress', '')
                formData.append('itin', itin)
                formData.append('isitin', isItin)
                formData.append('country', country)
                formData.append('state', state)
                formData.append('city', city)
                formData.append('address', address)
                formData.append('zipcode', zipCode)
                formData.append('paymentid', response.razorpay_payment_id)
                formData.append('companystatus', 'Pending')
                formData.append('orderamount', orderAmount)
                formData.append('orderdate', new Date())
                formData.append('membersdata', memberData)
                formData.append('addons', JSON.stringify(addons))
                formData.append('addonsorderdate', new Date())
                formData.append('useraccountemail', user[0].email)
                formData.append('useraccountname', `${user[0].firstname} ${user[0].lastname}`)

                var response = await postData('company/create-company', formData)
                setOrderConfirm(true)
                if (response.status === true) {
                    var body = { 'userid': userId, 'agent': 'False', 'address': 'False', 'formation': 'False', 'ein': 'False', 'boi': 'False', 'agreement': 'False', 'bank': 'False', }
                    var result = await postData('orderstatus/create-order-status', body)
                    if (result.status === true) {
                        setOrderConfirm(false)
                        navigate('/dashboard/order-successfull', { state: { title: 'Company formation' } })
                        window.scrollTo(0, 0)
                    }
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
            var error = validation()
            if (error === false) {
                handleRzrpPayment()
            }
        }

        return (

            <div>
                <Grid container spacing={1} style={{ width: '100%' }}>
                    <Grid item md={12}>
                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 25 }}>Register your Company</h3>
                        <p style={{ margin: 0, opacity: '70%', marginTop: '1%' }}>View company information and account details</p>
                    </Grid>
                </Grid>

                <Form onSubmit={handleSubmit} style={{ marginTop: '4%' }}>
                    <ProgressBar now={(step / 7) * 100} />
                    {step === 1 && (
                        <Form.Group as={Row} controlId="formStep1">
                            <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0, width: '100%' }}>
                                <Grid item md={12} style={{ marginBottom: '2%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Step: 1 What type of Company are you?</h3>
                                    <p style={{ marginTop: '1%', opacity: '60%' }}>Select the entity for your U.S company.</p>
                                </Grid>
                                <Grid item md={6} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '3%', padding: '4%', cursor: 'pointer', borderRadius: matches_md ? 10 : 15, background: '#F7F0FF', margin: matches_md ? '3% 0 6%' : '' }}>
                                    <img src='/images/company.svg' style={{ width: 50, height: 50 }} />
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>LLC</h3>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    )}
                    {step === 2 && (
                        <Form.Group as={Row} controlId="formStep2">
                            <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0, width: '100%' }}>
                                <Grid item xs={12} style={{ marginBottom: '2%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Step: 2 Select your State?</h3>
                                    <p style={{ marginTop: '1%', opacity: '80%' }}>Select a state in which you want to incorporate your company.</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ width: matches_md ? '100%' : '40%' }}>
                                        <Autocomplete
                                            disablePortal
                                            options={states}
                                            value={selectedState}
                                            onChange={handleStateSelect}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => <TextField variant='outlined' className={classes.roundedTextField} {...params} label="Select state" />}
                                        />
                                    </div>
                                    <p style={{ color: '#F4525C', fontSize: 13 }}>{selectedState ? '' : getErrors.selectedState}</p>
                                </Grid>
                                {
                                    selectedState ?
                                        <>
                                            <Grid item md={12} style={{ width: '100%', borderRadius: matches_md ? 10 : 20, background: '#F7F0FF', padding: matches_md ? '6%' : '3%', position: "relative", margin: '2% 0' }}>
                                                <div style={{ width: '60%' }}>
                                                    <div style={{ position: "absolute", padding: '1% 2%', borderRadius: 7, top: '10%', right: '2%', background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', width: 60, display: "flex", justifyContent: "center" }}>
                                                        <p style={{ marginTop: '2%', fontWeight: 600, fontSize: 20 }}>${selectedState.fee}</p>
                                                    </div>
                                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 20 : 22 }}>{selectedState.label}</h3>
                                                    <p style={{ marginTop: '2%', opacity: '80%' }}>State in U.S.A</p>
                                                </div>
                                            </Grid>
                                        </>
                                        :
                                        <></>
                                }
                                <Grid item xs={12}>
                                    <div style={{ width: matches_md ? '100%' : '60%' }}>
                                        <Alert icon={<DescriptionOutlinedIcon fontSize="inherit" />} severity="success">
                                            <font style={{ fontWeight: 500 }}>Wyoming</font> State filing is completed within 14-48 hours, normally!
                                        </Alert>
                                    </div>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    )}
                    {step === 3 && (
                        <Form.Group as={Row} controlId="formStep3">
                            <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0, width: '100%' }}>
                                <Grid item md={12} style={{ marginBottom: '2%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Step: 3 Tell us about your Company</h3>
                                </Grid>
                                <Grid item md={7} style={{ width: '100%' }}>
                                    <TextField
                                        value={companyName}
                                        error={getErrors.companyName}
                                        helperText={getErrors.companyName}
                                        onFocus={() => handleError('', 'companyName')}
                                        label='Company name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setCompanyName(e.target.value)} />
                                </Grid>
                                <Grid item md={5} style={{ width: '100%' }}>
                                    <FormControl className={classes.roundedTextField} fullWidth>
                                        <InputLabel>Type</InputLabel>
                                        <Select
                                            value={companyType}
                                            label="Company Type"
                                            onChange={handleCompanyTypeChange}
                                        >
                                            <MenuItem value={'LLC'}>LLC</MenuItem>
                                            <MenuItem value={'L.L.C.'}>L.L.C</MenuItem>
                                            <MenuItem value={'Limited Liability Company'}>Limited Liability Company</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <p style={{ color: '#F4525C', fontSize: 13 }}>{companyType ? '' : getErrors.companyType}</p>
                                </Grid>
                                <Grid item md={7} style={{ width: '100%' }}>
                                    <TextField value={companyWebsite}
                                        label='Website' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setCompanyWebsite(e.target.value)} />
                                </Grid>
                                <Grid item md={5} style={{ width: '100%' }}>
                                    <Autocomplete
                                        value={companyIndustry}
                                        disablePortal
                                        options={industryOptions}
                                        onChange={handleCompanyIndustry}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => <TextField variant='outlined' className={classes.roundedTextField} {...params} label="Select Industry" />}
                                    />
                                    <p style={{ color: '#F4525C', fontSize: 13 }}>{companyIndustry ? ' ' : getErrors.companyIndustry}</p>
                                </Grid>
                                <Grid item md={10} style={{ width: '100%' }}>
                                    <div style={{ padding: '4% 2%', border: '1px solid #8D8D8D', borderRadius: 12 }}>
                                        <TextField fullWidth
                                            value={companyDescp}
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                            placeholder='Company description' variant='standard' className={classes.roundedTextField} onChange={(e) => setCompanyDescp(e.target.value)} />
                                    </div>
                                    {/* <p style={{ margin: 0, fontSize: 14, opacity: '40%' }}>(min 50 char)</p> */}
                                    <p style={{ color: '#F4525C', fontSize: 13 }}>{companyDescp ? '' : getErrors.companyDescp}</p>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    )}
                    {step === 4 && (
                        <Form.Group as={Row} controlId="formStep4">
                            <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0, width: '100%' }}>
                                <Grid item xs={12} style={{ marginBottom: '2%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Step: 4 Who's the in charge?</h3>
                                    <p style={{ marginTop: '1%', opacity: '60%' }}>Let us know who all the owners of the company are along wth their percentage of holdings.</p>
                                </Grid>

                                <div style={{ display: 'flex', width: '100%' }}>
                                    <div style={{ width: '90%' }}>
                                        <Grid container spacing={3} style={{}}>
                                            <Grid item md={4} style={{ width: '100%' }}>
                                                <TextField
                                                    value={memberFirstName}
                                                    error={getErrors.memberFirstName}
                                                    helperText={getErrors.memberFirstName}
                                                    onFocus={() => handleError('', 'memberFirstName')}
                                                    onChange={(e) => setMemberFirstName(e.target.value)}
                                                    label='First name' variant='outlined' fullWidth className={classes.roundedTextField} />
                                            </Grid>
                                            <Grid item md={4} style={{ width: '100%' }}>
                                                <TextField
                                                    value={memberLastName}
                                                    error={getErrors.memberLastName}
                                                    helperText={getErrors.memberLastName}
                                                    onFocus={() => handleError('', 'memberLastName')}
                                                    onChange={(e) => setMemberLastName(e.target.value)}
                                                    label='Last name' variant='outlined' fullWidth className={classes.roundedTextField} />
                                            </Grid>
                                            <Grid item md={4} style={{ width: '100%' }}>
                                                <TextField
                                                    value={memberOwnership}
                                                    error={getErrors.memberOwnership}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                                        e.target.value = e.target.value.slice(0, 3);
                                                    }}
                                                    helperText={getErrors.memberOwnership}
                                                    onFocus={() => handleError('', 'memberOwnership')}
                                                    onChange={(e) => setMemberOwnership(e.target.value)}
                                                    label='Ownership' variant='outlined' fullWidth className={classes.roundedTextField} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>


                                {
                                    memberData.map((item, index) => {
                                        return (
                                            <div style={{ display: 'flex', width: '100%' }}>
                                                <div style={{ width: '90%' }}>
                                                    <Grid container spacing={3} style={{ marginTop: '2%' }}>
                                                        <Grid item md={4} style={{ width: '100%' }}>
                                                            <TextField
                                                                value={memberData[index].firstname}
                                                                //error={getErrors.state}
                                                                //helperText={getErrors.state}
                                                                //onFocus={() => handleError('', 'state')}
                                                                onChange={(e) => handleMemberDataChange(index, 'firstname', e.target.value)}
                                                                label='First name' variant='outlined' fullWidth className={classes.roundedTextField} />
                                                        </Grid>
                                                        <Grid item md={4} style={{ width: '100%' }}>
                                                            <TextField
                                                                value={memberData[index].lastname}
                                                                // error={getErrors.state}
                                                                // helperText={getErrors.state}
                                                                // onFocus={() => handleError('', 'state')}
                                                                onChange={(e) => handleMemberDataChange(index, 'lastname', e.target.value)}
                                                                label='Last name' variant='outlined' fullWidth className={classes.roundedTextField} />
                                                        </Grid>
                                                        <Grid item md={4} style={{ width: '100%' }}>
                                                            <TextField
                                                                value={memberData[index].ownership}
                                                                onInput={(e) => {
                                                                    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                                                    e.target.value = e.target.value.slice(0, 3);
                                                                }}
                                                                // error={getErrors.state}
                                                                // helperText={getErrors.state}
                                                                // onFocus={() => handleError('', 'state')}
                                                                onChange={(e) => handleMemberDataChange(index, 'ownership', e.target.value)}
                                                                label='Ownership' variant='outlined' fullWidth className={classes.roundedTextField} />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CloseOutlinedIcon style={{ opacity: '60%', cursor: 'pointer' }} onClick={() => handlDeleteMember(index)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                {
                                    ownershipError === true ?
                                        <>
                                            <Grid item md={12}>
                                                <p style={{ color: '#F4525C', fontSize: 13 }}>Total Ownership must be 100</p>
                                            </Grid>
                                        </>
                                        :
                                        <></>
                                }

                                <Grid item md={5}>
                                    <Button onClick={handleAddMemberData} style={{ color: '#8000ff' }} startIcon={<AddOutlinedIcon style={{ color: '#8000ff' }} />}>Add Member</Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    )}
                    {step === 5 && (
                        <Form.Group as={Row} controlId="formStep5">
                            <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0, width: '100%' }}>
                                <Grid item xs={12} style={{ marginBottom: '2%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Step: 5 About the Responsible party!</h3>
                                    <p style={{ marginTop: '1%', opacity: '60%' }}>This is the responsible person in Tax ID, Bank account etc</p>
                                </Grid>
                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={legalFirstName}
                                        error={getErrors.legalFirstName}
                                        helperText={getErrors.legalFirstName}
                                        onFocus={() => handleError('', 'legalFirstName')}
                                        label='First name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setLegalFirstName(e.target.value)} />
                                </Grid>

                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={legalLastName}
                                        error={getErrors.legalLastName}
                                        helperText={getErrors.legalLastName}
                                        onFocus={() => handleError('', 'legalLastName')}
                                        label='Last name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setLegalLastName(e.target.value)} />
                                </Grid>

                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={legalEmail}
                                        error={getErrors.legalEmail}
                                        helperText={getErrors.legalEmail}
                                        onFocus={() => handleError('', 'legalEmail')}
                                        label='Email' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setLegalEmail(e.target.value)} />
                                </Grid>

                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={legalMobileNo}
                                        error={getErrors.legalMobileNo}
                                        helperText={getErrors.legalMobileNo}
                                        onFocus={() => handleError('', 'legalMobileNo')}
                                        label='Mobile no.' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setLegalMobileNo(e.target.value)} />
                                </Grid>

                                <Grid item md={6} style={{ width: '100%' }}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label" style={{ color: '#8000ff' }}>Do you have SSN or ITIN?</FormLabel>
                                        <RadioGroup defaultValue="no" onChange={handleItin}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item md={6} style={{ width: '100%' }}>
                                    <Button
                                        onChange={handlePassport}
                                        fullWidth component='label'
                                        style={{
                                            border: '2px dotted gainsboro',
                                            fontWeight: '500',
                                            color: 'gray',
                                            padding: '3% 0'
                                        }}>
                                        <input type='file' hidden accept='*/*' />
                                        <AccountBoxIcon style={{ marginRight: '2%' }} />
                                        Your Passport
                                    </Button>
                                    <p style={{ color: '#53569A', fontWeight: 500 }}>{passport.bytes.name}</p>
                                </Grid>

                                {
                                    isItin ?
                                        <>
                                            <Grid item md={6} style={{ width: '100%' }}>
                                                <TextField
                                                    label='Enter SSN or ITIN.' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setItin(e.target.value)} />
                                            </Grid>
                                        </>
                                        :
                                        <></>
                                }
                            </Grid>
                        </Form.Group>
                    )}
                    {step === 6 && (
                        <Form.Group as={Row} controlId="formStep6">
                            <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0, width: '100%' }}>
                                <Grid item md={12} style={{ marginBottom: '2%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Step: 6 Mailing Address</h3>
                                    <p style={{ marginTop: '1%', opacity: '80%' }}>Let us know who all the owners of the company are along wth their percentage of holdings.</p>
                                </Grid>
                                <Grid item md={6} style={{ width: '100%' }}>
                                    <Autocomplete
                                        fullWidth
                                        value={country}
                                        disablePortal
                                        options={countries}
                                        onChange={handleCountryChange}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => <TextField variant='outlined' className={classes.roundedTextField} {...params} label="Select Country" />}
                                    />
                                    <p style={{ color: '#F4525C', fontSize: 13 }}>{country ? '' : getErrors.country}</p>
                                </Grid>
                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={state}
                                        error={getErrors.state}
                                        helperText={getErrors.state}
                                        onFocus={() => handleError('', 'state')}
                                        label='State' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setState(e.target.value)} />
                                </Grid>
                                <Grid item md={12} style={{ width: '100%' }}>
                                    <TextField
                                        value={address}
                                        error={getErrors.address}
                                        helperText={getErrors.address}
                                        onFocus={() => handleError('', 'address')}
                                        label='Address' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setAddress(e.target.value)} />
                                </Grid>
                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={city}
                                        error={getErrors.city}
                                        helperText={getErrors.city}
                                        onFocus={() => handleError('', 'city')}
                                        label='City' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setCity(e.target.value)} />
                                </Grid>
                                <Grid item md={6} style={{ width: '100%' }}>
                                    <TextField
                                        value={zipCode}
                                        error={getErrors.zipCode}
                                        helperText={getErrors.zipCode}
                                        onFocus={() => handleError('', 'zipCode')}
                                        label='Zip code' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setZipCode(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} style={{ width: '100%' }}>
                                    <div style={{ width: matches_md ? '100%' : '60%' }}>
                                        <Alert icon={<FmdGoodOutlinedIcon fontSize="inherit" />} severity="success">
                                            You can enter any <font style={{ fontWeight: 500 }}> Address</font> and it doesn't have to be in the U.S.
                                        </Alert>
                                    </div>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    )}
                    {step === 7 && (
                        <Form.Group as={Row} controlId="formStep7">
                            <Cart
                                refresh={refresh}
                                setRefresh={setRefresh}
                                screen="Registeration"
                                companyName={companyName}
                                companyState={selectedState.label}
                                stateFee={selectedState.fee}
                                companyType={companyType}
                                legalFirstName={legalFirstName}
                                legalLastName={legalLastName}
                                legalEmail={legalEmail}
                                legalMobileNo={legalMobileNo}
                                country={country}
                                state={state}
                                city={city}
                                zipCode={zipCode}
                                address={address}
                                orderAmount={orderAmount}
                                setOrderAmount={setOrderAmount}
                                addons={addons}
                            />
                            <Grid container spacing={0} style={{ marginTop: '5%' }}>
                                <Grid item md={12}>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: 22 }}>
                                        Add addons services for your company
                                    </h3>
                                    <p style={{ margin: 0, opacity: '70%', marginTop: '1%' }}>
                                        We're happy to handle the paperwork for you
                                    </p>
                                </Grid>
                            </Grid>
                            <AddonsSlider setRefresh={setRefresh} refresh={refresh} />
                        </Form.Group>
                    )}
                    <Row>
                        <Grid container spacing={3}>
                            <Grid item md={12} style={{ width: '100%' }}>
                                {step > 1 && (
                                    <Button variant="outlined" onClick={handlePrevious} style={{ width: matches_md ? '100%' : '', border: '2px solid #8000ff', color: '#8000ff', borderRadius: matches_md ? 5 : 10, marginTop: matches_md ? '10%' : '2%', padding: matches_md ? '3% 6%' : '1% 2%' }}>
                                        Previous
                                    </Button>
                                )}
                                {step < 7 ? (
                                    <Button variant="contained" onClick={handleNext} style={{ width: matches_md ? '100%' : '', boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, marginTop: matches_md ? '2%' : '2%', marginLeft: matches_md ? '' : '1%', color: 'white', padding: matches_md ? '3% 6%' : '1% 2%' }}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit" onClick={handleSubmitForm} style={{ width: matches_md ? '100%' : '', boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, marginTop: matches_md ? '2%' : '2%', marginLeft: matches_md ? '' : '1%', color: 'white', padding: matches_md ? '3% 6%' : '1% 2%' }}>
                                        Proceed to Payment
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Row>
                </Form>
            </div >
        );
    };

    return (
        <div>
            {
                orderConfirm ?
                    <>
                        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src='/images/boosty-app-logo.svg' style={{ width: 150 }} />
                            <p style={{ marginTop: '2%', opacity: '70%' }}>Your order is being placed...</p>
                            <div style={{ width: 250, marginTop: '2%' }}>
                                <LinearProgress color="primary" />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div style={{ width: matches_md ? '100%' : '60%', marginBottom: '3%' }}>
                            <Alert icon={<ErrorOutlineOutlinedIcon fontSize="inherit" />} severity="warning">
                                <font style={{ fontWeight: 500 }}>Do not refresh</font> the page untill the registeration form is completed!
                            </Alert>
                        </div>
                        <div style={{ width: matches_md ? '90%' : '95%', margin: 'auto', boxShadow: '3px 3px 20px #ededed', padding: matches_md ? '6%' : '3%', background: 'white', borderRadius: 10 }}>
                            {registerCompanyComponent()}
                        </div>
                    </>
            }
        </div>
    )
}
