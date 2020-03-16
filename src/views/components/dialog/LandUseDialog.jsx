import React from 'react';

import Dialog           from '@material-ui/core/Dialog';
import DialogActions    from '@material-ui/core/DialogActions';
import DialogContent    from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import LandUseEditorContainer from "../../containers/LandUseEditor";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {

    },
    dialog: {
        color: 'red',
        '& .MuiDialog-paper': {
            height: 'calc(100% - 64px)',
        }
    }
});

class LandUseDialog extends React.Component {

    constructor(props) {
        super(props);
        this.editorRef = React.createRef();

        this.state = {
            dirty: false,
        }
    }

    handleOnDirtyChange = ( evt ) => {
        this.setState({ dirty: evt.dirty })
    };

    handleOnCancel = ( evt ) => {
        this.editorRef.current.cancel();
    };

    handleOnSave = ( evt ) => {
        this.editorRef.current.save(); // .props.updateLandUse( this.editorRef.current.getLandUse() );
    };

    render() {
        const { classes, editable, ...other } = this.props;

        return (
            <Dialog
                className={ classes.dialog }
                { ...other }
            >
                <DialogContent>
                    <LandUseEditorContainer
                        ref={ this.editorRef }
                        onDirtyChange={ this.handleOnDirtyChange }
                    />
                </DialogContent>

                <DialogActions>
                    {
                        editable ?
                            <>
                                <Button variant="outlined" size="small" color="primary" onClick={ this.handleOnCancel }>
                                    Cancel
                                </Button>
                                <Button
                                    disabled={!this.state.dirty}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={ this.handleOnSave }
                                >
                                    Save
                                </Button>
                            </>:
                            <Button variant="outlined" size="small" color="primary" onClick={ this.handleOnCancel }>
                                Close
                            </Button>
                    }

                </DialogActions>

            </Dialog>
        )
    }

}

export default withStyles(styles)(LandUseDialog);