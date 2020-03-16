import actions from './actions';

const fetchIrData = () => ( dispatch ) => {

    dispatch( actions.willFetchIrData() );

    fetch('/geojson/ir.geojson')
        .then(response => {
            return response.json();
        })
        .then( geoJson => {
            dispatch(actions.didFetchIrData( geoJson ));
        });
};

export default {
    fetchIrData,
}