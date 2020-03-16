import LandingPageComponent from '../components/LandingPage';

import { connect } from 'react-redux';

const mapDispatchToProps = ( dispatch ) => ({

});

const mapStateToProps = ( state ) => {
    console.log(state);
    return {
        session: state.session
    }
};


export default connect(  mapStateToProps, mapDispatchToProps )( LandingPageComponent );