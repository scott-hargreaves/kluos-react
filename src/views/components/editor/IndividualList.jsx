import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import DateFnsUtils from "@date-io/date-fns";
import TooltipGeoJSON from "../leaflet/TooltipGeoJSON";
import Grow from "@material-ui/core/Grow";
import Zoom from "@material-ui/core/Zoom";
import TextEditor from "./TextEditor";
import CollapsibleTextEditor from "./CollapsibleTextEditor";

const inputStyles = theme => ({
    root: {

    }
});

const styles = theme => ({
    root: {
        '& .MuiAutocomplete-inputRoot': {
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 8,
        }
    },
    inputRoot: {
        height: '108px',
    },
    tagBox: {
        flex: 1,
        order: 1,
        overflowY: 'auto',
        paddingTop: 0,
    },
    tagPaper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    }

});

const getInitials = ( name ) => {
    if(!name) return '??';
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

class IndividualList extends React.Component {

    constructor(props) {
        super(props);

        this.controlRef = React.createRef();

        this.state = {
            focus: false,
            hover: false,
            inputValue: ''
        };
    }

    handleOnBlur = ( ) => {
        this.setState({
            focus: false,
            inputValue: ''
        });
    };

    handleOnFocus = ( ) => {
        this.setState( { focus: true });
    };

    handleOnChange = ( evt, value ) => {
        if(this.props.onChange) {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: value,
                }
            });
        }
    };

    handleOnInputChange = ( evt, value, reason ) => {
        this.setState({ inputValue: value });
    };

    handleOnMouseOut = ( ) => {
        this.setState( { hover: false });
    };

    handleOnMouseOver = ( ) => {
        this.setState( { hover: true });
    };

    render() {
        const { classes, label, ...other } = this.props;
        const { focus, hover, inputValue } = this.state;

        return(
            <Autocomplete
                { ...other }
                classes={{ root: classes.root, inputRoot: classes.inputRoot, tag: classes.tag  }}
                disableClearable
                freeSolo
                inputValue={ inputValue }
                multiple
                options={ [] }
                renderInput={ params => (
                    <TextField
                        {...params}
                        label={ label }
                        InputProps={{
                            ...params.InputProps,
                            inputComponent: CollapsibleTextEditor,
                            inputProps: { ...params.inputProps, show: (focus || hover).toString() },
                            type: 'search',
                            variant: 'outlined',
                        }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                    />
                )}
                renderTags={(value, getTagProps) =>
                    <Box className={ classes.tagBox }><Paper elevation={0} className={ classes.tagPaper }>{
                        value.map((option, index) => (
                            <Chip
                                {...getTagProps({index})}
                                avatar={ <Avatar>{ getInitials(option) }</Avatar> }
                                label={option}
                                size="small"
                            />
                        ))
                    }</Paper></Box>
                }
                onBlur={ this.handleOnBlur }
                onChange={ this.handleOnChange }
                onFocus={ this.handleOnFocus }
                onInputChange={ this.handleOnInputChange }
                onMouseOver={ this.handleOnMouseOver }
                onMouseOut={ this.handleOnMouseOut }
            />
        );
    };
}

export default withStyles(styles)(IndividualList);