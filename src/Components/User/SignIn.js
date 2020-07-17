import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { userSignIn, resetUserState } from '../../Actions/loginActions'
import { getCurrentUser } from '../../Actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import { Input, Form, Button, Icon } from 'semantic-ui-react'
import './SignInWindow.scss'

const SignIn = props => {
    const { getCurrentUser, user } = props;
    const { push, listen } = useHistory();
    const [hidePass, setHidePass] = useState(true);
    const [values, updateValues] = useState({
        username: "",
        password: "",
    })

    // pushes user to landing on login success
    useEffect(() => {
        if (props.signInSuccess) push(`/user/${props.username}`);
    }, [props.signInSuccess, props.username, push])

    useEffect(() => {
        if (props.signInSuccess) getCurrentUser(props.username);
    }, [props.signInSuccess, props.username, getCurrentUser])

    // pushes user away from page if already logged in
    useEffect(() => {
        if (user) push(`/user/${user.username}`)
    }, [user, push])

    listen(() =>  {
        props.resetUserState();
    });

    const handleChanges = event => {
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        props.userSignIn(values)
    }

    return (
        <div className="SignInWindow sign-in">
            <div className="background-overlay">
                <div className="window">
                    <h2>Welcome Back</h2>
                    <Form className="window-inputs form-signin" onSubmit={handleSubmit}>
                        <div className="error">
                            {props.signInError}
                        </div>
                        <Input
                            fluid 
                            placeholder="Username" 
                            type="text" 
                            name="username"
                            required
                            onChange={handleChanges}
                        />
                        <div className="password-container">
                            <Icon
                                onClick={() => setHidePass(!hidePass)}
                                className={hidePass ? "eye-icon" : "eye-icon"}
                                name={hidePass ? "eye slash" : "eye"} />
                            <Input
                                fluid 
                                placeholder="Password" 
                                type={hidePass ? "password" : "text"} 
                                name="password"
                                required
                                onChange={handleChanges}
                            />
                        </div>
                        {props.isSigningIn ?
                        <Button fluid primary loading disabled>Loading</Button>
                        :
                        <Button fluid primary type="submit">Sign In</Button>
                        }
                    </Form>
                    <div className="window-bottom">
                        <div><Link to="/sign-up">Create an account</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isSigningIn: state.loginReducer.isSigningIn,
        signInSuccess: state.loginReducer.signInSuccess,
        username: state.loginReducer.username,
        signInError: state.loginReducer.signInError,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, { userSignIn, resetUserState, getCurrentUser })(SignIn);