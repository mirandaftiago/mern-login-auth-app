import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


function Dashboard(props) {
    const { user } = props.auth;
    
    // Get the navigate function from useNavigate hook
    const navigate = useNavigate();
  
    useEffect(() => {
      return () => {
        props.logoutUser(navigate);
      };
    }, []);
  
    const handleLogout = () => {
      props.logoutUser(navigate);
    };

    return (
        <div style={{ height: '75vh' }} className='container valign-wrapper'>
            <div className='row'>
                <div className='col s12 center-align'>
                    <h4>
                    <b>Hey there, </b> {user.name.split(' ')[0]}
                    <p className='flow-text grey-text text-darken-1'>
                        You are logged into a full-stack{' '}
                        <span style={{ fontFamily: 'monospace' }}>MERN</span> app👏
                    </p>
                    </h4>
                    <button
                        style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem',
                        }}
                        onClick={handleLogout}
                        className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);