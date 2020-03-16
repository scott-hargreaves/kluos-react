import React from "react";

import Map from '../Map';

import Box from '@material-ui/core/Box';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles }   from '@material-ui/core';

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%'
    },
    box: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    },
    mapBox: {
        flex: '1 1 200px',
        position: 'relative'
    },
    listBox: {
        flex: '0 1 33%',
        marginTop: 8,
        position: 'relative',

    },

});

class SiteEditor extends React.Component {

    render() {
        const { classes, urls, irData } = this.props;

        console.log('urls', urls);

        return (
            <div className={classes.root}>
                <CssBaseline/>

                <Box className={classes.box}>

                    <Box border={1} borderColor="grey.400" className={classes.mapBox}>
                        <Map
                            urls={ urls }
                            irData={ irData }
                            sites={ [] }
                            style={{margin: 0, top: 0}}
                        />
                    </Box>
                    <Box className={classes.listBox} style={ { }}>

                    </Box>


                </Box>

            </div>
        )
    }
}

export default withStyles(styles)(SiteEditor);
