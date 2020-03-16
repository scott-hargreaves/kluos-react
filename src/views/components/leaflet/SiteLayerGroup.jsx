import React from 'react';

import { FeatureGroup } from 'react-leaflet';
import SiteGeoJSON from "./SiteGeoJSON";

class SiteLayerGroup extends React.Component {

    constructor(props) {
        super(props);
        this.layerRef = React.createRef();
    }

    getBounds() {
        return this.layerRef.current.leafletElement.getLayers().length > 0 ?
            this.layerRef.current.leafletElement.getBounds() :
            null;
    }

    handleSiteOnClick = ( evt ) => {
        if(this.props.onSiteSelected) this.props.onSiteSelected( evt );
    };

    render() {
        const { getSiteColor, selectionIndex, sites } = this.props;

        const geoJson = Object.values(sites).map( (site, idx) => {
            if(!site) return null;

            return <SiteGeoJSON
                key={ site.id }
                color={ getSiteColor( site.id ) }
                index={ idx }
                selectedIndex={ selectionIndex( site.id ) }
                site={ site }
                onClick={ this.handleSiteOnClick }
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

export default SiteLayerGroup;