import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import React, { useState, useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Chatscreen from '../components/Chatscreen';
import Chatinput from '../components/Chatinput';
import { StoreContext } from '../store';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:5000", {transports: ["websocket", "polling"]});

socket.on("connect_error", () => {
    // revert to classic upgrade
    // console.error('failed to connect ws server');
    // socket.io.opts.transports = ["polling", "websocket"];
});

const Main = () => { 
    const { stateUser } = useContext(StoreContext);
    const [chatList, setChatList] = useState([
        {
            id: 1,
            me: true,
            name: 'Uzumaki',
            text: 'Hello'
        }
    ]);

    useEffect(() => {
        socket.on('chat-masuk', (msg) => {
            const msgObj = JSON.parse(msg);
            if (msgObj.email !== stateUser.email) {
                setChatList([...chatList, msgObj]);
            }
        });
    
    }, [chatList]);

    const onInputChat = (textinput) => {
        const chat = {
            id: null,
            email: stateUser.email,
            name: stateUser.name,
            text: textinput
        }

        setChatList([...chatList, chat]);
        socket.emit('chat', JSON.stringify(chat));
    }

    return (
        <div className="main">
            <Header />
            <Container>
                <Chatscreen data={chatList} />
                <Chatinput onInput={onInputChat} />
            </Container>
        </div>
    )
}

export default Main
