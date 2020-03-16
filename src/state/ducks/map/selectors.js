import { uiSelectors } from "../ui";

function getSortedSites( state ) {

    const sites =  Object.values(state.map.sites.cache)
        .filter( ( site ) => {
            return uiSelectors.selectionIndex( state, site.id ) < 0;
        })
        .sort( ( site1, site2 ) => {
            return  site2.area - site1.area;
        });

        const selected = state.ui.map.selected
            .map( ( siteId ) => {
                return state.map.sites.cache[ siteId ];
            })
            .sort( ( site1, site2 ) => {
                return  site2.area - site1.area;
            });

    return sites.concat(selected);
}

export default {
    getSortedSites,
}