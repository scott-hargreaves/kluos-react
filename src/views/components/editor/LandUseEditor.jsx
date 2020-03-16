import React                from 'react';

import LandUseFormComponent from './LandUseForm';
import SiteEditorContainer from '../../containers/SiteEditorContainer';

import Box              from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline      from '@material-ui/core/CssBaseline';
import Grid             from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { withStyles }   from '@material-ui/core';

import set from 'lodash/set';

const styles = theme => ({
    root: {
        minHeight: 240,
        overflowY: 'auto',
        height: '100%',
    },
    centerBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    loadingLabel: {
        display: 'inline-block',
        position: 'relative',
        top: 4
    },
    progress: {
        marginRight: 16,
        verticalAlign: 'middle'
    },
});



class LandUseEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        setTimeout(() => {
            this.props.fetchLandUse( this.props.landUseId );
        }, 1000);

    }

    cancel = ( ) => {
        this.props.cancelEditing();
    };

    save = ( ) => {
        this.props.updateLandUse( this.props.landUse );
    };

    handleOnPropertyChange = ( evt ) => {
        console.log(evt);
        set( this.props.landUse, evt.name, evt.value );
        if(this.props.onDirtyChange) this.props.onDirtyChange({ dirty: true });
    };

    render() {
        const { classes, landUse, editable } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <Box style={{
                    boxSizing: 'border-box',
                    height: '100%'
                }}>

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ height: '100%', whiteSpace: 'nowrap' }}
                    >
                        {
                            landUse ?
                                <Grid container style={{height:'100%'}}>

                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <LandUseFormComponent
                                            landUse={ landUse }
                                            editable={ editable }
                                            onPropertyChange={ this.handleOnPropertyChange }
                                        />

                                    </Grid>

                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Box style={{height:'100%', paddingLeft:8}}>
                                            <SiteEditorContainer
                                                sites={ landUse.sites }
                                            />
                                        </Box>

                                    </Grid>

                                </Grid> :
                                <Grid
                                    item
                                    xs={3}
                                    style={{whiteSpace: 'nowrap'}}
                                >
                                    <Box className={ classes.centerBox }>
                                        <CircularProgress color="secondary" className={classes.progress}/>
                                        <Typography
                                            className={classes.loadingLabel}
                                        >
                                            Loading KLUOS Record...
                                        </Typography>
                                    </Box>
                                </Grid>
                        }

                    </Grid>

                </Box>

            </div>
        )
    }

}

export default withStyles(styles)(LandUseEditor);