import React from 'react';


import ClickAwayListener    from '@material-ui/core/ClickAwayListener';
import Divider              from '@material-ui/core/Divider';
import Grow                 from '@material-ui/core/Grow';
import ListSubheader        from '@material-ui/core/ListSubheader';
import MenuItem             from '@material-ui/core/MenuItem';
import MenuList             from '@material-ui/core/MenuList';
import Paper                from '@material-ui/core/Paper';
import Popper               from '@material-ui/core/Popper';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {

    },
    subheader: {
        fontSize: '0.9em',
        fontWeight: '300',
        lineHeight: '24px',
    },
    subheaderName: {
        fontWeight: '500',
        lineHeight: '24px',
        paddingBottom: '8px'
    }
});

class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    handleClickAway = ( evt ) => {
        this.props.onClickAway(evt);
    };

    handleOnClose = ( evt ) => {
        this.formRef.current.submit();
    };

    render() {
        const { classes, anchorEl, user } = this.props;

        return(
            <Popper
                open={ Boolean(anchorEl) }
                anchorEl={ anchorEl }
                role={undefined}
                transition
                disablePortal
                placement="bottom-end"
            >
                {({ TransitionProps }) => (
                <Grow
                    { ...TransitionProps }
                    style={ { transformOrigin: 'center top' } }
                >
                <Paper>
                    <form action="/session/signout" method="POST" className={classes.form} noValidate ref={ this.formRef }>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <MenuList style={{paddingBottom:'4px'}}>
                            <ListSubheader component="div" className={classes.subheader}>Signed In As</ListSubheader>
                            <ListSubheader component="div" className={classes.subheaderName}>{ user.firstname + " " + user.lastname }</ListSubheader>
                            <Divider component="li"/>
                            <MenuItem dense style={{paddingTop: '8px'}} onClick={ this.handleOnClose }>Sign Out</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                    </form>
                </Paper>
                </Grow>
                )}

            </Popper>
        );
    };
}

export default withStyles(styles)(UserMenu);