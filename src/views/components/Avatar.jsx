import React from 'react';

import UserMenuComponent from './UserMenu';

import MuiAvatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {

    },
    avatar: {
        backgroundColor: theme.palette.secondary.dark
    }
});

class Avatar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        }
    }

    handleOnClick = ( evt ) => {
        this.setState( { anchorEl: evt.target } );
    };

    handleOnClickAway = ( evt ) => {
        this.setState( { anchorEl: null } );
    };

    render() {
        const { classes, user } = this.props;
        const { anchorEl } = this.state;

        return (
            <>
                <IconButton
                    edge="end"
                    aria-label="Account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={ this.handleOnClick }
                >
                    <MuiAvatar className={ classes.avatar }>{ user.initials }</MuiAvatar>
                </IconButton>
                <UserMenuComponent
                    anchorEl={ anchorEl }
                    user={ user }
                    onClickAway={this.handleOnClickAway}
                />
            </>
        )
    }

}

export default withStyles(styles)(Avatar);

