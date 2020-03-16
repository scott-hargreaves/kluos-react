import React from 'react';

import LandUseDialog from './dialog/LandUseDialog';
import MapContainer from '../containers/Map';
import QueryContainer from '../containers/Query';

import Avatar from './Avatar';
import SearchTextField from './SearchTextField';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import EditorMap from "../containers/EditorMap";

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        position: 'absolute',
        left: '16px',
        top: '-4px',
        width: '144px',
        transform: 'rotate(-10deg)'
    },
    title: {
        flex: 1,
        marginLeft: '160px'
    },
    mapBox: {
        position: 'absolute',
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
    },
    searchBox: {

    }
});

class Dashboard extends React.Component {

    handleDialogClose = ( ) => {
        this.props.setLandUseEditing(null);
    };

    handleOnSubmit = ( evt ) => {
        this.props.runSimpleQuery( evt.value );
    };

    render() {
        const { classes, user, landUseId, editable } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>

                <AppBar position="fixed" className={classes.appBar} color="primary">
                    <img src="/img/katzie_logo-blwhol.png" alt="Katzie First Nation" className={ classes.logo }/>

                    <Toolbar>
                        <Typography className={classes.title} variant="h5" noWrap>
                            <Box fontWeight="fontWeightMedium">Katzie Land Use & Occupancy Study</Box>
                        </Typography>

                        <SearchTextField
                            onSubmit={ this.handleOnSubmit }
                        />
                        <Avatar
                            user={ user }
                        />

                    </Toolbar>

                </AppBar>

                <Box className={ classes.mapBox }>
                    <MapContainer
                        key="mainMap"
                        name="mainMap"
                    />
                </Box>

                <Box className={ classes.searchBox }>
                    { <QueryContainer /> }
                </Box>

                <LandUseDialog
                    fullWidth={ true }
                    maxWidth="lg"
                    editable={ editable }
                    open={ Boolean( landUseId )}
                />

            </div>
        )
    }

}

export default withStyles(styles)(Dashboard);

