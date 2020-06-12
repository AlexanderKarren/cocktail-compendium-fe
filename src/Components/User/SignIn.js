import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Icon } from 'semantic-ui-react'
import './SignInWindow.scss'

const SignIn = () => {
    const [hidePass, setHidePass] = useState(true);

    return (
        <div className="SignInWindow">
            <div className="background-overlay">
                <div className="window">
                    <h2>Welcome Back</h2>
                    <form className="window-inputs">
                        <Input fluid placeholder="Username" type="text"/>
                        <div className="password-container">
                            <Icon
                                onClick={() => setHidePass(!hidePass)}
                                className={hidePass ? "eye-icon" : "eye-icon"}
                                name={hidePass ? "eye slash" : "eye"} />
                            <Input fluid placeholder="Password" type={hidePass ? "password" : "text"}/>
                        </div>
                        <Button fluid primary>Sign In</Button>
                    </form>
                    <div><Link to="/sign-up">Create an account</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
