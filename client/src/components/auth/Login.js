import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import { withRouter } from '../../utils/withRouter';

const Login = (props) => {
    const auth = useSelector(state => state.auth);
    const errors = useSelector(state => state.errors);

    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {}
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (auth.isAuthenticated) {
            navigate('/dashboard');
        }
    }, [auth.isAuthenticated, navigate]);

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: state.name,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword
        };
        dispatch(loginUser(newUser, props.history));
    };

    return(
        <div className='container'>
            <div style={{ marginTop: '4rem' }} className='row'>
                <div className='col s8 offset-s2'>
                    <Link to='/' className='btn-flat waves-effect'>
                        <i className='material-icons left'>keyboard_backspace</i> Back to
                        home
                    </Link>
                    <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                        <h4>
                        <b>Login</b> below
                        </h4>
                        <p className='grey-text text-darken-1'>
                        Don't have an account? <Link to='/register'>Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='input-field col s12'>
                            <input
                                onChange={onChange}
                                value={state.email}
                                error={errors.email}
                                id='email'
                                type='email'
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                            <label htmlFor='email'>Email</label>
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>
                        <div className='input-field col s12'>
                            <input
                                onChange={onChange}
                                value={state.password}
                                error={errors.password}
                                id='password'
                                type='password'
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <label htmlFor='password'>Password</label>
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </div>
                        <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                            <button
                                style={{
                                width: '150px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                                marginTop: '1rem'
                                }}
                                type='submit'
                                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                                >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default withRouter(Login);