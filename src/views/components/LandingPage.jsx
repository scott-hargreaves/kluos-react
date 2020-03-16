import React from 'react';

import DashboardContainer from '../containers/Dashboard';
import SigninPageComponent from './SigninPage';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh',
    },
});

class UserDashboard extends React.Component {

    render() {
        const { classes, session } = this.props;

        return (
            <div className={classes.root}>
                { session.user.identifier ?
                    <DashboardContainer /> :
                    <SigninPageComponent errorMessage={ session.errorMessage } />
                }
            </div>
        )
    }

}

export default withStyles(styles)(UserDashboard);