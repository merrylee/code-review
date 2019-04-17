import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import { EmailProvider, EmailConsumer} from '../contexts/EmailContext';

const Page = styled.main`
    display: grid;
    height: 100vh;
    grid-template-columns: 250px;
    grid-template-rows: 49px;
    grid-template-areas: 
        'Header Header'
        'MessageList MessageList';
`;

const MainPage = () => (
    <Page>
        <Header />
        <EmailProvider>
            <EmailConsumer>
                {(emails, loading) => {
                    return <MessageList items={emails} loading={loading} />
                }}
            </EmailConsumer>
        </EmailProvider>
    </Page>
);

export default MainPage;