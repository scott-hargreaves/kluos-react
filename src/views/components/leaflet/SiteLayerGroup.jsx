import React from 'react';

import SiteGeoJSONContainer from '../../containers/SiteGeoJSON';
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

    handleOnSelected = ( evt ) => {
        if(this.props.onSiteSelected) this.props.onSiteSelected( evt );
    };

    render() {
        const { sites } = this.props;

        const geoJson = Object.values(sites).map( (site, idx) => {
            if(!site) return null;

            return <SiteGeoJSONContainer
                key={ site.id }
                index={ idx }
                site={ site }
                onSelected={ this.handleOnSelected }
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