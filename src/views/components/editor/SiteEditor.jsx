import React from "react";

import EditorMap from '../../containers/EditorMap';

import Box from '@material-ui/core/Box';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles }   from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {isNumber} from "lodash";

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%'
    },
    box: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    },
    mapBox: {
        flex: '1 1 200px',
        position: 'relative'
    },
    listBox: {
        flex: '0 1 33%',
        marginTop: 8,
        position: 'relative',

    },
    menuItem: {
        '&.Mui-selected': {
            backgroundColor: theme.palette.grey.A100,
        },
        '&.Mui-selected:hover': {
            backgroundColor: theme.palette.grey.A200,
        },

    },
    titleText: {

    },
    idText: {
        fontSize: '0.8rem',
        display: 'block',
    },
    areaText: {
        fontSize: '0.8rem',
        position: 'absolute',
        right: 16,
        bottom: 10,
    },
});

class SiteEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            selected: []
        }
    }

    handleOnClick = ( evt, siteId ) => {
        const selected =  !evt.ctrlKey;
        this.setState({
            selected: selected ? [ siteId ] : [ ],
        });
    };

    getSelectionIndex = ( siteId ) => {
        return this.state.selected.indexOf(siteId);
    };

    handleToggleSiteSelected = ( site, selected ) => {

        this.setState({
            selected: selected ? [ site.id ] : [ ],
        });

    };

    toAreaString = ( area ) => {
        if (area === NaN || !isNumber(area))
            area = 0.0;

        return area > 1000000 ?
                <span> { Math.round( area / 1000000) } km<sup>2</sup></span> :
                <span>{ Math.round( area ) } m<sup>2</sup></span>;
    };

    render() {
        const { classes, sites, urls, irData } = this.props;
        const { selected } = this.state;

        const listItems = sites.map( ( site, idx ) => (
            <ListItem
                key={ site.id }
                name={ site.id }
                className={ classes.menuItem }
                button
                dense
                selected={ selected.indexOf(site.id) > -1 }
            >
                <ListItemText
                    primary={ <Box component="div" fontWeight="fontWeightMedium" overflow="hidden" textOverflow="ellipsis" className={ classes.titleText }> { 'Site #' + idx }</Box> }
                    primaryTypographyProps={{
                        className: classes.title,
                        noWrap: true
                    }}
                    secondary={
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                className={ classes.idText }
                            >
                                Site ID: { site.id }
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                className={ classes.areaText }
                            >
                                Area: { this.toAreaString(site.area) }
                            </Typography>
                        </>
                    }
                    onClick={ ( evt ) => this.handleOnClick(evt, site.id) }
                />
            </ListItem>
        ));

        return (
            <div className={classes.root}>
                <CssBaseline/>

                <Box className={classes.box}>

                    <Box border={1} borderColor="grey.400" className={classes.mapBox}>
                        <EditorMap
                            key="editorMap"
                            forceZoom={ true }
                            name="editorMap"
                            urls={ urls }
                            irData={ irData }
                            sites={ sites }
                            style={{margin: 0, top: 0}}
                            selectionIndex={ this.getSelectionIndex }
                            toggleSiteSelected={ this.handleToggleSiteSelected }
                        />
                    </Box>

                    <Box border={1} borderColor="grey.400" className={classes.listBox} style={ { }}>
                        <List
                            component="div"
                            disablePadding
                        >
                            { listItems }
                        </List>
                    </Box>

                </Box>

            </div>
        )
    }
}

export default withStyles(styles)(SiteEditor);
