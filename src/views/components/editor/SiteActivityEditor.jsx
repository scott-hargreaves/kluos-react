import React from "react";

import { withStyles }   from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ActivityList from "./ActivityList";

import isEqual from 'lodash/isEqual';
import Activity  from '../../../model/Activity';

const styles = theme => ({
    root: {
        width: '100%'
    },
    gridTileRoot: {
       /* height: '128px !important', */
        '& .MuiGridListTile-tile': {
            paddingTop: 8,
        }
    }
});

class SiteActivityEditor extends React.Component {

    constructor( props ) {
        super(props);

        this.state = {
            activities: this.props.defaultValue.activities,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!isEqual(prevState.activities, this.state.activities)){
            if(this.props.onPropertyChange)
                this.props.onPropertyChange({
                    target:{
                        name: this.props.name + '.activities',
                        value: this.state.activities
                    }
                });
        }
    }

    handleOnListChange = ( evt ) => {

        if(evt.target.value.length > 0) {
            if(!this.state.activities.includes(evt.target.label)) {
                this.setState( (state) => ({ activities: state.activities.concat( [ evt.target.label ]) }));
            }
        }
        else {
            this.setState( (state) => ({ activities: state.activities.filter(( activity ) => activity !== evt.target.label ) }) );
        }

        if(this.props.onPropertyChange)
            this.props.onPropertyChange({
                target:{
                    name: this.props.name + '.' + evt.target.name,
                    value: evt.target.value
                }
            });
    };

    render() {
        const { classes, defaultValue, readOnly } = this.props;
        const { activities } = this.state;

        const activityTiles = Activity.map( ( activity ) => {
            return  <GridListTile
                        className={ classes.gridTileRoot }
                        cols={1}
                        key={ activity.name }
                    >
                        <ActivityList
                            defaultValue={ defaultValue [ activity.name] }
                            label={ activity.label }
                            name={ activity.name }
                            options={ activity.options }
                            onChange={ this.handleOnListChange }
                        />
                </GridListTile>

        } );

        return (
            <div className={classes.root}>
                <CssBaseline/>

                <GridList cellHeight="auto" cols={3}>

                    { activityTiles }

                    <GridListTile key={"activities"} cols={1} className={ classes.gridTileRoot } style={{ display: 'none' }}>
                        <ActivityList
                            value={ activities }
                            label="Activities"
                            name="activities"
                            options={ Activity.map( activity => activity.label ) }
                        />
                    </GridListTile>

                </GridList>

            </div>
        )
    }
}

export default withStyles(styles)(SiteActivityEditor);
