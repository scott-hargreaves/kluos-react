import React from 'react';

import InputBase    from '@material-ui/core/InputBase';
import SearchIcon   from '@material-ui/icons/Search';

import { fade, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 320,
            '&:focus': {
                width: 480,
            },
        },
    },

});


class SearchTextField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    handleOnChange = (evt) => {
       this.setState( { value: evt.target.value });
    }

    handleOnSubmit = ( evt ) => {
        try {

            if (this.state.value.length > 2) {
                this.props.onSubmit( { value: this.state.value } );
                this.setState({value: ""});
            }
        }
        catch(err) {
            console.error(err);
        }

        evt.preventDefault();
    };

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <form className={classes.form} onSubmit={this.handleOnSubmit}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Query' }}
                        value={ this.state.value }
                        onChange={ this.handleOnChange }
                    />
                </form>
            </div>
        );
    };
}

export default withStyles(styles)(SearchTextField);