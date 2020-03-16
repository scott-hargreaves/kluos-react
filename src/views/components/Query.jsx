import React from 'react';

import QueryListItemContainer   from '../containers/QueryListItem';

import Drawer           from '@material-ui/core/Drawer';
import IconButton       from '@material-ui/core/IconButton';
import List             from '@material-ui/core/List';
import ListItem         from '@material-ui/core/ListItem';
import ListItemText     from '@material-ui/core/ListItemText'
import Typography       from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import clsx from 'clsx';


const drawerWidth = 340;

const styles = theme => ({
    root: {
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        paddingTop: 70,
        width: drawerWidth,
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(5) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(5) + 1,
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerToolbar: {
        paddingLeft: 8,
        whiteSpace: 'nowrap',
    },
    drawerButton: {
        marginRight: 4,
    },
    drawerIcon: {

    },
    queryList: {
        overflowY: 'auto',
        paddingBottom: 0,
        paddingTop: 0,
    },
    emptyList: {
        paddingTop: 0,
    },
    emptyListText: {
        color: theme.palette.text.disabled
    },
});

class Query extends React.Component {

    constructor(props) {
        super(props);
    }

    handleOnClearQuery = ( queryId ) => {
        this.props.deleteQuery(queryId);
    };

    handleOnDrawerClick = (evt) => {
        this.props.toggleQueryOpen();
    };

    handleOnVisiblityChange = ( queryId, isVisible ) => {
        //this.props.setQueryVisible(queryId, isVisible);
    };

    render() {
        const { classes, queries, ui } = this.props;

        const results = Object.keys( queries ).length < 1 ?
            null :
            Object.values( queries ).map( ( query ) => {
                return <QueryListItemContainer
                            key={ query.id }
                            query={ query }
                        />
            });

        return (
            <Drawer
                anchor="right"
                variant="permanent"
                className={ clsx( classes.drawer, {
                    [classes.drawerOpen]: ui.open,
                    [classes.drawerClose]: !ui.open,
                }) }
                classes={{
                    paper: clsx(classes.drawerPaper, {
                        [classes.drawerOpen]: ui.open,
                        [classes.drawerClose]: !ui.open,
                    }),
                }}
                open={ ui.open }
            >
                <div className={ classes.drawerToolbar }>
                    <IconButton size="small" edge="start" className={classes.drawerButton} onClick={this.handleOnDrawerClick}>
                        <ChevronRightIcon className={clsx( classes.drawerIcon, { [classes.hide]: !ui.open})} />
                        <ChevronLeftIcon className={clsx( classes.drawerIcon, { [classes.hide]: ui.open })} />
                    </IconButton>
                    <Typography variant="overline">Search Results</Typography>
                </div>

                <List
                    component="nav"
                    className={ clsx(classes.queryList, { [ classes.hide]: !ui.open} )}
                >

                    {
                        results ||
                        <ListItem className={ classes.emptyList }>
                            <ListItemText
                                primary="Perform a Search..."
                                primaryTypographyProps={{
                                    variant: 'caption'
                                }}
                                classes={{
                                    primary: classes.emptyListText,
                                }}
                            />
                        </ListItem>
                    }

                </List>

                {
                    /*
                <List
                    component="nav"
                    className={ clsx(classes.queryList, { [ classes.hide]: !isVisible} )}
                >
                    {
                        Object.keys(queries).length > 0 ?
                            Object.keys(queries).map( ( id ) => {
                                return <SearchListItem
                                    editable={ editable }
                                    key={ id }
                                    query={ queries[id] }
                                    ui={ ui.queries[id] }

                                    /*
                                    ui={ ui.queries[id] }
                                    results={ results[id] || [ ] }
                                    onVisibilityChange={ this.handleOnVisiblityChange }
                                    onClearQuery={ this.handleOnClearQuery }

                                     * /
                                />
                            }) :
                            <ListItem>
                                <ListItemText
                                    primary="Perform a Query..."
                                    primaryTypographyProps={{
                                        variant: 'caption'
                                    }}
                                    classes={{
                                        primary: classes.emptyListText,
                                    }}
                                ></ListItemText>
                            </ListItem>

                    }
                    * /
                }
                </List>
                */
                }
            </Drawer>
        )
    }

}

export default withStyles(styles)(Query);