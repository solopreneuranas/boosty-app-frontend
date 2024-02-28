import { Grid, Button, Typography } from "@material-ui/core";

export default function FormSidebar(props) {
    return (
        <div style={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <img src='/images/boosty-app-logo.svg' style={{ width: 150 }} />
                </Grid>
                <Grid item md={12} style={{ marginTop: '5%' }}>
                    <img src='/images/login-image.png' style={{ width: '100%' }} />
                    <Typography style={{ fontWeight: '600', fontSize: 26 }}>{props.title}</Typography>
                    <p style={{ marginTop: '6%', opacity: '70%', fontSize: '14px' }}>{props.para}</p>
                    <Typography style={{ marginTop: '15%', fontWeight: '600', fontSize: '16px' }}>{props.subTitle}</Typography>
                    <p style={{ marginTop: '2%', opacity: '70%', fontSize: '14px' }}>{props.subPara}</p>
                </Grid>
            </Grid>
        </div>
    )
}