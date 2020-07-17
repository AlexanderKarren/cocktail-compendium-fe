import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { userRegister } from '../../Actions/loginActions'
import { Link , useHistory} from 'react-router-dom'
import { Input, Form, Button, Icon } from 'semantic-ui-react'
import './SignInWindow.scss'

const SignIn = props => {
    const { user } = props;
    const { push } = useHistory();
    const [hidePass, setHidePass] = useState(true);
    const [values, updateValues] = useState({
        username: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        if (props.registerSuccess) push("/sign-in");
    }, [props.registerSuccess, push])

    // pushes user away from page if already logged in
    useEffect(() => {
        if (user) push(`/user/${user.username}`)
    }, [user, push])

    const handleChanges = event => {
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        props.userRegister(values)
    }

    return (
        <div className="SignInWindow sign-up">
            <div className="background-overlay">
                <div className="window">
                    <h2>New User</h2>
                    <Form className="window-inputs form-signup" autoComplete="new-password" onSubmit={handleSubmit}>
                        <div className="error">
                            {props.registerError}
                        </div>
                        <Input 
                            fluid
                            label={{ icon: 'asterisk' }}
                            labelPosition='left corner'
                            placeholder="Username" 
                            name="username" 
                            autoComplete="off"
                            required
                            onChange={handleChanges}
                        />
                        <Input 
                            fluid 
                            placeholder="Email" 
                            type="email" 
                            name="email"
                            onChange={handleChanges}
                        />
                        <div className="password-container">
                            <Icon
                                onClick={() => setHidePass(!hidePass)}
                                className={hidePass ? "eye-icon" : "eye-icon"}
                                name={hidePass ? "eye slash" : "eye"} />
                            <Input 
                                fluid 
                                label={{ icon: 'asterisk' }}
                                labelPosition='left corner'
                                placeholder="Password" 
                                type={hidePass ? "password" : "text"} 
                                name="password"
                                required
                                onChange={handleChanges}
                            />
                        </div>
                        {props.isRegistering ?
                        <Button fluid loading type="button">Loading</Button>
                        :
                        <Button fluid primary type="submit">Sign Up</Button>
                        }
                    </Form>
                    <div className="window-bottom"><Link to="/sign-in">Sign In</Link></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isRegistering: state.loginReducer.isRegistering,
        registerSuccess: state.loginReducer.registerSuccess,
        registerError: state.loginReducer.registerError,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, { userRegister })(SignIn)
