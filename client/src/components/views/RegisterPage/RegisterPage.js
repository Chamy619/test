import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action.js';

const registerStyle = {
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

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onNameHandler = (event) => {
        setName(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호가 같지 않습니다.');
        }
        
        const body = {
            email: Email,
            name: Name,
            password: Password
        };

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login');
                } else {
                    alert(`에러 코드: ${response.payload.err.code}`);
                }
            })

    }

    return (
        <div style={registerStyle}>
            <form style={formStyle} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} /> 
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>회원 가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;