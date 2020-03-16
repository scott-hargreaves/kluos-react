import React from 'react';

import ResultList from './ResultList';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

import ClearIcon from '@material-ui/icons/Clear';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withStyles } from '@material-ui/core/styles';

import {LinearProgress} from "@material-ui/core";

const styles = theme => ({
    root: {

    },
    headerListItem: {
        backgroundColor: theme.palette.grey["200"],
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: theme.palette.grey.A100,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.grey.A100,
        zIndex: 1
    },
    listItemGutter: {
        padding: '0 8px',
    },
    listItemText: {
      margin: '4px'
    },
    primaryText: {
        display: 'block',
        fontSize: '0.9rem'
    },
    secondaryText: {
        fontSize: '0.75rem'
    },
    progressBottom: {
        height: '1px',
        position: 'absolute',
        bottom: '-1px',
        left: '0px',
        right: '0px'
    },
    progressTop: {
        height: '1px',
        position: 'absolute',
        top: '-1px',
        left: '0px',
        right: '0px'
    },

});


class QueryListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expanded: true };

    }

    handleOnClearClick = ( evt ) => {
        this.props.clearQuery(this.props.query);
    };

    handleOnExpandClick = ( evt ) => {
        this.setState( (state) => ({ expanded: !state.expanded }));
    };

    handleOnSwitchChange = ( evt ) => {
        this.props.toggleQueryVisible(
            evt.target.value,
            evt.target.checked
        );
    };

    render() {

        const { classes, color, query, visible } = this.props;
        const { expanded } = this.state;

        const editable = false;

        const QuerySwitch = withStyles({
            switchBase: {
                '&$checked': {
                    color: color,
                },
                '&$checked + $track': {
                    backgroundColor: color
                },
            },
            checked: {},
            track: {},
        })(Switch);

        return(
            <React.Fragment>
                <ListItem key={ query.id } dense className={classes.headerListItem} classes={{ gutters: classes.listItemGutter }}>
                    <Tooltip title={ visible ? "Hide Query Results" : "Show Query Results" } enterDelay={ 500 } enterNextDelay={ 1000 }>
                        <QuerySwitch
                            size="small"
                            checked={ visible }
                            value={ query.id }
                            className={ classes.switch }
                            onChange={ this.handleOnSwitchChange }
                        />
                    </Tooltip>
                    <ListItemText
                        primary={ "Search: " + query.criteria }
                        primaryTypographyProps={{
                            noWrap: true
                        }}
                        secondary={ query.complete ? "Count: " + query.results.length : "Searching..."  }
                        classes={{
                            multiline: classes.listItemText,
                            primary: classes.primaryText,
                            secondary: classes.secondaryText
                        }}
                    />
                    <Tooltip title="Remove Query Results" enterDelay={ 500 } enterNextDelay={ 500 }>
                            <span>
                                <IconButton
                                    size="small"
                                    disabled={ !query.complete }
                                    onClick={ this.handleOnClearClick }
                                >
                                    <ClearIcon />
                                </IconButton>
                            </span>
                    </Tooltip>

                    <Tooltip title="Collapse Query Results" enterDelay={ 500 } enterNextDelay={ 500 } >
                        <IconButton
                            size="small"
                            onClick={this.handleOnExpandClick } >
                            { expanded ? <ExpandLessIcon /> : <ExpandMoreIcon/> }
                        </IconButton>
                    </Tooltip>

                    <LinearProgress variant="query" color="secondary" className={ classes.progressTop } hidden={ query.complete } />
                    <LinearProgress variant="query" color="secondary" className={ classes.progressBottom } hidden={ query.complete } />

                </ListItem>
                <Divider />
                <Collapse in={ query.complete && expanded } timeout="auto" unmountOnExit>

                    <ResultList
                        query={ query }
                        editable={ editable }
                        //onItemClick={ this.handleOnItemClick.bind(query.id, this) }
                    />

                </Collapse>
            </React.Fragment>
        );
    };
}

export default withStyles(styles)(QueryListItem);