import React from 'react';
import Page from './Page.styled';
import * as api from '../api';  //api에 있는 모든 export된것들을 가져옴.
import { Button, Icon } from 'antd';
import "antd/dist/antd.css";
import PropTypes from 'prop-types';
import {UserConsumer} from '../contexts/UserContext';

const Header = () => {
    return <h2>헤더</h2>;
}

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
        error: null,
        loading: false,
        username: '',
        password: ''
        };

        this.pageRef = React.createRef();   //ref생성.
        this.usernameRef = React.createRef();   //ref생성.
        this.passwordRef = React.createRef();   //ref생성.
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    callUserAPI = () => {


    };

    handleSubmit = (e, onLogin) => {
        e.preventDefault();

        this.setState({loading: true, error: null});

        // const { onLogin } = this.props;
        return api
            .login(this.usernameRef.current.value, this.passwordRef.current.value)
            .then((user) => {
                        this.setState({loading: false});
                        onLogin(user);
                    })
            .catch((error) => this.setState({error, loading: false}));
    };


    render() {
        const { username, password, error, loading } = this.state;
        return (
            <UserConsumer>
                    {({ onLogin }) => {
                        return (
                <Page ref={this.pageRef} className="LoginPage">
                    <Header />
                    <form onSubmit={(e) => this.handleSubmit(e, onLogin)}>
                        <label>
                            Username
                            {/* <input name="username" type="text"  value={username} onChange={this.handleInputChange} /> */}
                            <input name="username" type="text"  ref={this.usernameRef} />
                        </label>
                        <label>
                            Password
                            {/* <input name="password" type="password" value={password} onChange={this.handleInputChange} /> */}
                            <input name="password" type="password"  ref={this.passwordRef} />
                        </label>
                        {error && <div className="error">{error.message}</div>}
                        {/* <button type="submit" disabled={loading}>Sign in</button> */}
                        <Button htmlType="submit" type="primary" loading={this.state.loading}>Sign in</Button>
                    </form>
                </Page>
                        );
                    }}
            </UserConsumer>
        );
    }
}

// LoginPage.propTypes = {
//     onLogin: PropTypes.func.isRequired
// };

export default LoginPage;