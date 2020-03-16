import React from 'react';

import TextEditor from './TextEditor';

import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import isEqual from 'lodash/isEqual';

const styles = theme => ({
    root: {

    },
    horizontal: {
        width: 0,
        transitionProperty: 'width',
        '&.MuiCollapse-entered': {
            width: '100%'
        },
        '&.MuiCollapse-hidden': {
            width: 0
        }
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
});

const ARCHIVE = 'Archive';
const CULTURAL_CENTRE = 'Cultural Centre';
const KATZIE_OFFICE = 'Katzie Office';
const MUSEUM = 'Museum';
const OTHER = 'Other';

const locations = [
    KATZIE_OFFICE,
    ARCHIVE,
    MUSEUM,
    CULTURAL_CENTRE,
    OTHER,
];

const formatValue = ( value ) => {
    return !value.text ?
        value.select :
        value.select + ': ' + value.text;
};

const parseValue = ( value ) => {
    const parts = !value ? [] : value.split(': ');
    return {
        select: parts.length > 0 ? parts[0] : "",
        text: parts.length > 1 ? parts[1] : "",
    }
};

class LocationEditor extends React.Component {

    constructor( props ) {
        super(props);
        this.state = {
            value: parseValue(props.defaultValue)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!isEqual(prevState.value, this.state.value) && (this.props.onChange)) {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: formatValue(this.state.value)
                }
            });
        }
    }

    handleOnSelectChange = ( evt, value ) => {
        this.setState({ value: { select: value, text: "" } });
    };

    handleOnTextChange = ( evt ) => {
        this.setState({ value: { ...this.state.value, text: evt.target.value } });
    };

    render() {
        const { classes, label, defaultValue } = this.props;
        const { value } = this.state;

        const defaultObject = parseValue(defaultValue);

        return(
            <Grid
                container
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={6}>

                    <Autocomplete
                        classes={ { root: classes.autocomplete,  option: classes.option } }
                        disableClearable
                        options={ locations }
                        defaultValue={ defaultObject.select }
                        getOptionLabel={ option => option !== KATZIE_OFFICE ? option + ':' : option }
                        renderInput={ params =>
                            <TextField
                                { ...params }
                                label={ label }
                                size="small"
                                InputLabelProps={ { shrink: true, style: { whiteSpace: 'nowrap' } }}
                            />
                        }
                        onChange={ this.handleOnSelectChange }
                    />

                </Grid>
                <Grid item xs={6}>
                    <Grow in={ value.select !== KATZIE_OFFICE } style={{ transformOrigin: 'left bottom'}}>
                        <TextEditor
                            InputProps={ { readOnly: false }}
                            size="small"
                            label=" "
                            defaultValue={ defaultObject.text }
                            placeholder={ value.select !== KATZIE_OFFICE ? '<No ' + value.select + ' Name>' : '' }
                            onChange={ this.handleOnTextChange }
                        />
                    </Grow>
                </Grid>
            </Grid>
        );
    };
}

export default withStyles(styles)(LocationEditor);