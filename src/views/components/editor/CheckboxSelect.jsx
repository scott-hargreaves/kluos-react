import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        width: '100%',
    },
    label: {
        backgroundColor: theme.palette.background.paper,
        padding: '0 4px',
    },
    select: {
        '&  .MuiSelect-select': {
            minHeight: 28,
            padding: '10px 28px 8px 8px',
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: theme.palette.background.paper,
        }
    },
    placeholder: {
        alignItems: 'center',
        display: 'flex',
        height: '28px',
        '& .MuiTypography-root': {
            color: theme.palette.text.disabled,
            fontSize: '0.8rem',
        }
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
        minWidth: 80,
    },
    menu: {

    },
    menuItem: {
        padding: 0,
        '& .MuiListItemText-primary':  {
           fontSize: '0.8rem',
        },
    }

});

class CheckboxSelect extends React.Component {

    constructor( props ) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }

    handleOnChange = ( evt ) => {
        this.setState({ value: evt.target.value });
    };

    render() {
        const { classes, label, options, placeholder, ...other } = this.props;
        const { value } = this.state;

        const optionList = options.map( ( option ) => (
            <MenuItem dense key={ option } value={ option } className={ classes.menuItem }>
                <Checkbox checked={ value.indexOf(option) > -1 } />
                <ListItemText primary={ option } />
            </MenuItem>
        ));

        return(
            <FormControl className={ classes.root } variant="outlined">
                <InputLabel className={ classes.label } shrink={ true }>{ label }</InputLabel>
                <Select
                    { ...other }
                    className={ classes.select }
                    displayEmpty
                    MenuProps={{ className: classes.menu }}
                    multiple
                    renderValue={
                        ( selected ) => (
                            selected.length === 0 ?
                                <div className={ classes.placeholder }><Typography>{ placeholder }</Typography></div> :
                                <div className={ classes.chips }>
                                    { selected.map( ( selectedValue ) => (
                                            <Chip
                                                className={ classes.chip }
                                                key={ selectedValue }
                                                label={ selectedValue }
                                                size="small"
                                            />
                                        ))}
                                </div>
                        )
                    }
                    value={ value }
                    onChange={ this.handleOnChange }
                >
                    { optionList }
                </Select>
            </FormControl>
        );
    };
}

export default withStyles(styles)(CheckboxSelect);