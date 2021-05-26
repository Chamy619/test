import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action.js';
import {withRouter} from 'react-router-dom';

const loginStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column'
}

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        const body = {
            email: Email,
            password: Password
        };

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    localStorage.setItem('user_token', JSON.stringify(response.payload.token));
                    props.history.push('/');
                } else {
                    alert(response.payload.message);
                }
            });

    }

    return (
        <div style={loginStyle}>
            <form style={formStyle} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} /> 
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);