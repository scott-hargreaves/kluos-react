import React from 'react';

import { FeatureGroup, GeoJSON } from 'react-leaflet';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
    },
    none: {
        display: 'none'
    }
});

const ZOOM_STYLE = {
    display: 'none',
    color: '#000000',
    fillOpacity: 0.75,
    weight: 1
};

class ZoomSiteLayerGroup extends React.Component {

    constructor(props) {
        super(props);
        this.layerRef = React.createRef();
    }

    getBounds() {
        return this.layerRef.current.leafletElement.getLayers().length > 0 ?
            this.layerRef.current.leafletElement.getBounds() :
            null;
    }

    render() {
        const { classes, sites } = this.props;

        const geoJson = sites.map( (site, idx) => {
            if(!site) return null;

            const geoJson = {
                "type": "Feature",
                "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
                "geometry": site.geometry
            };

            return <GeoJSON
                className={ classes.none }
                key={ site.id }
                data={ geoJson }
                style={ ZOOM_STYLE }
            />
        });

        return(
            <FeatureGroup
                ref={ this.layerRef }
            >
                { geoJson }
            </FeatureGroup>
        )
    }
}

export default withStyles(styles)(ZoomSiteLayerGroup)