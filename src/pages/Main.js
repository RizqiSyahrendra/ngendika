import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Chatscreen from '../components/Chatscreen';
import Chatinput from '../components/Chatinput';

const Main = () => {
  const [chatList, setChatList] = useState([
      {
          id: 1,
          me: true,
          name: 'Uzumaki',
          text: 'Hello'
      },
      {
          id: 2,
          me: false,
          name: 'Sasuke',
          text: 'Konnichiwa'
      },
      {
          id: 3,
          me: false,
          name: 'Sakura',
          text: 'Ikuzo'
      }
  ])

  const onInputChat = (textinput) => {
    setChatList([...chatList, {
      id: null,
      me: true,
      name: 'Aldi',
      text: textinput
    }])
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
