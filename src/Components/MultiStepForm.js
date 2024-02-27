import React, { useState } from 'react';
import { Form, ProgressBar, Row, Col } from 'react-bootstrap';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  roundedTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 12
    },
  },
}))

export default function MultiStepForm(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [password, setPassword] = useState('')
  const [getErrors, setErrors] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleNext = () => {
    setStep(step + 1);
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

  const handleClick = () => {
    alert(JSON.stringify(formData));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const handleError = (error, label) => {
    props.setErrors((prev) => ({ ...prev, [label]: error }))
  }

  const validation = () => {
    var error = false
    if (firstName.length === 0) {
      error = true
      handleError('Please enter name', 'firstName')
    }
    if (email.length === 0) {
      error = true
      handleError('Please enter email', 'email')
    }
    if (mobileNo.length === 0) {
      error = true
      handleError('Please enter mobile no.', 'mobile no.')
    }
    if (password.length === 0) {
      error = true
      handleError('Please enter password', 'password')
    }
    return error
  }


  return (
    <Form onSubmit={handleSubmit}>
      <ProgressBar now={(step / 3) * 100} />
      {step === 1 && (
        <Form.Group as={Row} controlId="formStep1">
          <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0 }}>
            <Grid item xs={6}>
              <TextField
                error={getErrors.firstName}
                helperText={getErrors.firstName}
                onFocus={() => handleError('', 'firstName')}
                label='First name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setFirstName(e.target.value)} />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label='Last name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setLastName(e.target.value)} />
            </Grid>
          </Grid>
        </Form.Group>
      )}
      {step === 2 && (
        <Form.Group as={Row} controlId="formStep2">
          <Grid container spacing={3} style={{ background: '', padding: 0, margin: 0 }}>
            <Grid item xs={12}>
              <TextField
                error={getErrors.email}
                helperText={getErrors.email}
                onFocus={() => handleError('', 'firstName')}
                label='First name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
          </Grid>
        </Form.Group>
      )}
      {step === 3 && (
        <Form.Group as={Row} controlId="formStep3">
          <Form.Label column sm={2}>
            Message
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
      )}
      <Row>
        <Grid container spacing={3}>
          <Grid item md={12}>
            {step > 1 && (
              <Button variant="secondary" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button variant="contained" onClick={handleNext} style={{ boxShadow: 'none', background: '#004cef', borderRadius: 10, marginTop: '2%', marginLeft: '3%', color: 'white', padding: '2% 6%' }}>
                Next
              </Button>
            ) : (
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Row>
    </Form>
  );
};
