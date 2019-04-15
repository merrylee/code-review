import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';

class Profile extends React.Component {
 
    state = { userInfo: '' };

    componentDidMount() {
        const { onLoading, match } = this.props;
        const userId = match.params.profileId;

        onLoading(true);
        fetch(`https://api.github.com/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                onLoading(false);
                this.setState({userInfo: data}); 
            });
    }

    render() {
        const { loading } = this.props;
        const { userInfo } = this.state;

        if(loading) return <div>정보를 불러오는 중입니다...</div>;

        return (
            <div>
                <div>프로필 정보: {userInfo.login}</div>
                <div><img alt="" width="230" height="230" class="" src={userInfo.avatar_url} /></div>
                <div>이름: {userInfo.name}</div>
                <div>이메일: {userInfo.email === null ? '미등록' : userInfo.email}</div>
            </div>
        );
    }
};

const SelectProfile = () => <div>프로필을 하나 선택하세요</div>;

class App extends React.Component {
    state = {
        loading: false
    };

    handleLoading = (loading) => {
        this.setState({loading});
    }

    render() {
        return (
            <div>
                <div className="links">
                    <Link to="/profile" className="link">
                        Name
                    </Link>
                    <Link to="/profile/miconblog" className="link">
                        miconblog
                    </Link>
                    <Link to="/profile/merrylee" className="link">
                        merrylee
                    </Link>
                </div>
                <div className="tabs">
                    <Switch>
                        <Route path="/profile" exact component={SelectProfile} />
                        <Route path="/profile/:profileId" render={(props) => {
                            return ( <Profile key={props.location.pathname}
                                            {...props}
                                            loading={this.state.loading}
                                            onLoading={this.handleLoading}
                                    />
                            );
                        }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
