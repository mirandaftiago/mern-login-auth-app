import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classNames from 'classnames';
import { withRouter } from '../../utils/withRouter';

const Register = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {}
    });

    const navigate = useNavigate();

    useEffect(() => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (props.auth.isAuthenticated) {
            navigate('/dashboard');
        }
    }, [props.auth.isAuthenticated, navigate]);

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
        props.registerUser(newUser, props.history);
    };

    const { errors } = state;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col s8 offset-s2'>
                    <Link to='/' className='btn-flat waves-effect'>
                        <i className='material-icons left'>keyboard_backspace</i> Back to home
                    </Link>
                    <div className='col s12' style={{ paddingLeft: '11.25px' }}>
                        <h4>
                            <b>Register</b> below
                        </h4>
                        <p className='grey-text text-darken-1'>
                            Already have an account?
                            <Link to='/login'>Log in</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='input-field col s12'>
                            <input 
                                onChange={onChange}
                                value={state.name}
                                error={errors.name}
                                id='name'
                                type='text'
                                className={classNames('', {
                                    invalid: errors.name
                                })}
                            />
                            <label htmlFor='name'>Name</label>
                            <span className='red-text'>{errors.name}</span>
                        </div>
                        <div className='input-field col s12'>
                            <input
                                onChange={onChange}
                                value={state.email}
                                error={errors.email}
                                id='email'
                                type='email'
                                className={classNames('', {
                                    invalid: errors.email
                                })}
                            />
                            <label htmlFor='email'>Email</label>
                            <span className='red-text'>{errors.email}</span>
                        </div>
                        <div className='input-field col s12'>
                            <input
                                onChange={onChange}
                                value={state.password}
                                error={errors.password}
                                id='password'
                                type='password'
                                className={classNames('', {
                                    invalid: errors.password
                                })}
                            />
                            <label htmlFor='password'>Password</label>
                            <span className='red-text'>{errors.password}</span>
                        </div>
                        <div className='input-field col s12'>
                            <input
                                onChange={onChange}
                                value={state.confirmPassword}
                                error={errors.confirmPassword}
                                id='confirmPassword'
                                type='password'
                                className={classNames('', {
                                    invalid: errors.confirmPassword
                                })}
                            />
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <span className='red-text'>{errors.confirmPassword}</span>
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
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser}
)(withRouter(Register));
