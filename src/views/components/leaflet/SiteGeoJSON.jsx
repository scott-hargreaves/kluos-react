import React from 'react';

import TooltipGeoJSON from "./TooltipGeoJSON";

import { withStyles } from "@material-ui/core";


const styles = theme => ({
    root: {
    },
});

const SELECTED_COLOR = "#80ff00";

const HOVER_STYLE = {
    fillOpacity: 0.66,
};

const SELECTED_STYLE = {
    color: SELECTED_COLOR,
    fillColor: SELECTED_COLOR,
    fillOpacity: 0.5,
    opacity: 0.9,
    stroke: 1,
    weight: 0.66,
};

const SITE_STYLE = {
    color: "#withStyles(styles)3399ff",
    fillColor: "#3399ff",
    fillOpacity: 0.20,
    opacity: 0.75,
    stroke: 1,
    weight: 0.66
};

class SiteGeoJSON extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        };
    }

    generateKey = ( site, hidden ) => {

        return site.id + '.' +
            this.props.index + '.' +
            (+ !hidden) +
            ((this.props.selectedIndex >= 0) ? '.' + this.props.selectedCount : '');

    };

    handleOnClick = ( evt ) => {

        if(this.props.onClick)
            this.props.onClick({
                site:  this.props.site,
                selected: !evt.originalEvent.ctrlKey
            });

    };

    handleOnMouseOut = ( ) => {
        this.setState( ( state )  => ({ hover: false }));
    };

    handleOnMouseOver = ( ) => {
        this.setState( ( state ) => ({ hover: true }));
    };

    render() {
        const { classes, site, color, selectedIndex } = this.props;
        const { hover } = this.state;
        const hidden = !color;
        const selected = selectedIndex >= 0;

        const styler =
            hover ?
                () => ({
                    ...HOVER_STYLE,
                    'fillColor': selected ? SELECTED_COLOR : color,
                    'color':  selected ? SELECTED_COLOR : color,
                }) :
                selected ?
                    () => ({
                        ...SELECTED_STYLE,
                    }) :
                    () => ({
                        ...SITE_STYLE,
                        'fillColor': color,
                        'color':  color
                    });

        const geoJson = {
            "type": "Feature",
            "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
            "geometry": site.geometry
        };

            return (
                <TooltipGeoJSON
                    key={ this.generateKey(site, hidden) }
                    ref={ this.geoJsonRef }
                    data={ geoJson }
                    style={ styler }
                    hidden={ hidden }
                    onMouseOver={ this.handleOnMouseOver }
                    onMouseOut={ this.handleOnMouseOut }
                    onClick={ this.handleOnClick }
                >
                </TooltipGeoJSON>
            )
        }

}

export default withStyles(styles)(SiteGeoJSON);