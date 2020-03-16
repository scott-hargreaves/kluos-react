import SiteEditorComponent from '../components/editor/SiteEditor';

import { connect } from 'react-redux';

const mapDispatchToProps = ( dispatch ) => ({

});

const mapStateToProps = ( state ) => ({
    urls: state.system.urls,
    irData: state.map.ir.data,
});

export default connect(  mapStateToProps, mapDispatchToProps )( SiteEditorComponent );