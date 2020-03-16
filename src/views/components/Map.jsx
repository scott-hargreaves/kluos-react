import React from 'react';

import SiteLayerGroup from './leaflet/SiteLayerGroup';
import TooltipGeoJSON from './leaflet/TooltipGeoJSON';
import VectorTileLayer from './mapbox/VectorTileLayer';

import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';

import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';

import { CRS } from 'leaflet';

import {FeatureGroup, GeoJSON, Map as LeafletMap, Popup} from 'react-leaflet';
import Control  from 'react-leaflet-control';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.grey.A100,
        height: '100%'
    },
    map: {
        height: '100%',
        '& .leaflet-container': {
            height: '100%'
        }
    },
    controlButton: {
        backgroundColor: '#fff',
        //border: '2px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.65)',
        //boxShadow: 'none',
        color: '#000',
        padding: '4px',
        '&:hover': {
            backgroundColor: theme.palette.grey[50],
        }
    },
    leafletTooltip: {
        backgroundColor: '#fff',
        borderRadius: 0,
        border: "1px solid #000",
        color: theme.palette.grey.A400,
        fontSize: '11px',
    }
});

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2NvdHRoYXJncmVhdmVzIiwiYSI6ImNqeTZucDhqZTA0enYzcG85YWRkcm01dGUifQ.T7ban22xux25oGPu_cSwzg";

const IR_STYLE = {
    color: '#808080',
    fillOpacity: 0.75,
    weight: 1
};

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.mapRef = React.createRef();
        this.irGroupRef = React.createRef();
        this.siteGroupRef = React.createRef();
    }

    componentDidMount() {
        if(this.props.fetchIrData) this.props.fetchIrData()
    }

    componentDidUpdate(prevProps) {

        if((this.props.irData && !prevProps.irData) || (this.props.queryCount > prevProps.queryCount)) {
            setTimeout(() => {
                this.handleOnCenterClick();
            }, 1000);
        }

    }

    handleOnCenterClick = ( ) => {
        const bounds = this.siteGroupRef.current.getBounds() || this.irGroupRef.current.leafletElement.getBounds();
        const map = this.mapRef;
        map.current.leafletElement.flyToBounds(bounds, { maxZoom: 13 });
    };

    render() {
        const { classes, urls, irData, sites } = this.props;

        return (
            <div className={ classes.root }>
                <CssBaseline/>
                <LeafletMap
                    ref={ this.mapRef }
                    attributionControl={ false }
                    center={ [ 49.233334, -122.683334 ] }
                    crs={CRS.EPSG3857}
                    zIndex={0}
                    zoom={ 10 }
                    className={ classes.map }
                >
                    <Control position="topleft" >
                        <Tooltip classes={ { tooltip: classes.leafletTooltip } } enterDelay={ 500 } title="Fit To Bounds">
                            <IconButton
                                aria-label="center"
                                className={ classes.controlButton }
                                disableRipple
                                disableFocusRipple
                                size="small"
                                onClick={ this.handleOnCenterClick }
                            >
                                <FilterCenterFocusIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Control>

                    <VectorTileLayer
                        accessToken={ MAPBOX_ACCESS_TOKEN }
                        baseApiUrl={ urls.openmap_tiles }
                        url={ urls.openmap_tiles }
                        style={ urls.openmap_style }
                    />

                    {
                        irData &&
                        <FeatureGroup
                            ref={this.irGroupRef}
                        >
                            <TooltipGeoJSON
                                data={ irData }
                                style={ IR_STYLE }
                            />

                        </FeatureGroup>
                    }

                    <SiteLayerGroup
                        ref={ this.siteGroupRef }
                        sites={ sites }
                    />

                </LeafletMap>

            </div>
        )
    }

}

export default withStyles(styles)(Map);