import actions from './actions';
import UrlAssembler from "url-assembler";
import axios from 'axios';

const fetchLandUse = ( landUseId ) => ( dispatch, getState ) => {

    dispatch( actions.willFetchLandUse( landUseId ) );

    const url = UrlAssembler( getState().system.urls.kluos_api )
        .template('/landuses/:id')
        .param({ id: landUseId })
        .toString();

    axios.get(url)
        .then( response => {
            dispatch( actions.didFetchLandUse( response.data ) );
        });

};

const updateLandUse = ( landUse ) => ( diapatch, getState ) => {

    const url = UrlAssembler( getState().system.urls.kluos_api )
        .template('/landuses/:id')
        .param({ id: landUse.id })
        .toString();

    axios.put(url, landUse)
        .then( response => {
            console.log("Response", response);
        })

};

export default {
    fetchLandUse,
    updateLandUse,
}