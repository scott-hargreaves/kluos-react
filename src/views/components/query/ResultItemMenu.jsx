import React from 'react';

import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from '@material-ui/core/styles';

import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import EditIcon from '@material-ui/icons/Edit';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const styles = theme => ({
    root: {

    },
    subheader: {
        fontSize: '0.9rem',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        minWidth: 256,
    },
    menuItem: {
        padding: '4px 8px',
        '& .MuiListItemIcon-root': {
            minWidth: 32,
        }
    }
});

class ResultItemMenu extends React.Component {

    handleEditOnClick = ( evt ) => {
        if(this.props.onEditClick)
            this.props.onEditClick( evt );
    };

    handleOnZoomToClick = ( evt ) => {
        if(this.props.onZoomToClick)
            this.props.onZoomToClick( evt );
    };

    render() {
        const { classes, editable, result, onEditClick, onZoomToClick, ...other } = this.props;

       // let { onZoomToClick: _, onEditClick: __, ...menuProps } = other;

        return(
            <Menu
                { ...other }
                keepMounted
                style={{ width: 256 }}
            >
                <ListSubheader component="div" className={classes.subheader} >KLUOS ID: { result.kluosId }</ListSubheader>
                <Divider component="li" style={{ marginBottom: 8 }}/>

                <MenuItem className={ classes.menuItem } dense onClick={ onZoomToClick }>
                    <ListItemIcon><CenterFocusStrongIcon /></ListItemIcon>
                    <ListItemText>Zoom To...</ListItemText>
                </MenuItem>

                {
                    editable ?
                        <MenuItem className={ classes.menuItem } dense onClick={ onEditClick }>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <ListItemText>Edit...</ListItemText>
                        </MenuItem> :
                        <MenuItem className={ classes.menuItem }  dense>
                            <ListItemIcon><OpenInNewIcon /></ListItemIcon>
                            <ListItemText>View...</ListItemText>
                        </MenuItem>
                }

            </Menu>
        );
    };
}

export default withStyles(styles)(ResultItemMenu);