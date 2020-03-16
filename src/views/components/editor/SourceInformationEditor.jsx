import React from "react";

import TextEditor from "./TextEditor";

import IndividualList from './IndividualList';

import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles }   from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    title: {
        backgroundColor: theme.palette.grey["200"],
        borderColor: theme.palette.grey["300"],
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 8
    },
    autocomplete: {
        marginBottom: 4,
        marginTop: 4,
        '& .MuiAutocomplete-inputRoot': {
            fontSize: '0.8rem',
        }
    },
    option: {
        fontSize: '0.8rem',
        padding: '4px 8px',
    },


    nameListHeader: {
        transform: 'scale(0.75)',
        transformOrigin: 'top left',
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1rem',
        fontWeight: 400
    },
    nameList: {
        borderColor: theme.palette.grey["300"],
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        height: 96,
        overflowY: 'auto',
        paddingTop: 0,
    },
    nameListChip: {
        borderColor: 'rgba(0, 0, 0, 0.33)',
        paddingBottom: 0,
        paddingTop: 0,
        width: '100%',
        '& span': {
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '0.8em',
        }
    }
});

const BOOK = 'Book';
const LETTER = 'Letter';
const MAP = 'Map';
const MUSEUM = 'Museum Label/Record';
const NEWSPAPER_ARTICLE = 'Newspaper Article';
const PHOTOGRAPH = 'Photograph';
const PUBLISHED_ARTICLE = 'Published Article';

const documentTypes = [
    MAP,
    LETTER,
    PUBLISHED_ARTICLE,
    NEWSPAPER_ARTICLE,
    PHOTOGRAPH,
    BOOK,
    MUSEUM,
];

class SourceInformationEditor extends React.Component {

    handleOnSelectChange = ( evt, name, value ) => {

        if(!evt)  return;

        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target: {
                    name: this.props.name + "." + name,
                    value: value
                }
            })
    };

    handleOnTextChange = ( evt ) => {
        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target:{
                    name: this.props.name + "." + evt.target.name,
                    value: evt.target.value
                }
            });
    };

    handleOnUserListChange = ( evt ) => {
        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target:{
                    name: this.props.name + "." + evt.target.name,
                    value: evt.target.value
                }
            });
    };

    render() {
        const { classes, sourceInformation, readOnly } = this.props;

        return (
            <div className={classes.root}>
                <Typography
                    align="center"
                    variant="caption"
                    component="div"
                    className={ classes.title }
                >
                    Archival
                </Typography>

                <Grid
                    container
                    alignItems="center"
                    spacing={1}
                >

                    <Grid item xs={6}>

                        <Autocomplete
                            name="archival.documentType"
                            classes={ { root: classes.autocomplete,  option: classes.option } }
                            defaultValue={ sourceInformation.archival.documentType }
                            disableClearable
                            freeSolo
                            options={ documentTypes }
                            renderInput={ params => (
                                <TextField
                                    { ...params }
                                    label="Document Type"
                                    margin="dense"
                                    placeholder="<No Document Type>"
                                    size="small"
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                    InputLabelProps={ { shrink: true, style: { whiteSpace: 'nowrap' } }}

                                />
                                )
                            }
                            onInputChange={ (evt, value) => this.handleOnSelectChange(evt, "archival.documentType", value ) }
                        />

                        {/*

                            <TextEditor
                                inputProps={{
                                    readOnly: readOnly
                                }}
                                label="Document Type"
                                placeholder="<No Document Type>"
                                size="small"
                                defaultValue={sourceInformation.archival.documentType}
                            />
                        */}
                    </Grid>
                    <Grid item xs={12}>

                        <TextEditor
                            defaultValue={ sourceInformation.archival.title }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Title"
                            name="archival.title"
                            placeholder="<No Title>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextEditor
                            defaultValue={ sourceInformation.archival.author }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Author"
                            name="archival.author"
                            placeholder="<No Author>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextEditor
                            defaultValue={ sourceInformation.archival.yearOfPublication }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Year Of Publication"
                            name="archival.yearOfPublication"
                            placeholder="<None>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextEditor
                            defaultValue={ sourceInformation.archival.pageNumber }
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Page #"
                            name="archival.pageNumber"
                            placeholder="<None>"
                            size="small"
                            onChange={ this.handleOnTextChange }
                        />
                    </Grid>
                </Grid>

                <Typography
                    align="center"
                    variant="caption"
                    component="div"
                    className={ classes.title }
                    style={{ marginTop: 8 }}
                >
                    Interview
                </Typography>

                <Grid container>
                    <Grid item xs={6} style={{ display: 'flex', flexFlow: 'column', paddingRight: 4, paddingTop: 4}}>

                        <IndividualList
                            defaultValue={ sourceInformation.interview.interviewees }
                            label="Interviewees"
                            name="interview.interviewees"
                            onChange={ this.handleOnUserListChange }
                        />

                    </Grid>

                    <Grid item xs={6} style={{ paddingLeft: 4, paddingTop: 4}}>

                        <IndividualList
                            defaultValue={ sourceInformation.interview.interviewers }
                            label="Interviewers"
                            name="interview.interviewers"
                            onChange={ this.handleOnUserListChange }
                        />

                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(SourceInformationEditor);
