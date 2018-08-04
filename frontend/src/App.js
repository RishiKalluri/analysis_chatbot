import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ChatBot from 'react-simple-chatbot';

function handleRequest(chat_input){
    return chat_input
}

const steps = [{
                    id: '1',
                        message: 'Hello World',
                    trigger: '2',
                },
                {
                    id: '2',
                    user: true,
                    trigger: '3',
                },
                {
                    id: '3',
                    message: ({ previousValue, steps }) => handleRequest(previousValue),
                    trigger: '2'
                }]

class App extends Component {
  render() {
    return (
      <div>
        <ChatBot steps={steps} hideHeader={true} width={100}/>
      </div>
    );
  }
}

export default App;
