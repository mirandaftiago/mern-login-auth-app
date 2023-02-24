import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

function Dashboard() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
        return () => {
            dispatch(logoutUser(navigate));
        };
    }, [dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logoutUser(navigate));
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

export default Dashboard;