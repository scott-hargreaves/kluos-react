import React from 'react';

import Avatar           from '@material-ui/core/Avatar';
import Box              from '@material-ui/core/Box';
import Button           from '@material-ui/core/Button';
import Checkbox         from '@material-ui/core/Checkbox';
import CssBaseline      from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid             from '@material-ui/core/Grid';
import Paper            from '@material-ui/core/Paper';
import TextField        from '@material-ui/core/TextField';
import Typography       from '@material-ui/core/Typography';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Alert from '@material-ui/lab/Alert';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        height: '100vh',
        backgroundColor: 'black'
    },
    image: {
        backgroundImage: 'url(/img/background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    logo: {
        position: 'absolute',
        left: '0px',
        top: '-4px',
        width: '144px',
        transform: 'rotate(-10deg)'
    },
    title: {
        color: theme.palette.primary.contrastText
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    alert: {
        marginTop: 16,
        padding: ' 2px 16px',
    },
    alertMessage: {
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class SigninPage extends React.Component {


    render() {
        const { classes, errorMessage } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="left"
                        justify="center"
                        style={{ minHeight: '30vh'}}
                    >
                        <Grid item xs={12} style={{marginLeft:'64px',paddingLeft:'152px',position:'relative'}}>
                            <img src="/img/katzie_logo-blwhol.png" alt="Katzie First Nation" className={classes.logo} />
                            <Typography component="h1" variant="h3" className={classes.title}>
                                <Box fontWeight="fontWeightMedium">
                                    Katzie First Nation
                                </Box>
                            </Typography>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                <Box>
                                    Land Use & Occupancy Study
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form action="/session/signin" method="POST" className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="username"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox name="remember-me" value="on" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>

                        {errorMessage &&
                            <Alert severity="error" variant="filled" classes={ {root: classes.alert, message: classes.alertMessage }}>{errorMessage}</Alert>
                        }
                    </div>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(SigninPage);

