import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import TextEditor from './TextEditor';
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
    root: {

    },
    text: {
        '& .MuiInputBase-input': {
            padding: '6px 8px !important'
        }
    }
});
class CollapsibleTextEditor extends React.Component {

    render() {
        const { classes, show, ...other } = this.props;

        return(
            <Collapse className={ classes.text } in={ show === 'true' } collapsedHeight={ 1 } style={{ width: '100%' }}>
                <TextEditor
                    { ...other }
                    variant="outlined"
                />
            </Collapse>
        );
    };
}

export default withStyles(styles)(CollapsibleTextEditor);