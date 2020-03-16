import React from 'react';
import SiteLayerGroup from "./SiteLayerGroup";

import { GeoJSON, Popup, Tooltip } from "react-leaflet";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";

const styles = theme => ({
    root: {
    },
    hide: {
        display: 'none',
    },
    popup: {
        '& .leaflet-popup-content': {
            margin: 8
        }
    },
    site: {

    }
});

class TooltipGeoJSON extends React.Component {

    constructor(props) {
        super(props);

        this.geoJsonRef = React.createRef();

        this.state = {
            timerHndl: null,
        };
    }

    handleOnClick = ( evt ) => {
        if( this.props.onClick )  this.props.onClick( evt );
    }

    handleOnMouseMove = ( evt ) => {
        if(this.props.onMouseMove) this.props.onMouseMove( evt );

        if(evt.target.isPopupOpen()) evt.target.closePopup();
        if(this.state.timerHndl) clearTimeout( this.state.timerHndl );

        const timeoutHndl = setTimeout(() => {
            evt.target.openPopup(evt.latlng);
        }, 500);

        this.setState( ( state ) => ({ timerHndl: timeoutHndl }));
    };

    handleOnMouseOut = ( evt ) => {
        if(this.props.onMouseOut) this.props.onMouseOut( evt );

        if(evt.target.isPopupOpen()) evt.target.closePopup();
        if(this.state.timerHndl) clearTimeout( this.state.timerHndl );
    };

    handleOnMouseOver = ( evt ) => {
      if(this.props.onMouseOver) this.props.onMouseOver( evt );
    };

    setStyle = ( pathOptions ) => {
        this.geoJsonRef.current.setStyle( pathOptions );
    };

    render() {
        const { classes, data, style, hidden, tooltip } = this.props;

        return (
            <GeoJSON
                ref={ this.geoJsonRef }
                data={ data }
                style={ style }
                className={ clsx( classes.site,{ [ classes.hide ]: hidden })}
                onClick={ this.handleOnClick }
                onMouseMove={ this.handleOnMouseMove }
                onMouseOut={ this.handleOnMouseOut }
                onMouseOver={ this.handleOnMouseOver }
            >

                {
                    /*
                     <Popup
                            className={ classes.popup }
                            closeButton={ false }
                        >
                            <span style={{ color: 'blue' }}>GoodDog</span>
                        </Popup>
                     */
                }

            </GeoJSON>
        )
    }

}

export default withStyles(styles)(TooltipGeoJSON);