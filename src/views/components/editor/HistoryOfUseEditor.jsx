import React from "react";

import { withStyles }   from '@material-ui/core';

import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import TextEditor from "./TextEditor";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckboxSelect from "./CheckboxSelect";

import HistoryOfUse from "../../../model/HistoryOfUse";
import AutocompleteList from "./IndividualList";

const styles = theme => ({
    root: {
        width: '100%'
    },
    formControl: {
        borderColor: theme.palette.grey["300"],
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        '& legend': {
            transform: 'scale(0.75)',
            transformOrigin: 'top left',
        },
        '& label': {
            margin: 0,
        }
    },
    formControlLabel: {
        fontSize: '0.8rem',
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
});

function StyledCheckbox( props ) {
    return (<Checkbox
        { ...props }
        checkedIcon={ <CheckBoxIcon fontSize="small" /> }
        color="default"
        icon={ <CheckBoxOutlineBlankIcon fontSize="small" /> }
        style={{ padding: '4px 6px 4px 8px'}}
    />);
}

class HistoryOfUseEditor extends React.Component {

    render() {
        const { classes, defaultValue, readOnly } = this.props;

        return (
            <div className={classes.root}>

                <Grid
                    container
                    alignItems="center"
                    spacing={2}
                    style={ { alignItems: 'flex-start'}}
                >

                    <Grid item xs={12}>
                        <TextEditor
                            inputProps={{
                                readOnly: readOnly
                            }}
                            label="Years(s) Of Recorded Use"
                            placeholder="<None>"
                            size="small"
                            defaultValue={ defaultValue.yearsOfUse }
                        />
                    </Grid>

                    <Grid item xs={6}>

                        <CheckboxSelect
                            defaultValue={ defaultValue.erasOfUse }
                            label="Era(s) Of Use"
                            options={ HistoryOfUse.ERAS }
                            placeholder="<None Given>"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <CheckboxSelect
                            defaultValue={ defaultValue.seasonsOfUse }
                            label="Seasons(s) Of Use"
                            options={ HistoryOfUse.SEASONS }
                            placeholder="<None Given>"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <AutocompleteList
                            defaultValue={ defaultValue.siteUsers }
                            label="Name(s) of Individuals Using Site"
                            name="siteUsers"
                            onChange={ this.handleOnUserListChange }
                        />

                    </Grid>

                </Grid>


            </div>
        )
    }
}

export default withStyles(styles)(HistoryOfUseEditor);
