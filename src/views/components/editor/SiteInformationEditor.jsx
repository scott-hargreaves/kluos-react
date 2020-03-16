import React from "react";

import { withStyles }   from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import TextEditor from "./TextEditor";

const styles = theme => ({
    root: {
        width: '100%'
    },
});


class SiteInformationEditor extends React.Component {

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
        const { classes, siteInformation, readOnly } = this.props;

        return (
            <div className={classes.root}>

                <Grid
                    container
                    spacing={1}
                >

                    <Grid item xs={6}>
                        <TextEditor
                            defaultValue={ siteInformation.englishName }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="English Name"
                            name="englishName"
                            placeholder="<No Name>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />

                    </Grid>

                    <Grid item xs={6}>
                        <TextEditor
                            defaultValue={ siteInformation.halkomelemName }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Halkomelem Name"
                            name="halkomelemName"
                            placeholder="<No Name>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextEditor
                            defaultValue={ siteInformation.commonName }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Common (Local) Name"
                            name="commonName"
                            placeholder="<No Name>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                    <Grid item xs={12} style={{ paddingTop: 8}}>
                        <TextEditor
                            defaultValue={ siteInformation.description }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Site Description"
                            multiline
                            name="description"
                            placeholder="<None>"
                            rows={4}
                            size="small"
                            variant="outlined"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextEditor
                            defaultValue={ siteInformation.comments }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Additional Comments"
                            multiline
                            name="comments"
                            placeholder="<None>"
                            rows={4}
                            size="small"
                            variant="outlined"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextEditor
                            defaultValue={ siteInformation.sourceQuote }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Quote from Source"
                            multiline
                            name="sourceQuote"
                            placeholder="<None>"
                            rows={4}
                            size="small"
                            variant="outlined"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(SiteInformationEditor);
