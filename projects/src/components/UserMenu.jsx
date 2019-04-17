import React from 'react';
import styled from 'styled-components';
import {UserConsumer} from '../contexts/UserContext';

const Menu = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    ul {
        font-size: 16px;
        list-style: none;
        position: absolute;
        top: 35px;
        right: 5px;
        margin: 0;
        padding: 5px 0;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    li {
        cursor: pointer;
        display: block;
        padding: 3px 20px;

        &:hover {
            background-color: #e3eafd;
        }
    }

    .UserAvatar {
        height: 36px;
        border-radius: 50%;
    }
`;

class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgClicked: false
        };

        this.userImgRef = React.createRef();
        this.menuULRef = React.createRef();
    }

    handleClick = (e) => {
        if( e.target !== this.userImgRef.current && e.target !== this.menuULRef.current) {
            this.setState({imgClicked: false});
        }
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    render() {
        const { imgClicked } = this.state;

        return (
            <UserConsumer>
            {(value) => {
                // console.log('UserContext: ', value);
                const { user, onLogout } = value;
                return (
                    <Menu className="UserMenu">
                        <img ref={this.userImgRef} className="UserAvatar" alt="User avatar" src={user.avatar} onClick={() => this.setState({imgClicked: true})} />
                        {imgClicked && 
                            <ul ref={this.menuULRef}>
                                <li onClick={onLogout}>Logout</li>
                                </ul>}
                    </Menu>
                );
            }}
            </UserConsumer>
        );
    };
};

export default UserMenu;