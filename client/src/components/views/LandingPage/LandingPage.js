import React, {useEffect} from 'react'
import axios from 'axios';

const landingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
}

function LandingPage(props) {
    useEffect(() => {
        axios.get('http://localhost:5000/api/hello')
            .then(console.log);
    }, []);

    const onClickHandler = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios.get(`http://localhost:5000/api/user/logout?token=${token}`)
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login');
                } else {
                    alert('로그아웃 하는데 실패했습니다.');
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

export default LandingPage;