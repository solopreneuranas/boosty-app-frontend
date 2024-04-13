import { Grid, Button, TextField, CircularProgress } from "@material-ui/core";
import { serverURL, postData } from "../../../Services/FetchNodeServices";
import { useState, useEffect } from "react";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useLocation } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from "react";
import Swal from 'sweetalert2'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function CompanyDetails(props) {

    var navigate = useNavigate()
    const classes = useStyles();
    var location = useLocation()
    var company = location?.state?.company
    // let orderStatus = location?.state?.orderStatus

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    var admin = JSON.parse(localStorage.getItem("Admin"))
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    // const membersDataArray = JSON.parse(company.membersdata)
    const [membersDataArray, setMembersDataArray] = useState(Array.isArray(company.membersdata) ? company.membersdata : []);
    const [doc, setDoc] = useState({ bytes: '', filename: '' })
    const [status, setStatus] = useState(false)
    const [documents, setDocuments] = useState([])
    const [open, setOpen] = React.useState(false);
    const [openMail, setOpenMail] = React.useState(false);

    const [docTitle, setDocTitle] = useState('')
    const [docDescp, setDocDescp] = useState('')
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setDocTitle('')
        setDoc({ bytes: '', filename: '' })
    }

    const [mailBtnStatus, setMailBtnStatus] = useState(false)
    const [mailSender, setMailSender] = useState('')
    const [mailType, setMailType] = useState('')
    const [mail, setMail] = useState({ bytes: '', filename: '' })
    const handleOpenMail = () => setOpenMail(true);
    const [mails, setMails] = useState([])

    const handleCloseMail = () => {
        setOpenMail(false)
        setMailSender('')
        setMailType('')
        setMail({ bytes: '', filename: '' })
    };

    const [userData, setUserData] = useState([])
    const [companyStatus, setCompanyStatus] = useState(company.companystatus)
    const [ein, setEin] = useState(company.ein)
    const [passport, setPassport] = useState({ bytes: '', filename: '' })
    const [legalFirstName, setLegalFirstName] = useState(company.legalfirstname)
    const [legalLastName, setLegalLastName] = useState(company.legallastname)
    const [legalEmail, setLegalEmail] = useState(company.legalemail)
    const [legalMobileNo, setLegalMobileNo] = useState(company.legalmobileno)
    const [selectedState, setSelectedState] = useState(company.companystate)
    const [companyName, setCompanyName] = useState(company.companyname)
    const [companyType, setCompanyType] = useState(company.companytype)
    const [companyWebsite, setCompanyWebsite] = useState(company.companywebsite)
    const [companyIndustry, setCompanyIndustry] = useState(company.companyindustry)
    const [companyDescp, setCompanyDescp] = useState(company.companydescp)
    const [itin, setItin] = useState(company.itin)
    const [agentName, setAgentName] = useState(company.agentname)
    const [agentAddress, setAgentAddress] = useState(company.agentaddress)
    const [isItin, setIsItin] = useState(false)
    const [country, setCountry] = useState(company.country)
    const [state, setState] = useState(company.state)
    const [address, setAddress] = useState(company.address)
    const [city, setCity] = useState(company.city)
    const [zipCode, setZipCode] = useState(company.zipcode)
    const [memberFirstName, setMemberFirstName] = useState(company.memberfirstname)
    const [memberLastName, setMemberLastName] = useState(company.memberlastname)
    const [memberOwnership, setMemberOwnership] = useState(company.memberownership)
    const [loading, setLoading] = useState(false)

    let companyStatusObj = company?.orderStatus[0]

    const [agentStatus, setAgentStatus] = useState(companyStatusObj?.agent)
    const [addressStatus, setAddressStatus] = useState(companyStatusObj?.address)
    const [formationStatus, setFormationStatus] = useState(companyStatusObj?.formation)
    const [einStatus, setEinStatus] = useState(companyStatusObj?.ein)
    const [boiStatus, setBoiStatus] = useState(companyStatusObj?.boi)
    const [agreementStatus, setAgreementStatus] = useState(companyStatusObj?.agreement)
    const [bankStatus, setBankStatus] = useState(companyStatusObj?.bank)

    const [memberData, setMemberData] = useState([
        {
            'firstname': '',
            'lastname': '',
            'ownership': ''
        }
    ])

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

    const style = {
        position: 'absolute',
        top: '50%',
        borderRadius: 3,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 10,
        p: 4,
    };

    const fetchDocumentsByUser = async () => {
        var body = { 'userid': company.userid }
        var response = await postData('document/display_all_documents_by_user', body)
        if (response.status === true) {
            setDocuments(response.data)
        }
    }

    const fetchMailsByUser = async () => {
        var body = { 'userid': company.userid }
        var response = await postData('mailroom/display_all_mails_by_user', body)
        if (response.status === true) {
            setMails(response.data)
        }
    }

    const fetchUserDetailsByCompany = async () => {
        var body = { 'userid': company.userid }
        var response = await postData('company/display_user_details_by_company', body)
        if (response.status === true) {
            setUserData(response.data)
        }
    }

    useEffect(() => {
        fetchDocumentsByUser()
        fetchMailsByUser()
        fetchUserDetailsByCompany()
        // fetchOrderStatus()
    }, [])

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleUpdateCompanyDetails = async () => {
        setLoading(true)
        var body = {
            '_id': company._id,
            'companyname': companyName,
            'companytype': companyType,
            'companyindustry': companyIndustry,
            'companydescp': companyDescp,
            'companywebsite': companyWebsite,
            'memberfirstname': memberFirstName,
            'memberlastname': memberLastName,
            'memberownership': memberOwnership,
            'membersdata': membersDataArray,
            'legalfirstname': legalFirstName,
            'legallastname': legalLastName,
            'legalemail': legalEmail,
            'legalmobileno': legalMobileNo,
            'agentname': agentName,
            'agentaddress': agentAddress,
            'ein': ein,
            'itin': itin,
            'isitin': isItin,
            'country': country,
            'state': state,
            'city': city,
            'address': address,
            'zipcode': zipCode,
            'companystatus': companyStatus,
        }
        var response = await postData('company/update-company', body)
        if (response.status === true) {
            setLoading(false)
            Swal.fire({
                icon: 'success',
                toast: true,
                timer: 2000,
                title: 'Company details updated!'
            })
        }
        else {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Company details not updated!'
            })
        }
    }

    const handleUpdateCompanyStatus = async () => {
        setLoading(true)
        var body = {
            '_id': companyStatusObj?._id,
            'userid': company.userid,
            'agent': agentStatus,
            'address': addressStatus,
            'formation': formationStatus,
            'ein': einStatus,
            'boi': boiStatus,
            'agreement': agreementStatus,
            'bank': bankStatus,
        }
        var response = await postData('orderstatus/update-order-status', body)
        if (response.status === true) {
            setLoading(false)
            Swal.fire({
                icon: 'success',
                toast: true,
                timer: 2000,
                title: 'Company details updated!'
            })
        }
        else {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Company details not updated!'
            })
        }
    }

    var date = new Date(company.orderdate)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate().toString().padStart(2, '0')
    var formattedDate = `${day} ${months[month]} ${year}`

    var addonsDate = new Date(company.addonsorderdate)
    var addonsYear = addonsDate.getFullYear()
    var addonsMonth = addonsDate.getMonth()
    var addonsDay = addonsDate.getDate().toString().padStart(2, '0')
    var addonsFormattedDate = `${addonsDay} ${months[addonsMonth]} ${addonsYear}`

    const gradientText = {
        background: 'linear-gradient(to right, blue, #8000ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        display: ' inline-block',
        fontSize: 22,
        margin: '5% 0',
        fontWeight: 600
    }

    const gradientIcon = {
        color: 'gray'
    }

    function handleDoc(event) {
        setDoc({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        setStatus(true)
    }

    function handleMail(event) {
        setMail({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        setMailBtnStatus(true)
    }

    const handleUploadDocument = async () => {
        var formData = new FormData()
        formData.append('companyid', company._id)
        formData.append('userid', company.userid)
        formData.append('name', docTitle)
        formData.append('description', docDescp)
        formData.append('documents', doc.bytes)
        formData.append('docdate', new Date())
        var response = await postData('document/create-document', formData)
        if (response.status === true) {
            fetchDocumentsByUser()
            Swal.fire({
                icon: 'success',
                toast: true,
                title: 'Uploaded successful!',
                timer: 2000
            })
            setDocTitle('')
            setDocDescp('')
            setDoc({ bytes: '', filename: '' })
        }
        else {
            alert('failed')
        }
    }

    const handleUploadMail = async () => {
        var formData = new FormData()
        formData.append('userid', company.userid)
        formData.append('companyid', company._id)
        formData.append('sender', mailSender)
        formData.append('mailtype', mailType)
        formData.append('mail', mail.bytes)
        formData.append('maildate', new Date())
        var response = await postData('mailroom/create-mail', formData)
        if (response.status === true) {
            fetchMailsByUser()
            Swal.fire({
                icon: 'success',
                toast: true,
                title: 'Mail Uploaded successful!',
                timer: 2000
            })
        }
        else {
            alert('failed')
        }
    }

    const uploadDocumentModal = () => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Upload New Document
                    </Typography>
                    <Grid item md={12} style={{ margin: '5% 0' }}>
                        <TextField fullWidth value={docTitle} onChange={(e) => setDocTitle(e.target.value)} variant="outlined" label="Document Name" />
                    </Grid>
                    <Grid item md={12} style={{ margin: '5% 0' }}>
                        <TextField fullWidth value={docDescp} onChange={(e) => setDocDescp(e.target.value)} variant="outlined" label="Document Description" />
                    </Grid>
                    <Button
                        onChange={handleDoc} component="label" variant="outlined" startIcon={<CloudUploadIcon />}
                        style={{ border: '1px solid gray', padding: '3%', fontWeight: '500', color: 'gray' }}>
                        Upload Document
                        <input hidden type="file" accept="*/*" />
                    </Button>
                    <p style={{ color: '#53569A', fontWeight: 500, marginTop: '1%' }}>{doc.bytes.name}</p>
                    {
                        status ?
                            <>
                                <Grid item xs={3}>
                                    <Button onClick={handleUploadDocument} variant='contained' style={{ width: 150, background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', padding: '8% 9%', margin: '5% 2% 0', boxShadow: 'none' }}>
                                        Upload
                                    </Button>
                                </Grid>
                            </>
                            :
                            <></>
                    }
                </Box>
            </Modal>
        )
    }

    const uploadMailModal = () => {
        return (
            <Modal
                open={openMail}
                onClose={handleCloseMail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Upload New Mail
                    </Typography>
                    <Grid item md={12} style={{ margin: '5% 0' }}>
                        <TextField fullWidth value={mailSender} onChange={(e) => setMailSender(e.target.value)} variant="outlined" label="Mail Sender" />
                    </Grid>
                    <Grid item md={12} style={{ margin: '5% 0' }}>
                        <TextField fullWidth value={mailType} onChange={(e) => setMailType(e.target.value)} variant="outlined" label="Mail Type" />
                    </Grid>
                    <Button
                        onChange={handleMail} component="label" variant="outlined" startIcon={<CloudUploadIcon />}
                        style={{ border: '1px solid gray', padding: '3%', fontWeight: '500', color: 'gray' }}>
                        Upload Mail
                        <input hidden type="file" accept="*/*" />
                    </Button>
                    <p style={{ color: '#53569A', fontWeight: 500, marginTop: '1%' }}>{mail.bytes.name}</p>
                    {
                        mailBtnStatus ?
                            <>
                                <Grid item xs={3}>
                                    <Button onClick={handleUploadMail} variant='contained' style={{ width: 150, background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', padding: '8% 9%', margin: '5% 2% 0', boxShadow: 'none' }}>
                                        Upload
                                    </Button>
                                </Grid>
                            </>
                            :
                            <></>
                    }
                </Box>
            </Modal>
        )
    }

    const checkComponent = () => {
        return (
            <CheckCircleIcon style={gradientIcon} fontSize="medium" />
        )
    }

    const handleLoginAccount = async () => {
        var user = userData[0].userData[0]
        var body = { 'email': user.email, 'password': user.password }
        var response = await postData('user/login', body)
        if (response.status === true) {
            localStorage.setItem('User', JSON.stringify([user]))
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                timer: 2000,
                toast: true
            })
            navigate('/dashboard')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid credentails!'
            })
        }
    }

    const handleDownloadDoc = async (filename) => {
        const fileUrl = `${serverURL}/images/${filename}`
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const link = document.createElement('a')
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl);
    }

    const handleDownloadMail = async (filename) => {
        const fileUrl = `${serverURL}/images/${filename}`
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const link = document.createElement('a')
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl);
    }

    const handleDeleteDoc = async (item) => {
        Swal.fire({
            title: 'Do you want to delete the Document?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { '_id': item._id }
                var response = await postData('document/delete-document', body)
                fetchDocumentsByUser()
                Swal.fire('Document Deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Document not Deleted', '', 'info')
            }
        })
    }

    const handleDeleteMail = async (item) => {
        Swal.fire({
            title: 'Do you want to delete the Mail?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { '_id': item._id }
                var response = await postData('mailroom/delete-mail', body)
                fetchMailsByUser()
                Swal.fire('Mail Deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Mail not Deleted', '', 'info')
            }
        })
    }

    const companyAddons = () => {
        let companyAddonsArray = [];

        try {
            if (company.addons) {
                companyAddonsArray = JSON.parse(company.addons);
            }
        } catch (error) {
            console.error('No company addons:', error);
        }

        return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: '100%', gap: '2%', justifyContent: "right" }}>
                {
                    companyAddonsArray.map((item, i) => (
                        <div style={{ marginTop: '2%', display: "flex", justifyContent: "right", textAlign: "left" }} key={i}>
                            <div style={{ borderRadius: 50, padding: '10px 20px', fontSize: 14, background: '#F7F0FF' }}>{item.title}</div>
                        </div>
                    ))
                }
            </div>
        );
    }

    const handleDownloadPassport = async (filename) => {
        const fileUrl = `${serverURL}/images/${filename}`
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const link = document.createElement('a')
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl);
    }

    const unChangeAbleCompanyInfo = [
        {
            title: 'Passport',
            para: 'Download Passport'
        },
        {
            title: 'Order Date',
            para: formattedDate
        },
        {
            title: 'Addons',
            para: company.addons.length == 0 ? 'N/A' : companyAddons()
        },
        {
            title: 'Addons Oder Date',
            para: company.addonsorderdate ? addonsFormattedDate : 'N/A'
        }
    ]

    const handleCompanyTypeChange = (event) => {
        setCompanyType(event.target.value);
    };

    const handleCompanyIndustry = (event, newValue) => {
        setCompanyIndustry(newValue)
    }

    const handleCompanyState = (event, newValue) => {
        setSelectedState(newValue)
    }
    console.log('companyState', selectedState);

    const handleCompanyStatusChange = (event) => {
        setCompanyStatus(event.target.value)
    }

    const handleIsItin = (event) => {
        setIsItin(event.target.value)
    }

    const handleDelete = async () => {
        Swal.fire({
            title: 'Do you want to delete the Company?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { '_id': company?._id }
                let response = await postData('company/delete_company', body)
                Swal.fire('Company Deleted!', '', 'success')
                navigate('/admindashboard/companies')
            } else if (result.isDenied) {
                Swal.fire('Company not Deleted', '', 'info')
            }
        })
    }

    const userCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Edit Company Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button variant="primary" type="submit" onClick={handleUpdateCompanyDetails} style={{ width: matches_md ? '100%' : '', boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, height: 50, marginTop: '2%', marginLeft: matches_md ? '' : '1%', color: 'white', padding: matches_md ? '3% 6%' : '1% 4%' }}>
                            Update Company
                            {loading ?
                                <CircularProgress style={{ color: 'white', marginLeft: 5 }} /> :
                                ''
                            }
                        </Button>
                        <Button onClick={handleLoginAccount} variant="outlined" style={{ width: matches_md ? '100%' : '', boxShadow: 'none', borderRadius: matches_md ? 5 : 10, marginTop: '2%', height: 50, marginLeft: matches_md ? '' : '1%', color: '#8000ff', padding: matches_md ? '3% 6%' : '1% 2%', border: '2px solid #8000ff' }}>
                            Login to Dashboard
                        </Button>
                        <Button onClick={handleDelete} variant="outlined" style={{ width: matches_md ? '100%' : '', boxShadow: 'none', borderRadius: matches_md ? 5 : 10, marginTop: '2%', height: 50, marginLeft: matches_md ? '' : '1%', color: 'red', padding: matches_md ? '3% 6%' : '1% 2%', border: '2px solid red' }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <h3 style={{ fontSize: matches_md ? 22 : 23, margin: '3% 0', fontWeight: 600, textTransform: "uppercase" }}>{company.companyname} {company.companytype}</h3>

                {/* /============================================= */}
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Company Name</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Name" onChange={(e) => setCompanyName(e.target.value)} className={classes.roundedTextField} value={companyName} variant="outlined" />

                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Company Status</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label="Status" onChange={(e) => setCompanyStatus(e.target.value)} className={classes.roundedTextField} value={companyStatus} variant="outlined" /> */}
                        <FormControl className={classes.roundedTextField} style={{ width: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={companyStatus}
                                label="Company Status"
                                onChange={handleCompanyStatusChange}
                            >
                                <MenuItem value={'Pending'}>Pending</MenuItem>
                                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                <MenuItem value={'Completed'}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />


                <Grid container spacing={0} style={{ display: "flex", alignItems: "center" }}>
                    <Grid item sm={9} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Company Industry</h3>
                    </Grid>
                    <Grid item sm={3}>
                        <Autocomplete
                            value={companyIndustry}
                            disablePortal
                            options={industryOptions}
                            onChange={handleCompanyIndustry}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField variant='outlined' className={classes.roundedTextField} {...params} label="Select Industry" />}
                        />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />


                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Formation State</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label="State" className={classes.roundedTextField} value={selectedState} variant="outlined" /> */}
                        <Autocomplete style={{ width: 340 }}
                            value={selectedState}
                            disablePortal
                            options={countries}
                            onChange={handleCompanyState}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField variant='outlined' className={classes.roundedTextField} {...params} label="Select State" />}
                        />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={9} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Entity Type</h3>
                    </Grid>
                    <Grid item sm={3} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
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
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Website</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Website" onChange={(e) => setCompanyWebsite(e.target.value)} className={classes.roundedTextField} value={companyWebsite} variant="outlined" />

                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Company Description</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Description" onChange={(e) => setCompanyDescp(e.target.value)} className={classes.roundedTextField} value={companyDescp} variant="outlined" />

                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />


                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>EIN</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="EIN" onChange={(e) => setEin(e.target.value)} className={classes.roundedTextField} value={ein} variant="outlined" />

                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />


                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>ITIN</h3>
                    </Grid>
                    {/* <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="true/false" onChange={(e) => setIsItin(e.target.value)} className={classes.roundedTextField} value={isItin} variant="outlined" />
                    </Grid> */}
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <FormControl className={classes.roundedTextField} style={{ width: 150 }}>
                            <InputLabel>Is ITIN</InputLabel>
                            <Select
                                value={isItin}
                                label="Is ITIN"
                                onChange={handleIsItin}
                            >
                                <MenuItem value={'true'}>True</MenuItem>
                                <MenuItem value={'false'}>False</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="ITIN" onChange={(e) => setItin(e.target.value)} className={classes.roundedTextField} value={itin} variant="outlined" style={{ marginLeft: '2%' }} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />


                {
                    unChangeAbleCompanyInfo.map((item, i) => {
                        return (
                            <div>
                                <Grid container spacing={0}>
                                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>{item.title}</h3>
                                    </Grid>
                                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                                        {
                                            item?.para === 'Download Passport' ?
                                                <Button variant="outlined" onClick={() => handleDownloadPassport(company?.userpassport)}>{item.para}</Button>
                                                :
                                                <p>{item.para}</p>
                                        }
                                    </Grid>
                                </Grid>

                                {unChangeAbleCompanyInfo.length - 1 === i ? <></> : <hr style={{ opacity: '30%' }} />}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const documentCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Documents</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '3%', marginTop: '1%' }}>
                    {
                        documents.map((item, i) => {
                            var docFormat = item.documents.split('.').pop().toUpperCase()
                            return (
                                <div style={{ width: matches_md ? '100%' : 200, height: 50, borderRadius: 10, background: '#f8f8f8', padding: matches_md ? '6%' : '4% 2%', position: "relative", marginTop: matches_md ? '4%' : '2%', border: '2px solid gainsboro' }}>
                                    <div onClick={() => handleDeleteDoc(item)} style={{ position: "absolute", padding: '1% 2%', bottom: '10%', right: '6%', cursor: "pointer" }}>
                                        <DeleteOutlineOutlinedIcon style={{ color: 'black', width: 30, height: 30 }} />
                                    </div>
                                    <div onClick={() => handleDownloadDoc(item.documents)} style={{ position: "absolute", padding: '1% 2%', borderRadius: 5, top: '10%', right: '6%', background: '#91edff', color: '#0293b0', width: 80, display: "flex", justifyContent: "center", alignItems: "center", gap: '4%', cursor: "pointer" }}>
                                        <GetAppOutlinedIcon style={{ color: '#0293b0' }} />
                                        {docFormat}
                                    </div>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: 17, width: '50%' }}>{item.name}</h3>
                                </div>
                            )
                        })
                    }
                </div>

                <Grid container spacing={0} style={{ marginTop: '2%' }}>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left' }}>
                        <Button
                            onClick={handleOpen} component="label" variant="outlined"
                            style={{ border: '1px solid gray', padding: '1% 3%', fontWeight: '500', color: 'gray' }}>
                            New Document
                        </Button>
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: '1%', display: "flex", alignItems: "center" }}>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const mailroomCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Mailroom</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '3%', marginTop: '1%' }}>
                    {
                        mails.map((item, i) => {
                            var mailFormat = item.mail.split('.').pop().toUpperCase()
                            return (
                                <div style={{ width: matches_md ? '100%' : 200, height: 50, borderRadius: 10, background: '#f8f8f8', padding: matches_md ? '6%' : '4% 2%', position: "relative", marginTop: matches_md ? '4%' : '2%', border: '2px solid gainsboro' }}>
                                    <div onClick={() => handleDeleteMail(item)} style={{ position: "absolute", padding: '1% 2%', bottom: '10%', right: '6%', cursor: "pointer" }}>
                                        <DeleteOutlineOutlinedIcon style={{ color: 'black', width: 30, height: 30 }} />
                                    </div>
                                    <div onClick={() => handleDownloadMail(item.mail)} style={{ position: "absolute", padding: '1% 2%', borderRadius: 5, top: '10%', right: '6%', background: '#91edff', color: '#0293b0', width: 80, display: "flex", justifyContent: "center", alignItems: "center", gap: '4%', cursor: "pointer" }}>
                                        <GetAppOutlinedIcon style={{ color: '#0293b0' }} />
                                        {mailFormat}
                                    </div>
                                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: matches_md ? 19 : 17, width: '50%' }}>{item.sender}</h3>
                                    <p style={{ opacity: '60%', fontSize: 14 }}>{item.mailtype}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <Grid container spacing={0} style={{ marginTop: '2%' }}>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left' }}>
                        <Button
                            onClick={handleOpenMail} component="label" variant="outlined"
                            style={{ border: '1px solid gray', padding: '1% 3%', fontWeight: '500', color: 'gray' }}>
                            New Mail
                        </Button>
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: '1%', display: "flex", alignItems: "center" }}>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const handleSwitch = (e, type) => {
        if (type === 'agent') {
            setAgentStatus(agentStatus === 'True' ? 'False' : 'True')
        }
        if (type === 'address') {
            setAddressStatus(addressStatus === 'True' ? 'False' : 'True')
        }
        if (type === 'formation') {
            setFormationStatus(formationStatus === 'True' ? 'False' : 'True')
        }
        if (type === 'ein') {
            setEinStatus(einStatus === 'True' ? 'False' : 'True')
        }
        if (type === 'boi') {
            setBoiStatus(boiStatus === 'True' ? 'False' : 'True')
        }
        if (type === 'agreement') {
            setAgreementStatus(agreementStatus === 'True' ? 'False' : 'True')
        }
        if (type === 'bank') {
            setBankStatus(bankStatus === 'True' ? 'False' : 'True')
        }
    }

    const orderStatusCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Order Status</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Registered Agent Assigned</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={agentStatus} onChange={(e) => setAgentStatus(e.target.value)} className={classes.roundedTextField} value={agentStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={agentStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'agent')} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Business Mailing Address Issued</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={orderStatus?.address} onChange={(e) => setAddressStatus(e.target.value)} className={classes.roundedTextField} value={addressStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={addressStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'address')} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Company Formation Completed</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={orderStatus?.formation} onChange={(e) => setFormationStatus(e.target.value)} className={classes.roundedTextField} value={formationStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={formationStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'formation')} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>EIN Successfully Processed</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={orderStatus?.ein} onChange={(e) => setEinStatus(e.target.value)} className={classes.roundedTextField} value={einStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={einStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'ein')} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>BOI Report Filed</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={orderStatus?.boi} onChange={(e) => setBoiStatus(e.target.value)} className={classes.roundedTextField} value={boiStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={boiStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'boi')} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Operating Agreement Prepared</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={orderStatus?.agreement} onChange={(e) => setAgreementStatus(e.target.value)} className={classes.roundedTextField} value={agreementStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={agreementStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'agreement')} />
                    </Grid>
                </Grid>


                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Business Bank Account Set Up</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        {/* <TextField label={orderStatus?.bank} onChange={(e) => setBankStatus(e.target.value)} className={classes.roundedTextField} value={bankStatus} variant="outlined" /> */}
                        <Switch {...label} defaultChecked={bankStatus === 'True' ? true : false} onChange={(e) => handleSwitch(e, 'bank')} />
                    </Grid>
                </Grid>

                <Button variant="primary" type="submit" onClick={handleUpdateCompanyStatus} style={{ width: matches_md ? '100%' : '', boxShadow: 'none', background: 'linear-gradient(to right, blue, #8000ff)', borderRadius: matches_md ? 5 : 10, height: 50, marginTop: '2%', color: 'white', padding: matches_md ? '3% 6%' : '1% 2%' }}>
                    Update Company Status
                    {loading ?
                        <CircularProgress style={{ color: 'white', marginLeft: 5 }} /> :
                        ''
                    }
                </Button>
            </div>
        )
    }

    const contactCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Contact Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />


                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Name</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="First name" onChange={(e) => setLegalFirstName(e.target.value)} className={classes.roundedTextField} value={legalFirstName} variant="outlined" />
                        <TextField label="Last name" onChange={(e) => setLegalLastName(e.target.value)} className={classes.roundedTextField} value={legalLastName} variant="outlined" style={{ marginLeft: '2%' }} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={2} style={{ padding: '2% 0' }}>
                    <Grid item sm={3} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Mailing Address</h3>
                    </Grid>
                    <Grid item sm={9} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Address" fullWidth onChange={(e) => setAddress(e.target.value)} className={classes.roundedTextField} value={address} variant="outlined" />
                        <TextField label="Zipcode" onChange={(e) => setZipCode(e.target.value)} className={classes.roundedTextField} value={zipCode} variant="outlined" style={{ marginLeft: '1%' }} />
                        <TextField label="City" onChange={(e) => setCity(e.target.value)} className={classes.roundedTextField} value={city} variant="outlined" style={{ marginLeft: '1%' }} />
                        <TextField label="State" onChange={(e) => setState(e.target.value)} className={classes.roundedTextField} value={state} variant="outlined" style={{ marginLeft: '1%' }} />
                        <TextField label="Country" onChange={(e) => setCountry(e.target.value)} className={classes.roundedTextField} value={country} variant="outlined" style={{ marginLeft: '1%' }} />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Email Address</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Email" onChange={(e) => setLegalEmail(e.target.value)} className={classes.roundedTextField} value={legalEmail} variant="outlined" />
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={{ margin: matches_md ? '16% 0' : '5% 0', fontWeight: 500, textTransform: "uppercase", opacity: '70%', fontSize: matches_md ? 14 : 15 }}>Mobile no</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Mobile no" onChange={(e) => setLegalMobileNo(e.target.value)} className={classes.roundedTextField} value={legalMobileNo} variant="outlined" />
                    </Grid>
                </Grid>
            </div>
        )
    }

    const agenctInfo = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Agent Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <Grid container spacing={0} style={{ marginTop: '2%' }}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <TextField label="Agent Name" className={classes.roundedTextField} value={agentName} onChange={(e) => setAgentName(e.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', textAlign: 'right', alignItems: "center" }}>
                        <TextField label="Agent Address" className={classes.roundedTextField} value={agentAddress} onChange={(e) => setAgentAddress(e.target.value)} variant="outlined" />
                    </Grid>
                </Grid>

            </div>
        )
    }

    const memberCompany = () => {
        return (
            <div style={{ background: 'white', borderRadius: 10, padding: matches_md ? '6%' : '3% 3% 5%', border: '1px solid gainsboro' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <h3 style={gradientText}>Members Info</h3>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 23, margin: '5% 0' }}>{checkComponent()}</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%' }} />

                <div>
                    <div style={{ border: '1px solid gainsboro', borderRadius: 10, padding: '1% 2%', marginTop: '3%' }}>
                        <Grid container spacing={0}>
                            <Grid item md={6} style={{ width: '50%', display: 'flex', justifyContent: 'left', flexDirection: 'row', gap: '4%', alignItems: "center" }}>
                                <div style={{ background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', borderRadius: '100%', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                    1
                                </div>
                                <TextField label="Fisrt name" onChange={(e) => setMemberFirstName(e.target.value)} className={classes.roundedTextField} value={memberFirstName} variant="outlined" />
                                <TextField label="Last name" onChange={(e) => setMemberLastName(e.target.value)} className={classes.roundedTextField} value={memberLastName} variant="outlined" />
                            </Grid>
                            <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', alignItems: "center" }}>
                                <p style={{ fontSize: 15, margin: '5% 0' }}>Ownership: </p>
                                <TextField label="Ownership" onChange={(e) => setMemberOwnership(e.target.value)} className={classes.roundedTextField} value={memberOwnership} variant="outlined" style={{ marginLeft: '2%' }} />
                            </Grid>
                        </Grid>
                    </div>
                    {
                        membersDataArray[0] ?
                            <>{allMembers()}</>
                            :
                            <></>
                    }
                </div>
            </div>
        )
    }

    const handleAllMembers = (e, i, type) => {
        const newArr = [...membersDataArray]
        newArr[i][type] = e.target.value
        setMembersDataArray(newArr)
    }

    const allMembers = () => {
        return membersDataArray.map((item, i) => {
            return (
                <div style={{ border: '1px solid gainsboro', borderRadius: 10, padding: '1% 2%', marginTop: '3%' }}>
                    <Grid container spacing={0}>
                        <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left', flexDirection: 'row', gap: '4%', alignItems: "center" }}>
                            <div style={{ background: 'linear-gradient(to right, blue, #8000ff)', color: 'white', borderRadius: '100%', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                {i + 2}
                            </div>
                            <TextField onChange={(e) => handleAllMembers(e, i, 'firstname')} label="First name" className={classes.roundedTextField} value={item.firstname} variant="outlined" />
                            <TextField onChange={(e) => handleAllMembers(e, i, 'lastname')} label="Last name" className={classes.roundedTextField} value={item.lastname} variant="outlined" />
                        </Grid>
                        <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right', alignItems: "center" }}>
                            <p style={{ fontSize: 15, margin: '5% 0' }}>Ownership: </p>
                            <TextField onChange={(e) => handleAllMembers(e, i, 'ownership')} label="Ownership" className={classes.roundedTextField} value={item.ownership} variant="outlined" style={{ marginLeft: '2%' }} />
                        </Grid>
                    </Grid>
                </div>
            )
        })
    }

    return (
        <div style={{ width: '97%', padding: '2% 3% 2% 1%' }}>

            <div style={{}}>
                {userCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {documentCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {mailroomCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {contactCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {orderStatusCompany()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {agenctInfo()}
            </div>

            <div style={{ marginTop: '3%' }}>
                {memberCompany()}
            </div>
            {uploadDocumentModal()}
            {uploadMailModal()}
        </div>
    )
}