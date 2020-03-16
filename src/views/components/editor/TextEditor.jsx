import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginTop: 4,
        '& .MuiInputLabel-outlined': {
            paddingRight: 4,
        },
        '& legend': {
            fontSize: '1em',
        },
        '& legend > span': {
            paddingRight: 0,
        },
        '& input:read-only': {
            color: theme.palette.grey.A200,
        },
        '& .MuiInputBase-input': {
            fontSize: '0.8rem',
        }
    },

});

const inputLabelProps = {
    shrink: true,
    style: {
        whiteSpace: 'nowrap'
    }
};

class TextEditor extends React.Component {

    render() {
        const { classes, size, ...other } = this.props;
        
        return(
           <TextField
               { ...other }
               autoComplete="off"
               className={ classes.textField }
               fullWidth
               InputLabelProps={ inputLabelProps }
               margin="dense"
           />
        );
    };
}

export default withStyles(styles)(TextEditor);