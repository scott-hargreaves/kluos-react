import React from 'react';

import TextEditor from "./TextEditor";

import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const styles = theme => ({
    root: {

    },
    picker: {
        marginTop: 4,
        marginBottom: 4,
        '& input': {
            paddingTop: 3,
        },
        '& .MuiSvgIcon-root': {
            width: '0.75em',
            height: '0.75em',
        },
        '& .MuiFormHelperText-root.Mui-error': {
            display: 'none',
        }
    }
});


const inputProps = {
    style: {
        fontSize: '0.8rem',
    }
}

class DateEditor extends React.Component {

    constructor( props ) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }

    handleOnChange = ( evt ) => {
        this.setState({ value: evt });

        if(this.props.onChange && new DateFnsUtils().isValid(evt)) {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: evt,
                }
            });
        }
    };

    render() {
        const { classes, disableFuture, label, readOnly, ...other } = this.props;
        const { value } = this.state;

        return(
            readOnly ?
                <TextEditor
                    { ...other }
                    value={ new DateFnsUtils().format( value, 'MM/dd/yyyy') }
                /> :
                <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                    <KeyboardDatePicker
                        autoOk
                        disableFuture
                        disableToolbar
                        label={ label }
                        margin="normal"
                        value={ value }
                        variant="inline"
                        format="MM/dd/yyyy"
                        KeyboardButtonProps={{
                            edge: 'end',
                            size: 'small',
                        }}
                        InputProps={inputProps}
                        className={classes.picker}
                        onChange={ this.handleOnChange }
                    />
                </MuiPickersUtilsProvider>


        );
    };
}

export default withStyles(styles)(DateEditor);