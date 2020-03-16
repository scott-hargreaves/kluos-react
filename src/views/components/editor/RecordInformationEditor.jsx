import React from "react";

import TextEditor from './TextEditor';
import DateEditor from "./DateEditor";
import LocationEditor from './LocationEditor';

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },

});

class RecordInformationEditor extends React.Component {

    handleOnDateChange = ( evt ) => {

        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target: {
                    name: this.props.name + "." + evt.target.name,
                    value: evt.target.value ? evt.target.value.toISOString() : null
                }
            });

    };

    handleOnLocationChange = ( evt ) => {
        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target: {
                    name: this.props.name + "." + evt.target.name,
                    value: evt.target.value
                }
            });
    };

    handleOnTextChange = ( evt ) => {
        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target: {
                    name: this.props.name + "." + evt.target.name,
                    value: evt.target.value
                }
            });
    };

    render() {
        const { classes, recordInformation, readOnly } = this.props;

        return (
            <div className={classes.root}>

                <Grid
                    container
                    alignItems="center"
                    spacing={1}
                >

                    <Grid item xs={6}>
                        <TextEditor
                            InputProps={ { readOnly: readOnly }}
                            name="recordedBy"
                            label="Recorded By"
                            size="small"
                            defaultValue={ recordInformation.recordedBy }
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DateEditor
                            disableFuture
                            readOnly={ readOnly }
                            name="recordedOn"
                            label="Recorded On"
                            defaultValue={ Date.parse(recordInformation.recordedOn) }
                            onChange={ this.handleOnDateChange }
                        />
                    </Grid>

                    <Grid item xs={9}>

                        <LocationEditor
                            name="recordedAt"
                            label="Recorded At"
                            defaultValue={ recordInformation.recordedAt }
                            onChange={ this.handleOnLocationChange }
                        />

                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(RecordInformationEditor);
