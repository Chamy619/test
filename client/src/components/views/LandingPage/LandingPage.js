import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../_actions/user_action.js';
import {withRouter} from 'react-router-dom';

const landingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
}

function LandingPage(props) {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        dispatch(logoutUser(token))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login');
                } else {
                    alert('로그아웃에 실패했습니다.');
                }
            });
    }

    return (
        <div style={landingStyle}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    );
}

export default withRouter(LandingPage);