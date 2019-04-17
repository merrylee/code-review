import React from 'react';
import * as api from '../api';

const { Provider, Consumer } = React.createContext();


// 1. 메일 가져오기
// 2. 가져와 저장하기

class EmailProvider extends React.Component {
  
    state = {
      loading: false,
      mails: []
    };

    componentDidMount() {
      //메일 가져오는 api
      this.setState({loading: true});
      api.fetchEmails()
        .then((res) => {
          console.log('메일목록', this, res);
          this.setState({mails: res, loading: false});
        });
    }

    render() {
        return (
            <Provider value={{
              emails: [...this.state.mails],
              loading: this.state.loading}}>{this.props.children}</Provider>
        );
      }
}

export { EmailProvider, Consumer as EmailConsumer };