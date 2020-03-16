import React from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {Menu} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";



import MoreVertIcon from '@material-ui/icons/MoreVert';

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ResultItemMenu from "./ResultItemMenu";

const styles = theme => ({
    root: {
    },
    hidden: {
      display: 'none',
    },
    container: {
        '& .MuiListItem-dense': {
            paddingBottom: 0,
            paddingTop: 0,
        },
        '&:hover .MuiListItemSecondaryAction-root': {
            display: 'block',
        },
        '& .Mui-selected': {
            backgroundColor: theme.palette.grey.A100,
        },
        '&:hover .Mui-selected': {
            backgroundColor: theme.palette.grey.A200,
        },
    },
    kluosIdText: {
        fontSize: '0.66rem',
        display: 'block',
    },
    siteCountText: {
        fontSize: '0.66rem',
        display: 'inline-block',
    },
    scoreText: {
        fontSize: '0.5rem',
        position: 'absolute',
        right: 8,
        bottom: 4,
    },
    iconButton: {
        marginBottom: 24,
        marginRight: '-12px !important',
        padding: '4px',
    },

});


class ResultListItem extends React.Component {

    constructor(props) {
        super(props);
        this.anchorRef = React.createRef();
        this.state = {
            menuOpen: false
        }
    }

    handleActionOnClick = ( evt ) => {
        evt.stopPropagation();
        this.setState({ menuOpen: true });
    };

    handleMenuOnClose = ( ) => {
       this.setState( { menuOpen: false} );
    };

    handleOnClick = ( evt ) => {
        const selected =  !evt.ctrlKey;
        this.props.toggleResultSelected( this.props.query, this.props.result, selected);
    };

    handleOnEditClick = ( evt ) => {
        this.props.setLandUseEditing( this.props.result.id );
        this.setState( { menuOpen: false} );
    };

    handleOnZoomToClick = ( evt ) => {
        this.props.zoomToSites( this.props.result.siteRefs );
        this.setState( { menuOpen: false} );
    };

    render() {
        const { classes, result, selected, editable } = this.props;
        const { menuOpen } = this.state;

        return(
                <ListItem
                    alignItems="flex-start"
                    button
                    classes={ { container: classes.container } }
                    dense
                    selected={ selected }
                    style={{ zIndex: 2 }}
                    onClick={ this.handleOnClick }
                >
                    <ListItemText
                        primary={ <Box component="div" fontWeight="fontWeightMedium" overflow="hidden" textOverflow="ellipsis" className={ classes.nameBox }> { result.name }</Box> }
                        primaryTypographyProps={{
                            noWrap: true
                        }}
                        secondary={
                            <>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    className={ classes.kluosIdText }
                                >
                                    KLUOS ID: { result.kluosId }
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    className={ classes.siteCountText }
                                >
                                    Site Count: { result.siteRefs.length }
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    className={ classes.scoreText }
                                >
                                    { result.score.toFixed(2 ) }
                                </Typography>
                            </>
                         }
                        classes={{
                            multiline: classes.multiline,
                            primary: classes.primaryText,
                            secondary: classes.secondaryText
                        }}
                    >

                    </ListItemText>
                    <ListItemSecondaryAction
                        style={{ zIndex: 4 }}
                    >

                        <IconButton
                            ref={ this.anchorRef }
                            edge="end"
                            size="small"
                            className={ classes.iconButton }
                            onClick={ this.handleActionOnClick }
                        >
                            <MoreVertIcon />
                        </IconButton>

                        <ResultItemMenu
                            anchorEl={ this.anchorRef.current }
                            open={ menuOpen }
                            editable={ editable }
                            result={ result }
                            onClose={ this.handleMenuOnClose }
                            onEditClick={ this.handleOnEditClick }
                            onZoomToClick={ this.handleOnZoomToClick }
                        />

                        {/*
                        <Menu
                            anchorEl={ this.anchorRef.current }
                            open={ menuOpen }
                            keepMounted
                            onClose={ this.handleMenuOnClose }
                        >
                            <ListSubheader component="div" className={classes.subheader}>KLUOS ID: { result.kluosId }</ListSubheader>
                            <Divider component="li"/>
                            <MenuItem dense>
                                <ListItemIcon><CenterFocusStrongIcon /></ListItemIcon>
                                <ListItemText>Zoom To...</ListItemText>
                            </MenuItem>
                            {
                                editable ?
                                    <MenuItem dense onClick={ this.handleEditOnClick }>
                                        <ListItemIcon><EditIcon /></ListItemIcon>
                                        <ListItemText>Edit...</ListItemText>
                                    </MenuItem> :
                                    <MenuItem dense>
                                        <ListItemIcon><OpenInNewIcon /></ListItemIcon>
                                        <ListItemText>View...</ListItemText>
                                    </MenuItem>
                            }

                        </Menu>
                        */}

                    </ListItemSecondaryAction>


                </ListItem>

        );
    };
}

export default withStyles(styles)(ResultListItem);