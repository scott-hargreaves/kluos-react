import React from 'react';

import ResultListItemContainer from '../../containers/ResultListItem';
import List from '@material-ui/core/List';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {

    },
    list: {

    }
});


class ResultList extends React.Component {

    handleOnClick(id) {
        this.props.onItemClick(id);
    }

    render() {
        const { classes, query, editable } = this.props;

        const resultItems = !query.results ?
            null :
            query.results.map( ( result ) => {
                return <ResultListItemContainer
                    key={ result.id }
                    query={ query }
                    result={ result }
                    editable={ editable }
                />;
            });

        return(
            <List component="div" disablePadding className={ classes.list }>
                { resultItems }
            </List>

        );
    };
}

export default withStyles(styles)(ResultList);